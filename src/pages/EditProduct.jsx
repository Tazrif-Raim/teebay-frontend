import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { GET_PRODUCT_BY_ID, UPDATE_PRODUCT } from '../services/queries';
import LoggedInHeader from '../components/common/LoggedInHeader';


const categories = ["ELECTRONICS", "TOYS", "HOME APPLIANCES", "FURNITURE", "SPORTING GOODS", "OUTDOOR"]; // Example categories

const EditProduct =  () => {
  let { id } = useParams();
  //convet id to int
  id = parseInt(id);
  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id },
  });

  const navigate = useNavigate();

  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const [isSold, setIsSold] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (data) {
      const product = data.findOneProduct;
      setValue('title', product.title);
      setValue('description', product.description);
      setValue('sellPrice', product.sell_price);
      setValue('rentPrice', product.rent_price_daily);
      const productCategories = product.categories.map(c => c.category_name);
      categories.forEach(category => {
        setValue(`categories.${category}`, productCategories.includes(category));
      });
      setIsSold(product.status === 'SOLD');
    }
  }, [data, setValue]);

  const onSubmit = async (formData) => {
    const selectedCategories = categories
      .filter(category => formData.categories[category])
      .map(category => ({ "category_name": category }));

      console.log(selectedCategories);
      
    const variables = {
        "id": id,
        "title": formData.title,
        "description": formData.description,
        "sell_price": parseFloat(formData.sellPrice),
        "rent_price_daily": parseFloat(formData.rentPrice),
        "categories": selectedCategories
    }
    console.log(variables);
    
    try {
      const a= await updateProduct({
        variables: variables
      });
      console.log(a);
      alert('Product updated successfully!');
      navigate('/user/product');
    } catch (error) {
      console.log(error)
        alert('Error updating product: ' + error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <LoggedInHeader />
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            {...register('title', { required: true })}
            disabled={isSold}
          />
          {errors.title && <p>Title is required.</p>}
        </div>
        <div>
          <label>Categories:</label>
          {categories.map(category => (
            <div key={category}>
              <input
                type="checkbox"
                {...register(`categories.${category}`)}
                disabled={isSold}
              />
              <label>{category}</label>
            </div>
          ))}
        </div>
        <div>
          <label>Description:</label>
          <textarea
            {...register('description', { required: true })}
            disabled={isSold}
          />
          {errors.description && <p>Description is required.</p>}
        </div>
        <div>
          <label>Sell Price:</label>
          <input
            type="text"
            {...register('sellPrice', { required: true, pattern: /^\d+(\.\d{1,2})?$/ })}
            disabled={isSold}
          />
          {errors.sellPrice && <p>Sell Price is required and should be a valid number.</p>}
        </div>
        <div>
          <label>Rent Price (Daily):</label>
          <input
            type="text"
            {...register('rentPrice', { required: true, pattern: /^\d+(\.\d{1,2})?$/ })}
            disabled={isSold}
          />
          {errors.rentPrice && <p>Rent Price is required and should be a valid number.</p>}
        </div>
        <button type="submit" disabled={isSold}>Edit Product</button>
      </form>
    </div>
  );
};

export default EditProduct;

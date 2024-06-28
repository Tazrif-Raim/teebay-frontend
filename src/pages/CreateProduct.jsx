import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import TitlePage from '../components/product/TitlePage';
import DescriptionPage from '../components/product/DescriptionPage';
import CategoriesPage from '../components/product/CategoriesPage';
import PricePage from '../components/product/PricePage';
import SummaryPage from '../components/product/SummaryPage';
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT } from '../services/queries';
import { useNavigate } from 'react-router-dom';
import client from '../services/client';

const CreateProduct = () => {
  const methods = useForm({
    defaultValues: {
      title: '',
      description: '',
      categories: [],
      sellPrice: '',
      rentPrice: ''
    }
  });

  const [createProduct, { data, loading, error }] = useMutation(CREATE_PRODUCT);

  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleSubmit = async(data) => {
    console.log(data);
    const createProductInput = {
      title: data.title,
      description: data.description,
      sell_price: parseFloat(data.sellPrice),
      rent_price_daily: parseFloat(data.rentPrice),
      categories: data.categories.map(category => ({ category_name: category }))
    };
    const response = await createProduct({ variables: { createProductInput } });
    console.log(response.data);
    if(response.data.createProduct.id>0){
      client.clearStore();
      navigate('/user/product');
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        {currentPage === 0 && <TitlePage />}
        {currentPage === 1 && <DescriptionPage />}
        {currentPage === 2 && <CategoriesPage />}
        {currentPage === 3 && <PricePage />}
        {currentPage === 4 && <SummaryPage />}
        <div>
          {currentPage > 0 && <input type="button" onClick={handleBack} value="Back"/>}
          {currentPage < 4 ? (
            <input type="button" onClick={handleNext} value="Next"/>
          ) : (
            <button type="submit">Submit</button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateProduct;

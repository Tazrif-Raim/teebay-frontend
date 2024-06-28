import React  from 'react';
import { Link } from 'react-router-dom';
import LoggedInHeader from '../components/common/LoggedInHeader';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_PRODUCTS } from '../services/queries';
import '../styles/Product.css';
import ProductCard from '../components/product/ProductCard';
import { REMOVE_PRODUCT } from '../services/queries';
import { useNavigate } from 'react-router-dom';

const UserProduct = () => {
  const { loading, error, data } = useQuery(GET_USER_PRODUCTS);
  const [removeProduct] = useMutation(REMOVE_PRODUCT, {
    refetchQueries: [{ query: GET_USER_PRODUCTS }],
  });

  const navigate = useNavigate();

  const handleDeleteProduct = async (productId) => {
    try {
      await removeProduct({ variables: { id: productId } });
      console.log(`Product with ID ${productId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :{error.message}</p>;

    const handleAddProduct = () => {
        navigate('/user/product/create');
    }
  
    return (
    <div>
        <LoggedInHeader />
      <h2 className="product-grid">My Products</h2>
      <h2 className='product-grid'><button onClick={handleAddProduct} className='modal-button-confirm'>Add Product</button></h2>
      <div className="product-grid">
        {data.findAllProductOfUser.map((product) => (
          <ProductCard onDelete={handleDeleteProduct} showDeleteButton={true} key={product.id} product={product} link={`/user/product/${product.id}/edit`}/>
        ))}
      </div>
    </div>
  );
};

export default UserProduct;

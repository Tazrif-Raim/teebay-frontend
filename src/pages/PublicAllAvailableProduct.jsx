import React from 'react';
import LoggedInHeader from '../components/common/LoggedInHeader';
import { useQuery } from '@apollo/client';
import { AVAILABLE_PRODUCTS } from '../services/queries';
import '../styles/Product.css';
import ProductCard from '../components/product/ProductCard';


const PublicAllAvailableProduct = () => {
    const { loading, error, data } = useQuery(AVAILABLE_PRODUCTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :{error.message}</p>;

    const products = data.findAllAvailableProduct;
  
  return (
    <div>
      <LoggedInHeader />
      <h2 className="product-grid">Available Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard  showDeleteButton={false} key={product.id} product={product} link={`/product/${product.id}`}/>
        ))}
      </div>
    </div>
  );
};

export default PublicAllAvailableProduct;

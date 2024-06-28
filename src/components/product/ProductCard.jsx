import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@apollo/client';

const ProductCard = ({ product, link, showDeleteButton, onDelete }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
  
    const handleDelete = () => {
      setShowConfirmation(true);
    };
  
    const handleConfirmDelete = async () => {
      try {
        const data = await onDelete(product.id);
        console.log(data)
        setShowConfirmation(false);
        console.log(`Product with ID ${product.id} deleted successfully.`);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    };
  
    const handleCancelDelete = () => {
      setShowConfirmation(false);
    };

  return (
    <div key={product.id} className="product-card">
        <Link to={link}>{product.title}</Link>
        <div>Categories:
            {product.categories.map((category, index) => (
            <span key={index}>|{category.category_name}| </span>
            ))}
        </div>
        <p>Sell Price: ${product.sell_price}</p>
        <p>Rent Price (Daily): ${product.rent_price_daily}</p>
        <p>{product.description}</p>
        <p>Status: {product.status}</p>
        {showDeleteButton && (product.status==='AVAILABLE') && (
        <>
          <button onClick={handleDelete}>Delete</button>
          {showConfirmation && (
            <div className="delete-confirmation">
              <p>Are you sure you want to delete this product?</p>
              <button onClick={handleConfirmDelete}>Yes</button>
              <button onClick={handleCancelDelete}>No</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductCard;

import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import '../../styles/modal.css';

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
    <>
    <div className='product-card' key={product.id}>
    <Link to={link} className='text-zero'>
    <div key={product.id} >
        {product.title}
        <div>Categories:
            {product.categories.map((category, index) => (
            <span key={index}>|{category.category_name}| </span>
            ))}
        </div>
        <p>Sell Price: ${product.sell_price}</p>
        <p>Rent Price (Daily): ${product.rent_price_daily}</p>
        <p>{product.description}</p>
        <p>Status: {product.status}</p>
    </div>
        </Link>
        
        {showDeleteButton && (product.status==='AVAILABLE') && (
        <>
          <button onClick={handleDelete} className='modal-button-confirm'>Delete</button>
          {showConfirmation && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>Are you sure you want to delete this product?</h2>
                <button onClick={handleConfirmDelete} className='modal-button-confirm'>Yes</button>
                <button onClick={handleCancelDelete} className='modal-button-cancel'>No</button>
              </div>
            </div>
          )}
        </>
      )}
      </div>
    </>
  );
};

export default ProductCard;

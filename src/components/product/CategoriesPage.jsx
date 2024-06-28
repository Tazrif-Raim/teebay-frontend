import React from 'react';
import { useFormContext } from 'react-hook-form';
import '../../styles/auth.css';

const CategoriesPage = () => {
  const { register, watch } = useFormContext();
  const categories = ['ELECTRONICS', 'HOME APPLIANCES', 'FURNITURE', 'OUTDOOR', 'SPORTING GOODS', 'TOYS'];
  const selectedCategories = watch('categories', []);

  return (
    <div className='form-container'>
      <h2>Create Product</h2>
      {categories.map((category) => (
        <div key={category}>
          <input
            type="checkbox"
            value={category}
            {...register('categories')}
            checked={selectedCategories.includes(category)}
          />
          <label>{category}</label>
        </div>
      ))}
    </div>
  );
};

export default CategoriesPage;

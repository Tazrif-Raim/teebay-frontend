import React from 'react';
import { useFormContext } from 'react-hook-form';
import '../../styles/auth.css';

const TitlePage = () => {
  const { register } = useFormContext();
  return (
    <div className='form-container'>

      <h2>Create Product</h2>
      <input {...register('title')} placeholder="Title" />
    </div>
    
  );
};

export default TitlePage;

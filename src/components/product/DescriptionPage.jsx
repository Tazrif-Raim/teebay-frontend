import React from 'react';
import { useFormContext } from 'react-hook-form';
import '../../styles/auth.css';

const DescriptionPage = () => {
  const { register } = useFormContext();
  return (
    <div className='form-container'>
      <h2>Create Product</h2>
      <textarea {...register('description')} placeholder="Description" />
    </div>
  );
};

export default DescriptionPage;

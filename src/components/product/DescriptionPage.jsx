import React from 'react';
import { useFormContext } from 'react-hook-form';

const DescriptionPage = () => {
  const { register } = useFormContext();
  return (
    <div>
      <h2>Create Product</h2>
      <textarea {...register('description')} placeholder="Description" />
    </div>
  );
};

export default DescriptionPage;

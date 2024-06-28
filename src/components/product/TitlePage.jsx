import React from 'react';
import { useFormContext } from 'react-hook-form';

const TitlePage = () => {
  const { register } = useFormContext();
  return (
    <div>
      <h2>Create Product</h2>
      <input {...register('title')} placeholder="Title" />
    </div>
  );
};

export default TitlePage;

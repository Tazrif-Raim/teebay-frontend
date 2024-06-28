import React from 'react';
import { useFormContext } from 'react-hook-form';

const PricePage = () => {
  const { register } = useFormContext();
  return (
    <div>
      <h2>Create Product</h2>
      <label>Sell Price</label>
      <input type="number" {...register('sellPrice')} placeholder="Sell Price" />
      <label>Rent Price Daily</label>
      <input type="number" {...register('rentPrice')} placeholder="Rent Price" />
    </div>
  );
};

export default PricePage;

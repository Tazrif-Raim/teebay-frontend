import React from 'react';
import { useFormContext } from 'react-hook-form';
import '../../styles/auth.css';

const SummaryPage = () => {
  const { getValues } = useFormContext();
  const values = getValues();

  return (
    <div className='form-container'>
      <h2>Create Product Summary</h2>
      <p>Title: {values.title}</p>
      <p>Description: {values.description}</p>
      <p>Categories: {values.categories.join(', ')}</p>
      <p>Sell Price: {values.sellPrice}</p>
      <p>Rent Price Daily: {values.rentPrice}</p>
    </div>
  );
};

export default SummaryPage;

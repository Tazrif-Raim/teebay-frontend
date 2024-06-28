import React from 'react';
import { useForm } from 'react-hook-form';

const RegisterForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" {...register('firstname', { required: 'First name is required' })} />
            {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>
        <div>
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" {...register('lastname', { required: 'Last name is required' })} />
            {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>
      
        <div>
            <label htmlFor="email">Email</label>
            <input id="email" {...register('email', { required: 'Email is required' })} />
            {errors.email && <p>{errors.email.message}</p>}
        </div>
      
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" {...register('password', { required: 'Password is required' })} />
            {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" {...register('confirmPassword', { required: 'Password confirmation is required' })} />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;

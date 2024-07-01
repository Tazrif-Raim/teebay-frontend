import React from 'react';
import { useForm } from 'react-hook-form';
//import '../../styles/auth.css';

const LoginForm = ({ onSubmit, invalid=false, unexpectedError=''}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <div className='form-container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" {...register('email', { required: 'Email is required' })} />
        {errors.email && <p style = {{color: 'red'}}>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register('password', { required: 'Password is required' })} />
        {errors.password && <p style = {{color: 'red'}}>{errors.password.message}</p>}
      </div>
      {invalid && <div style = {{color: 'red'}}>Invalid email or password</div>}
      {unexpectedError.length > 0 && <div style = {{color: 'red'}}>{unexpectedError}</div>}
      <button type="submit">Login</button>
    </form>

    </div>
    
  );
};
export default LoginForm;

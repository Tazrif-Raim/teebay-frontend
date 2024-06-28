import { useState } from 'react';
import { login, register, logout } from '../services/auth';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogin = async (input) => {
    try {
      await login(input);

      await setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const handleRegister = async (input) => {
    try {
      await register(input);
        return true;
    } catch (error) {
      console.error('Registration failed:', error);
        return false;
    }
  };

  const handleLogout = async() => {
    try{
        await logout();
        await setIsAuthenticated(false);
        return true;
    }
    catch(error){
        console.error('Logout failed:', error);
        return false;
    }
  };

  return {
    isAuthenticated,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
};

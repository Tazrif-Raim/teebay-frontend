import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/auth/LoginForm';
import PublicHeader from '../components/common/PublicHeader';

function Login()
{
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();


    const handleLogin = async (data) => {
        try {
            const loginStatus = await login(data);
            if(loginStatus) navigate('/user/product');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <PublicHeader />
            <h2>Login</h2>
            <LoginForm onSubmit={handleLogin} />
        </div>
    );
}

export default Login
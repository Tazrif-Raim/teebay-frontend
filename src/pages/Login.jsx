import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/auth/LoginForm';
import PublicHeader from '../components/common/PublicHeader';
import '../styles/auth.css';

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
            <div className='bodyy'>
            <LoginForm onSubmit={handleLogin} />
            </div>
            
        </div>
    );
}

export default Login
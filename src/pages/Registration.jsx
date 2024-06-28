import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import RegisterForm from '../components/auth/RegisterForm';
import PublicHeader from '../components/common/PublicHeader';
import '../styles/auth.css';

function Registration()
{
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (data) => {
        try {
            if(data.confirmPassword !== data.password) throw new Error('Passwords do not match');
            delete data.confirmPassword;
            const registerStatus = await register(data);
            if(registerStatus) navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div>
            <PublicHeader />
            <div className='bodyy'>
            <RegisterForm onSubmit={handleRegister} />
            </div>
            
        </div>
    );
}

export default Registration;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import RegisterForm from '../components/auth/RegisterForm';
import PublicHeader from '../components/common/PublicHeader';

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
            <h2>Register</h2>
            <RegisterForm onSubmit={handleRegister} />
        </div>
    );
}

export default Registration;
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/auth/LoginForm';
import PublicHeader from '../components/common/PublicHeader';
import '../styles/auth.css';

function Login()
{
    const [invalid, setInvalid] = useState(false);
    const [unexpectedError, setUnexpectedError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();


    const handleLogin = async (data) => {
        try {
            const loginStatus = await login(data);
            if(loginStatus) navigate('/user/product');
            else setInvalid(true);
        } catch (error) {
            setUnexpectedError('An unexpected error occurred');
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <PublicHeader />
            <div className='bodyy'>
            <LoginForm onSubmit={handleLogin} invalid={invalid} unexpectedError={unexpectedError} />
            </div>
            
        </div>
    );
}

export default Login
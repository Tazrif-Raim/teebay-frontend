import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/LoggedInHeader.css';

const LoggedInHeader = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async() => {
    const logoutStatus = await logout();
    if(logoutStatus) navigate('/');
  };

  return (
    <header className="logged-in-header">
      <nav>
        <Link to="/user/product">My Products</Link>
        <Link to="/product">Available Products</Link>
        <Link to="/user/product/transaction">My Transactions</Link>
      </nav>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </header>
  );
};

export default LoggedInHeader;

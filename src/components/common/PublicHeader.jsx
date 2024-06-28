import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/LoggedInHeader.css';

const PublicHeader = () => {
  return (
    <header className="logged-in-header">
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <div>
        <Link to="/login" >
          <button className='login-button'>Login</button>
        </Link>
        <Link to="/registration" >
          <button className='login-button'>Register</button>
        </Link>
      </div>
    </header>
  );
};

export default PublicHeader;

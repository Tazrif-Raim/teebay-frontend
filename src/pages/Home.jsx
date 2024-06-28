import React from 'react';
import Footer from '../components/common/Footer';
import PublicHeader from '../components/common/PublicHeader';

const Home = () => {
  return (
    <div>
      <PublicHeader />
      <main>
        <h2>Home Page</h2>
        <p>Welcome to Teebay</p>
        <p>Buy / Sell / Rent</p>
      </main>
    </div>
  );
};

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }} className="text-black  bg-green-100 ">
      <h1 style={{marginTop:'2rem',marginBottom:'2rem'}} className="text-2xl">Welcome to DocSpot</h1>
      <p className="text-2xl">Your trusted platform for doctor appointments and management.</p>
      <div style={{ marginTop: '2rem' }} >
        <Link to="/login" style={{ marginRight: '2rem' }} className="bg-green-600 hover:bg-green-700 text-black px-4 py-2 rounded shadow text-1xl">Login</Link>
        <Link to="/register" className="bg-green-600 hover:bg-green-700 text-black px-4 py-2 rounded shadow text-1xl">Register</Link>
      </div>
    </div>
  );
};

export default LandingPage;

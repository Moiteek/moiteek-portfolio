import React from 'react';

const TestApp = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#020617',
      color: '#e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#22d3ee' }}>
          MOITEEK DIGITAL TECH
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Premium Web Development Portfolio
        </p>
        <div style={{
          background: 'rgba(34, 211, 238, 0.1)',
          border: '2px solid #22d3ee',
          borderRadius: '0.5rem',
          padding: '1rem 2rem',
          display: 'inline-block'
        }}>
          ✅ React is Working
        </div>
      </div>
    </div>
  );
};

export default TestApp;

import React from 'react';
import '../../css/Auth.css'; 

const AuthLayout = ({ children, title }) => {
  return (
    <main className="auth-container">
      <h1 className="auth-logo">more(ad)s</h1>
      <div className="auth-card">
        <h1 className="auth-title">{title}</h1>
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
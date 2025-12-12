import React from 'react';

const AuthInput = ({ type, name, label, value, onChange, required = true }) => {
  return (
    <div className="input-group">
      <input 
        type={type} 
        id={name} 
        name={name} 
        className="auth-input" 
        placeholder=" " 
        value={value}
        onChange={onChange}
        required={required}
      />
      <label htmlFor={name} className="auth-label">{label}</label>
    </div>
  );
};

export default AuthInput;
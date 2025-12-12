import React from 'react';

const AuthButton = ({ text, onClick, type = "button" }) => {
  return (
    <button 
      type={type} 
      className="btn-tipo1" 
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default AuthButton;
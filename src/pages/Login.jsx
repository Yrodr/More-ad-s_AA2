import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/LoginCadastro/AuthLayout';
import AuthInput from '../components/LoginCadastro/AuthInput';
import AuthButton from '../components/LoginCadastro/AuthButton';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ user: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submit:", formData);
    navigate('/home');
  };

  return (
    <AuthLayout title="Fazer Login">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <AuthInput 
          type="text" 
          name="user" 
          label="User" 
          value={formData.user} 
          onChange={handleChange} 
        />
        
        <AuthInput 
          type="password" 
          name="password" 
          label="Senha" 
          value={formData.password} 
          onChange={handleChange} 
        />

        <AuthButton text="Entrar" type="submit" />
        
        <Link to="/cadastro" className="btn-link">
          Fazer Cadastro
        </Link>

      </form>
    </AuthLayout>
  );
};

export default Login;
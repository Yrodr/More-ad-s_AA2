import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/LoginCadastro/AuthLayout';
import AuthInput from '../components/LoginCadastro/AuthInput';
import ProfileUpload from '../components/LoginCadastro/ProfileUpload';

const Cadastro = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home'); 
  };
  
  const [formData, setFormData] = useState({
    name: '', user: '', email: '', password: '', photo: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (file) => {
    setFormData({ ...formData, photo: file });
  };


  return (
    <AuthLayout title="Fazer Cadastro">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <ProfileUpload onImageChange={handleImage} />

        <AuthInput type="text" name="name" label="Nome" value={formData.name} onChange={handleChange} />
        <AuthInput type="text" name="user" label="User" value={formData.user} onChange={handleChange} />
        <AuthInput type="email" name="email" label="E-mail" value={formData.email} onChange={handleChange} />
        <AuthInput type="password" name="password" label="Senha" value={formData.password} onChange={handleChange} />

        <button type="submit" className="btn-tipo1">Cadastrar</button>
        
        <Link to="/login" className="btn-link">
          Fazer Login
        </Link>
        
      </form>
    </AuthLayout>
  );
};

export default Cadastro;
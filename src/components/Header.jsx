import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Header.css'; 

const Header = ({ activePage }) => { 
  const location = useLocation(); 
  
  const getActiveClass = (path) => {
    return location.pathname === path ? 'ativo' : '';
  };

  return (
    <>
      
      <header className="desktop-header">
        <div className="logo">more(ad)s</div>
        <nav>
          <Link to="/livraria" className={`nav-btn ${getActiveClass('/livraria')}`}>
            Livraria
          </Link>
          <Link to="/home" className={`nav-btn ${getActiveClass('/home')}`}>
            Home
          </Link>
          <Link to="/clubes" className={`nav-btn ${getActiveClass('/clubes')}`}>
            Clube do Livro
          </Link>
        </nav>
        <Link to="/login" className="sair">sair</Link>
      </header>

      
      <header className="header-mobile">
        <h1 className="logo">more(ad)s</h1>
        <Link to="/login" className="logout-link">sair</Link>
      </header>

     
      <nav className="menu-inferior">
        <div className="view-menu">
            <Link to="/livraria" className={`menu-item ${getActiveClass('/livraria')}`}>
                Livraria
            </Link>
            <Link to="/home" className={`menu-item ${getActiveClass('/home')}`}>
                Home
            </Link>
            <Link to="/clubes" className={`menu-item ${getActiveClass('/clubes')}`}>
                Clube do Livro
            </Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
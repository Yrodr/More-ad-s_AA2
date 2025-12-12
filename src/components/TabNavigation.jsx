import React from 'react';
import '../css/Home.css';

const TabNavigation = ({ active, onChange }) => {
  return (
    <div className="tabs">
      <button 
        className={`tab ${active === 'leituras' ? 'ativo' : ''}`}
        onClick={() => onChange('leituras')}
      >
        Minhas Leituras
      </button>

      <button 
        className={`tab ${active === 'clubs' ? 'ativo' : ''}`}
        onClick={() => onChange('clubs')}
      >
        Club’s
      </button>

      <button 
        className={`tab ${active === 'concluidos' ? 'ativo' : ''}`}
        onClick={() => onChange('concluidos')}
      >
        Livros Concluídos
      </button>
    </div>
  );
};

export default TabNavigation;

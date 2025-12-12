import React from 'react';
import '../../css/HomeModal.css'; 

const ClubActionModal = ({ club, onClose, onRemove, onFinish }) => {
  if (!club) return null;

  return (
    <div className="home-modal-overlay" onClick={onClose}>
      <div className="home-modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="home-modal-close" onClick={onClose}>&times;</span>

        <h1>Clube do Livro</h1>
        
        <div style={{ margin: '15px 0' }}>
          <h2 style={{ marginBottom: '5px', fontSize: '22px' }}>{club.name}</h2>
          <p style={{ color: '#666', fontFamily: 'Istok Web', fontSize: '16px' }}>
            Lendo: <strong style={{ color: '#34292A' }}>{club.bookTitle}</strong>
          </p>
        </div>
        
        <div className="home-modal-actions">
          {}
          <button 
            className="botao-tipo2"
            onClick={() => onFinish(club)}
          > 
            Concluir Leitura do Clube 
          </button>

          <button 
            className="botao-tipo3" 
            onClick={() => onRemove(club.id)}
          > 
            Sair / Excluir Clube 
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClubActionModal;
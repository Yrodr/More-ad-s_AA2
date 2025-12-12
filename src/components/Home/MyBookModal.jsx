import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/HomeModal.css';

const MyBookModal = ({ book, onClose, onRemove, onFinishDirectly }) => {
  const navigate = useNavigate();

  if (!book) return null;

  const handleStartReading = () => {
    navigate('/lendo', { state: { book } });
  };

  const handleFinishWrapper = () => {
    localStorage.setItem('lastBookRead', book.title); 
    onFinishDirectly(book);
  };

  return (
    <div className="home-modal-overlay" onClick={onClose}>
      <div className="home-modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="home-modal-close" onClick={onClose}>&times;</span>

        <h1>Livro</h1>
        <h2>{book.title}</h2>
        
        <div className="home-modal-actions">
          <button 
            className="botao-tipo2" 
            onClick={handleStartReading}
          > 
            Começar leitura 
          </button>

          <button 
            className="botao-tipo2"
            onClick={handleFinishWrapper}
          > 
            Concluído 
          </button>

          <button 
            className="botao-tipo3" 
            onClick={() => onRemove(book.id)}
          > 
            Remover das Minhas Leituras 
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBookModal;
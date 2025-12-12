import React, { useState } from 'react';
import '../../css/HomeModal.css';
import starIcon from '../../assets/img/Star.png';

const RatingModal = ({ isOpen, onClose, onConfirm }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0); 
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (rating === 0) {
      alert("Por favor, selecione uma nota.");
      return;
    }
    onConfirm(rating);
  };

  const handleMouseMove = (e, starIndex) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const isHalf = mouseX < width / 2;
    
    const newRating = isHalf ? starIndex - 0.5 : starIndex;
    setHoverRating(newRating);
  };

  const handleClick = (e, starIndex) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const isHalf = mouseX < width / 2;
    const newRating = isHalf ? starIndex - 0.5 : starIndex;
    setRating(newRating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="home-modal-overlay" onClick={onClose}>
      <div className="home-modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="home-modal-close" onClick={onClose}>&times;</span>

        <h1>Avaliação</h1>
        <h2>O que achou da leitura?</h2>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '30px' }} onMouseLeave={handleMouseLeave}>
          {[1, 2, 3, 4, 5].map((star) => {
            const isFull = displayRating >= star;
            const isHalf = displayRating >= star - 0.5 && displayRating < star;

            return (
              <div 
                key={star}
                style={{ position: 'relative', width: '40px', height: '40px', cursor: 'pointer' }}
                onMouseMove={(e) => handleMouseMove(e, star)}
                onClick={(e) => handleClick(e, star)}
              >
                <img 
                  src={starIcon}
                  alt="estrela fundo"
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    filter: 'grayscale(100%) opacity(0.5)', 
                    transform: 'scale(1)'
                  }}
                />
                
                {(isFull || isHalf) && (
                  <img 
                    src={starIcon}
                    alt="estrela frente"
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      clipPath: isHalf ? 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' : 'none',
                      transition: 'transform 0.1s',
                      transform: 'scale(1.1)' 
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="home-modal-actions">
          <button className="botao-tipo2" onClick={handleConfirm}>
            Confirmar e Concluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
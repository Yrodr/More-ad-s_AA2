import React, { useState, useEffect } from 'react';
import "../../css/Home.css";
import starIcon from '../../assets/img/Star.png';

const FinishedSection = () => {
  const [finishedBooks, setFinishedBooks] = useState([]);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('livrosConcluidos')) || [];
    setFinishedBooks(storedBooks);
  }, []);

  return (
    <div className="livrosC-grid">
      {finishedBooks.length > 0 ? (
        finishedBooks.map((book, index) => (
          <div key={index} className="livroC-card">
            <img 
              src={book.cover || 'https://via.placeholder.com/100x150'} 
              className="capa" 
              alt="Capa" 
            />
            
            <div className="avaliacao">
              {[1, 2, 3, 4, 5].map(star => {
                const rating = book.rating || 0;
                const isFull = rating >= star;
                const isHalf = rating >= star - 0.5 && rating < star;

                return (
                  <div 
                    key={star} 
                    className="star-container" 
                    style={{ position: 'relative', width: '15px', height: '15px' }}
                  >
                    <img 
                      src={starIcon} 
                      alt="estrela fundo" 
                      style={{
                        width: '100%', 
                        height: '100%',
                        position: 'absolute',
                        top: 0, left: 0,
                        filter: 'grayscale(100%) opacity(0.4)'
                      }}
                    />
                    
                    {(isFull || isHalf) && (
                      <img 
                        src={starIcon} 
                        alt="estrela cheia" 
                        style={{
                          width: '100%', 
                          height: '100%',
                          position: 'absolute',
                          top: 0, left: 0,
                          clipPath: isHalf ? 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' : 'none'
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))
      ) : (
        <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center' }}>
          <p style={{ color: '#666', fontSize: '18px' }}>
            Nenhum livro concluído ainda.
          </p>
        </div>
      )}
    </div>
  );
};

export default FinishedSection;
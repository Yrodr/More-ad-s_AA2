import React, { useState, useEffect } from 'react';
import BookCard from '../Home/BookCard';
import "../../css/Home.css";

const ReadingsSection = ({ onBookClick }) => { 
  const [savedBooks, setSavedBooks] = useState([]);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('minhasLeituras')) || [];
    setSavedBooks(storedBooks);
  }, []);

  const formatTotalTime = (totalSeconds) => {
    if (!totalSeconds) return '00:00';
    
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    const h = hours.toString().padStart(2, '0');
    const m = minutes.toString().padStart(2, '0');
    
    return `${h}:${m}`;
  };

  return (
    <div className="livros-grid">
      {savedBooks.length > 0 ? (
        savedBooks.map(book => (
          <BookCard 
            key={book.id}
            title={book.title}
            author={book.author}
            timeRead={formatTotalTime(book.totalSeconds || 0)}
            coverImage={book.cover}
            onClick={() => onBookClick(book)}
          />
        ))
      ) : (
        <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#666' }}>
          Você ainda não adicionou nenhum livro.
        </p>
      )}
    </div>
  );
};

export default ReadingsSection;
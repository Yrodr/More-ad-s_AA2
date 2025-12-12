import React from 'react';
import "../../css/Home.css";

const BookCard = ({ title, author, timeRead, coverImage, onClick }) => {
  return (
    <div className="livro-card" onClick={onClick}>
      <img src={coverImage} className="capa" alt={`Capa de ${title}`} />
      <div className="info">
        <h3>{title}</h3>
        <p>{author}</p>
        {timeRead && <span>tempo de leitura: {timeRead}</span>}
      </div>
    </div>
  );
};

export default BookCard;
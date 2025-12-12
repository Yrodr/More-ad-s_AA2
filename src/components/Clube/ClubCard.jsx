import React from 'react';
import '../../css/Club.css';

const ClubCard = ({ club }) => {
  return (
    <div className="card-club">
      <div className="coluna-esquerda-club">
        <img 
          src={club.cover || "https://via.placeholder.com/140x210"} 
          alt="Capa do Livro" 
          className="img-club" 
        />
      </div>
      
      <div className="coluna-direita-club">
        <div className="info-club-main">
          <h2>{club.name}</h2>
          <h3><strong>Livro:</strong> {club.bookTitle}</h3>
          <p className="descricao-club">{club.description}</p>
        </div>
        
        <div className="info-extra-club">
          <span><strong>Membros:</strong> {club.membersCurrent}/{club.membersMax}</span>
          <span>
            <strong>Início:</strong> {club.startDate} - <strong>Fim:</strong> {club.endDate}
          </span>                    
          <button className="btn-participar">
            Participar • 10 pts
          </button>
        </div>
      </div>  
    </div>
  );
};

export default ClubCard;
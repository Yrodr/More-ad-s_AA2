import React, { useState, useEffect } from 'react';
import BookCard from '../Home/BookCard';
import ClubActionModal from '../Clube/ClubActionModal'; 
import RatingModal from '../Home/RatingModal';         
import "../../css/Home.css";

const ClubsSection = ({ onUpdate }) => {
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null); 
  const [showRating, setShowRating] = useState(false);    
  const [clubToFinish, setClubToFinish] = useState(null); 

  useEffect(() => {
    const storedClubs = JSON.parse(localStorage.getItem('clubsData')) || [];
    setClubs(storedClubs);
  }, []);

  const handleClubClick = (club) => {
    setSelectedClub(club);
  };

  const handleRemoveClub = (clubId) => {
    if (window.confirm("Tem certeza que deseja sair deste clube?")) {
      const updatedClubs = clubs.filter(c => c.id !== clubId);
      setClubs(updatedClubs);
      localStorage.setItem('clubsData', JSON.stringify(updatedClubs));
      
      setSelectedClub(null); 
      if (onUpdate) onUpdate(); 
    }
  };

  const handleInitiateFinish = (club) => {
    setClubToFinish(club);
    setSelectedClub(null); 
    setShowRating(true);   
  };

  const handleConfirmRating = (rating) => {
    if (!clubToFinish) return;

    const concluidos = JSON.parse(localStorage.getItem('livrosConcluidos')) || [];
    const novoConcluido = {
      id: clubToFinish.id,
      title: clubToFinish.bookTitle || clubToFinish.name, 
      author: "Lido via Clube",
      cover: clubToFinish.cover,
      rating: rating,
      finishedDate: new Date().toLocaleDateString(),
      totalSeconds: 0 
    };
    concluidos.push(novoConcluido);
    localStorage.setItem('livrosConcluidos', JSON.stringify(concluidos));

    const updatedClubs = clubs.filter(c => c.id !== clubToFinish.id);
    setClubs(updatedClubs);
    localStorage.setItem('clubsData', JSON.stringify(updatedClubs));

    setShowRating(false);
    setClubToFinish(null);
    
    if (onUpdate) onUpdate(); 
    
    alert("Leitura do clube concluída e salva no histórico!");
  };

  return (
    <>
      <div className="livros-grid">
        {clubs.length > 0 ? (
          clubs.map((club) => (
            <BookCard 
              key={club.id}
              title={club.name}           
              author={club.bookTitle}     
              timeRead={`Membros: ${club.membersCurrent}/${club.membersMax}`} 
              coverImage={club.cover || 'https://via.placeholder.com/100x150'}
              onClick={() => handleClubClick(club)} 
            />
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px' }}>
            <p style={{ color: '#666' }}>Nenhum clube ativo no momento.</p>
            <p style={{ fontSize: '14px', color: '#888' }}>Vá até a página "Clube do Livro" para criar um!</p>
          </div>
        )}
      </div>

      {selectedClub && (
        <ClubActionModal 
          club={selectedClub}
          onClose={() => setSelectedClub(null)}
          onRemove={handleRemoveClub}
          onFinish={handleInitiateFinish}
        />
      )}

      <RatingModal 
        isOpen={showRating}
        onClose={() => setShowRating(false)}
        onConfirm={handleConfirmRating}
      />
    </>
  );
};

export default ClubsSection;
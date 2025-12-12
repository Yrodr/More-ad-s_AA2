import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ClubCard from '../components/Clube/ClubCard';
import CreateClubModal from '../components/Clube/CreateClubModal';
import '../css/Club.css';

import imgPlaceholder from '../assets/img/el1.jpg'; 

const COST_CREATE_CLUB = 10; 

const Clube = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [points, setPoints] = useState(0);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const storedPoints = parseInt(localStorage.getItem('userPoints') || '0', 10);
    setPoints(storedPoints);

    const storedClubs = JSON.parse(localStorage.getItem('clubsData')) || [];
    setClubs(storedClubs);
  }, []);

  const handleOpenCreateModal = () => {
    if (points >= COST_CREATE_CLUB) {
      setIsModalOpen(true);
    } else {
      alert(`Você precisa de ${COST_CREATE_CLUB} pontos para criar um clube! Você tem apenas ${points}.`);
    }
  };

  const handleCreateClub = (newClubData) => {
    const newPoints = points - COST_CREATE_CLUB;
    setPoints(newPoints);
    localStorage.setItem('userPoints', newPoints);

    const capaFinal = (newClubData.cover && newClubData.cover !== "") 
                      ? newClubData.cover 
                      : imgPlaceholder;

    const newClub = {
      id: Date.now(), 
      name: newClubData.nome,
      
      bookTitle: newClubData.bookTitle || 'Livro Desconhecido',
      
      description: newClubData.descricao,
      membersCurrent: 1, 
      membersMax: newClubData.membros,
      startDate: new Date(newClubData.dataInicio).toLocaleDateString('pt-BR'),
      endDate: new Date(newClubData.dataFim).toLocaleDateString('pt-BR'),
      
      cover: capaFinal 
    };
    
    const updatedClubs = [newClub, ...clubs];
    setClubs(updatedClubs);
    localStorage.setItem('clubsData', JSON.stringify(updatedClubs));

    alert(`Clube criado com sucesso! -${COST_CREATE_CLUB} pontos.`);
  };

  return (
    <>
      <Header />
      <main style={{ marginTop: '40px', paddingBottom: '80px' }}>
        <div className="view-club">
          
          <button 
            className="botao-principal-club" 
            onClick={handleOpenCreateModal}
          >
            Começar um Clube do Livro • {COST_CREATE_CLUB} pts
          </button>

          <section className="lista-clubes">
            {clubs.length > 0 ? (
              clubs.map(club => (
                <ClubCard key={club.id} club={club} />
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                <h2 style={{ fontFamily: 'Abril Fatface', fontSize: '24px', marginBottom: '10px' }}>
                  Não há clubes...
                </h2>
                <p style={{ fontFamily: 'Istok Web', fontSize: '16px' }}>
                  Seja o primeiro a criar um clube de leitura!
                </p>
              </div>
            )}
          </section>

        </div>
      </main>

      <CreateClubModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreate={handleCreateClub} 
      />
    </>
  );
};

export default Clube;
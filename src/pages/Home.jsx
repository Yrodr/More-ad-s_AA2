import React, { useState } from 'react';
import Header from '../components/Header';
import UserProfile from '../components/Home/UserProfile';
import TabNavigation from '../components/TabNavigation';
import ReadingsSection from '../components/HomeSections/ReadingsSection';
import ClubsSection from '../components/HomeSections/ClubsSection';
import FinishedSection from '../components/HomeSections/FinishedSection';
import MyBookModal from '../components/Home/MyBookModal';
import RatingModal from '../components/Home/RatingModal'; 
import '../css/Home.css';

const Home = () => {
  const [currentTab, setCurrentTab] = useState('leituras');
  const [selectedBook, setSelectedBook] = useState(null); 
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [bookToRate, setBookToRate] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(0); 

  const forceUpdate = () => {
    setUpdateTrigger(prev => prev + 1);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleRemoveBook = (bookId) => {
    const leituras = JSON.parse(localStorage.getItem('minhasLeituras')) || [];
    const novasLeituras = leituras.filter(item => item.id !== bookId);
    localStorage.setItem('minhasLeituras', JSON.stringify(novasLeituras));
    
    setSelectedBook(null); 
    forceUpdate();
    alert("Livro removido das suas leituras.");
  };

  const handleInitiateFinish = (book) => {
    setBookToRate(book);
    setSelectedBook(null); 
    setShowRatingModal(true); 
  };

  const handleConfirmRating = (rating) => {
    if (!bookToRate) return;

    const leituras = JSON.parse(localStorage.getItem('minhasLeituras')) || [];
    const novasLeituras = leituras.filter(item => item.id !== bookToRate.id);
    localStorage.setItem('minhasLeituras', JSON.stringify(novasLeituras));

    const concluidos = JSON.parse(localStorage.getItem('livrosConcluidos')) || [];
    concluidos.push({ 
      ...bookToRate, 
      rating: rating, 
      finishedDate: new Date().toLocaleDateString(),
      totalSeconds: bookToRate.totalSeconds || 0 
    });
    localStorage.setItem('livrosConcluidos', JSON.stringify(concluidos));

    setShowRatingModal(false);
    setBookToRate(null);
    forceUpdate();
    
    alert("Livro concluído e avaliado com sucesso!");
  };

  return (
    <>
      <Header activePage="home" />
      <main>
        <div className="viewH">
          <UserProfile updateTrigger={updateTrigger} />

          <div className="leituras-container">
            <TabNavigation active={currentTab} onChange={setCurrentTab} />

            <div className="conteudo-abas">
              {currentTab === 'leituras' && (
                <ReadingsSection 
                  onBookClick={handleBookClick} 
                  key={updateTrigger} 
                />
              )}
              {currentTab === 'clubs' && (
                <ClubsSection onUpdate={forceUpdate} />
              )}
              {currentTab === 'concluidos' && <FinishedSection key={updateTrigger} />}
            </div>
          </div>
        </div>
      </main>

      {selectedBook && (
        <MyBookModal 
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onRemove={handleRemoveBook}
          onFinishDirectly={handleInitiateFinish} 
        />
      )}

      <RatingModal 
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        onConfirm={handleConfirmRating}
      />
    </>
  );
};

export default Home;
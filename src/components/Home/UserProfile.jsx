import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../css/Home.css";
import "../../css/HomeModal.css"; 
import userImg from '../../assets/img/u1.jpeg';
import iconClock from '../../assets/img/Clock.png';

const UserProfile = ({ updateTrigger }) => {
  const navigate = useNavigate();
  
  const [points, setPoints] = useState(0);
  const [lastBook, setLastBook] = useState("...");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showBookSelector, setShowBookSelector] = useState(false);
  const [myBooks, setMyBooks] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    try {
      const p = localStorage.getItem('userPoints');
      setPoints(p ? parseInt(p) : 0);

      const savedBook = localStorage.getItem('lastBookRead');
      if (savedBook) {
        const shortTitle = savedBook.length > 30 ? savedBook.substring(0, 30) + "..." : savedBook;
        setLastBook(shortTitle);
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    }
  }, [updateTrigger]);

  const handleOpenSelector = () => {
    try {
      const storedData = localStorage.getItem('minhasLeituras');
      const storedBooks = storedData ? JSON.parse(storedData) : [];
      
      if (Array.isArray(storedBooks)) {
        setMyBooks(storedBooks);
      } else {
        setMyBooks([]);
      }
      setShowBookSelector(true);
    } catch (error) {
      console.error("Erro ao carregar livros:", error);
      setMyBooks([]);
      setShowBookSelector(true);
    }
  };

  const handleSelectBook = (book) => {
    setShowBookSelector(false);
    navigate('/lendo', { state: { book } });
  };

  const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      <div className="perfil-container">
        <div className="perfil">
          {}
          <div className="user-info">
            <img src={userImg} className="foto" alt="Perfil" />
            <div className="dados">
              <div className="parte1">
                <h2>Nome</h2>
                <p>@usuarionome</p>
              </div>
              <div className="parte2">
                <h3>Meus pontos: {points}</h3>
                <span>última leitura : {lastBook}</span>
              </div>
            </div>
          </div>

          <div className="cronometro">
            <div className="box-tempo">
              <div className="tempo">{timeString}</div>
              <img src={iconClock} alt="Clock" className="icon" />
            </div>
            
            <button 
              className="botao-tipo1" 
              onClick={handleOpenSelector}
              style={{ fontSize: '18px', padding: '10px 20px', cursor: 'pointer' }}
            >
              Começar Leitura
            </button>
          </div>
        </div>
      </div>

      {showBookSelector && (
        <div className="home-modal-overlay" onClick={() => setShowBookSelector(false)}>
          <div 
            className="home-modal-content" 
            onClick={(e) => e.stopPropagation()} 
            style={{ maxWidth: '500px', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}
          >
            <span className="home-modal-close" onClick={() => setShowBookSelector(false)}>&times;</span>
            
            <h1 style={{fontSize: '24px', margin: '10px 0'}}>Escolha sua leitura</h1>
            <p style={{marginBottom: '20px', color: '#666'}}>Selecione um livro da sua lista para continuar:</p>

            <div style={{ 
              width: '100%', 
              overflowY: 'auto', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '10px',
              padding: '10px' 
            }}>
              {myBooks.length > 0 ? (
                myBooks.map((book) => (
                  <div 
                    key={book.id} 
                    onClick={() => handleSelectBook(book)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      padding: '10px',
                      border: '1px solid #E0D8D3',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      backgroundColor: '#fff',
                      transition: 'background 0.2s',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F4EFEB'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                  >
                    <img 
                      src={book.cover || 'https://via.placeholder.com/50x75'} 
                      alt="capa" 
                      style={{ width: '40px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                    <div style={{ textAlign: 'left' }}>
                      <h3 style={{ margin: 0, fontSize: '16px', color: '#34292A', fontFamily: 'Zain', fontWeight: 'bold' }}>
                        {book.title}
                      </h3>
                      <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
                        {book.author}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{textAlign: 'center', padding: '20px'}}>
                  <p>Sua lista está vazia.</p>
                  <p style={{fontSize: '14px', color: '#888'}}>Vá até a Livraria e adicione livros para começar a ler!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
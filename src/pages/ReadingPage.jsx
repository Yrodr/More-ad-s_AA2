import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import RatingModal from '../components/Home/RatingModal'; 
import '../css/ReadingPage.css';
import '../css/style.css'; 
import iconClock from '../assets/img/Clock.png';

const ReadingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state || {}; 

  const [seconds, setSeconds] = useState(0);
  const [points, setPoints] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showRating, setShowRating] = useState(false); 
  const workerRef = useRef(null);

  useEffect(() => {
    if (!book) {
      navigate('/home'); 
      return;
    }
    localStorage.setItem('lastBookRead', book.title);

    workerRef.current = new Worker('/timer.worker.js'); 
    workerRef.current.postMessage({ command: 'START' });

    workerRef.current.onmessage = (e) => {
      const { seconds: s, points: p } = e.data;
      setSeconds(s);
      setPoints(p);
    };

    return () => {
      if (workerRef.current) workerRef.current.terminate();
    };
  }, [book, navigate]);

  const formatTimeParts = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return { h, m, s };
  };

  const { h, m, s } = formatTimeParts(seconds);

  const togglePause = () => {
    if (isPaused) {
      workerRef.current.postMessage({ command: 'START', startTime: seconds });
    } else {
      workerRef.current.postMessage({ command: 'PAUSE' });
    }
    setIsPaused(!isPaused);
  };

  const savePoints = () => {
    const currentPoints = parseInt(localStorage.getItem('userPoints') || '0', 10);
    localStorage.setItem('userPoints', currentPoints + points);
  };

  const handleFinishSession = () => {
    savePoints();
    const leituras = JSON.parse(localStorage.getItem('minhasLeituras')) || [];
    const novasLeituras = leituras.map(item => {
      if (item.id === book.id) {
        return { ...item, totalSeconds: (item.totalSeconds || 0) + seconds };
      }
      return item;
    });
    localStorage.setItem('minhasLeituras', JSON.stringify(novasLeituras));
    
    alert(`Sessão finalizada! Você ganhou ${points} pontos.`);
    navigate('/home');
  };

  const handleOpenRating = () => {
    setShowRating(true);
    if (!isPaused) togglePause(); 
  };

  const handleConfirmFinish = (rating) => {
    savePoints();

    const leituras = JSON.parse(localStorage.getItem('minhasLeituras')) || [];
    const livroAtual = leituras.find(b => b.id === book.id);
    const tempoTotalFinal = (livroAtual?.totalSeconds || 0) + seconds;

    const novasLeituras = leituras.filter(b => b.id !== book.id);
    localStorage.setItem('minhasLeituras', JSON.stringify(novasLeituras));

    const concluidos = JSON.parse(localStorage.getItem('livrosConcluidos')) || [];
    concluidos.push({ 
      ...book, 
      totalSeconds: tempoTotalFinal, 
      finishedDate: new Date().toLocaleDateString(),
      rating: rating 
    });
    localStorage.setItem('livrosConcluidos', JSON.stringify(concluidos));

    alert(`Livro concluído com ${rating} estrelas! +${points} pontos.`);
    navigate('/home');
  };

  if (!book) return null;

  return (
    <>
      <Header activePage="home" />
      <main className="viewH" style={{ width: '70%', margin: '0 auto' }}>
        <div className="cronometro-container">
          <div className="sistema-ponto">
            <div className="fundo">
              <div className="view-cronometro">
                <div className="box-tempo">
                  
                  <div className="tempo-leitura">
                    {h}:{m}<span className="segundos-pequenos">:{s}</span>
                  </div>

                  <img src={iconClock} className="icon-clock" alt="clock" />
                </div>
                <h2 className="titulo-livro-lendo">{book.title}</h2>
              </div>

              <div className="coluna-direita">
                <div className="box-pontos">
                  <p>pontos recebidos</p>
                  <h1>{points}</h1>
                </div>

                <div className="controle-tempo">
                  <button onClick={handleFinishSession} className="btn-controle">Acabar Leitura</button>
                  <button onClick={togglePause} className="btn-controle">{isPaused ? "Retomar" : "Pausar"}</button>
                </div>

                <button onClick={handleOpenRating} className="btn-concluir">Concluir Livro</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <RatingModal 
        isOpen={showRating} 
        onClose={() => setShowRating(false)} 
        onConfirm={handleConfirmFinish} 
      />
    </>
  );
};

export default ReadingPage;
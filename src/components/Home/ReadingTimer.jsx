import React, { useState, useEffect, useRef } from 'react';
import "../../css/Home.css";
import iconClock from '../../assets/img/Clock.png';

const ReadingTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const workerRef = useRef(null);

  useEffect(() => {
    workerRef.current = new Worker('/timer.worker.js');

    workerRef.current.onmessage = (e) => {
      const { seconds: s } = e.data;
      setSeconds(s);
    };

    return () => {
      workerRef.current.terminate();
    };
  }, []);

  const toggleTimer = () => {
    if (isActive) {
      workerRef.current.postMessage({ command: 'PAUSE' });
    } else {
      workerRef.current.postMessage({ command: 'START', startTime: seconds });
    }
    setIsActive(!isActive);
  };

  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');

  return (
    <div className="cronometro">
      <div className="box-tempo">
        <div className="tempo" style={{ display: 'flex', alignItems: 'baseline' }}>
          {h}:{m}<span style={{ fontSize: '0.6em' }}>:{s}</span>
        </div>
        <img src={iconClock} alt="Clock" className="icon" />
      </div>
      
      <button 
        className="botao-tipo1" 
        onClick={toggleTimer}
        style={{ fontSize: '18px', padding: '10px 20px', cursor: 'pointer' }}
      >
        {isActive ? 'Pausar Leitura' : 'Começar Leitura'}
      </button>
    </div>
  );
};

export default ReadingTimer;
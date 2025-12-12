/* eslint-disable no-restricted-globals */
let timerInterval;
let seconds = 0;

self.onmessage = function(e) {
  const { command, startTime } = e.data;

  if (command === 'START') {
    // Se receber um tempo inicial, continua dele
    if (startTime) seconds = startTime;
    
    timerInterval = setInterval(() => {
      seconds++;
      // Envia o tempo atualizado e os pontos calculados (ex: 1 ponto a cada 60s)
      const points = Math.floor(seconds / 60) * 10; 
      
      self.postMessage({ seconds, points });
    }, 1000);
    
  } else if (command === 'PAUSE' || command === 'STOP') {
    clearInterval(timerInterval);
  } else if (command === 'RESET') {
    clearInterval(timerInterval);
    seconds = 0;
    self.postMessage({ seconds: 0, points: 0 });
  }
};
// src/workers/timerWorker.js
let timerInterval = null;
let seconds = 0;

self.onmessage = (e) => {
  const { command, startValue } = e.data;

  if (command === 'START') {
    if (startValue !== undefined) seconds = startValue;
    
    timerInterval = setInterval(() => {
      seconds++;
      // Envia o tempo atualizado de volta para o React
      self.postMessage(seconds);
    }, 1000);
  } 
  else if (command === 'PAUSE') {
    clearInterval(timerInterval);
  } 
  else if (command === 'RESET') {
    clearInterval(timerInterval);
    seconds = 0;
    self.postMessage(0);
  }
};
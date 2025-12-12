import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header'; 
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Home from './pages/Home';
import Livraria from './pages/Livraria';
import ReadingPage from './pages/ReadingPage';
import Clube from './pages/Clube'; 
import './css/style.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/livraria" element={<Livraria />} />
        
        {}
        <Route path="/clubes" element={<Clube />} />
        
        <Route path="/lendo" element={<ReadingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
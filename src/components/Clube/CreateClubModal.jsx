import React, { useState, useEffect } from 'react';
import '../../css/Club.css';

const CreateClubModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    nome: '',
    livroId: '', 
    descricao: '',
    membros: '',
    dataInicio: '',
    dataFim: ''
  });

  const [myBooks, setMyBooks] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const storedData = localStorage.getItem('minhasLeituras');
      if (storedData) {
        setMyBooks(JSON.parse(storedData));
      } else {
        setMyBooks([]);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const livroSelecionado = myBooks.find(book => String(book.id) === String(formData.livroId));

    const dadosFinais = {
      ...formData,
      livro: livroSelecionado ? livroSelecionado.title : 'Livro Desconhecido',
      cover: livroSelecionado ? livroSelecionado.cover : null
    };

    onCreate(dadosFinais);
    
    onClose();
    setFormData({ nome: '', livroId: '', descricao: '', membros: '', dataInicio: '', dataFim: '' });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-conteudo-club" onClick={(e) => e.stopPropagation()}>
        <span className="fechar-modal" onClick={onClose}>&times;</span>
        
        <h2>Começar um Clube do Livro</h2>

        <form className="form-club" onSubmit={handleSubmit}>
          <div>
            <label>Nome do Clube</label>
            <input 
              type="text" 
              name="nome" 
              placeholder="Digite o nome do clube" 
              maxLength="70" 
              required 
              value={formData.nome} 
              onChange={handleChange} 
            />
          </div>

          <div>
            <label>Livro:</label>
            <p>Livros que estão em Minhas Leituras</p>
            
            <select 
              name="livroId" 
              required 
              value={formData.livroId} 
              onChange={handleChange}
            >
              <option value="" disabled>Selecione um livro</option>
              
              {myBooks.length > 0 ? (
                myBooks.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title}
                  </option>
                ))
              ) : (
                <option disabled>Adicione livros na Livraria primeiro</option>
              )}
            </select>
          </div>

          <div>
            <label>Descrição</label>
            <textarea 
              name="descricao" 
              placeholder="Descreva brevemente..." 
              maxLength="350" 
              required 
              value={formData.descricao} 
              onChange={handleChange} 
            />
          </div>

          <div>
            <label>Membros:</label>
            <select name="membros" required value={formData.membros} onChange={handleChange}>
              <option value="" disabled>Selecione...</option>
              <option value="3">3 membros</option>
              <option value="6">6 membros</option>
              <option value="10">10 membros</option>
              <option value="15">15 membros</option>
            </select>
          </div>

          <div className="datas-row">
            <div>
              <label>Início</label>
              <input type="date" name="dataInicio" required onChange={handleChange} />
            </div>
            <div>
              <label>Fim</label>
              <input type="date" name="dataFim" required onChange={handleChange} />
            </div>
          </div>

          <button 
            type="submit" 
            className="botao-principal-club" 
            style={{textAlign:'center', marginTop:'10px', backgroundColor: '#34292A', color: 'white'}}
          >
            Criar Club • 10 pts
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateClubModal;
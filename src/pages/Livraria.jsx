import { useState, useEffect } from 'react';
import Header from '../components/Header';
import BookModal from '../components/Livraria/BookModal'; 
import '../css/Livraria.css';
import lupaIcon from '../css/icons/pesquisa.png';

const Livraria = () => {
  const [busca, setBusca] = useState('');
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const carregarLivros = async (termo) => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${termo}&langRestrict=pt&maxResults=20&orderBy=relevance`);
      const data = await response.json();
      setLivros(data.items || []);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarLivros("literatura fantástica"); 
  }, []);

  const pesquisarLivros = (e) => {
    e.preventDefault();
    if (busca) carregarLivros(busca);
  };

  const handleAddToReadings = (book) => {
    let leiturasSalvas = [];
    try {
      const dados = localStorage.getItem('minhasLeituras');
      leiturasSalvas = dados ? JSON.parse(dados) : [];
      if (!Array.isArray(leiturasSalvas)) leiturasSalvas = [];
    } catch (e) {
      leiturasSalvas = [];
    }

    const jaExiste = leiturasSalvas.some(item => item.id === book.id);

    if (!jaExiste) {
      const novoLivro = {
        id: book.id,
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'Desconhecido',
        cover: book.volumeInfo.imageLinks?.thumbnail,
        totalSeconds: 0, 
        time: '00:00' 
      };

      leiturasSalvas.push(novoLivro);
      localStorage.setItem('minhasLeituras', JSON.stringify(leiturasSalvas));
      
      alert('Livro adicionado com sucesso!');
      setSelectedBook(null);
    } else {
      alert('Você já adicionou este livro.');
    }
  };

  return (
    <div className="livraria-page">
      <Header />
      <main className="view">
          <form className="barra-pesquisa" onSubmit={pesquisarLivros}>
                <input 
                  type="text" 
                  placeholder="Pesquise por Livro..." 
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
              />
              <button type="submit" className="icone-busca">
                  <img src={lupaIcon} alt="Pesquisar" />
              </button>
          </form>

          {loading && <p style={{textAlign: 'center', marginTop: '20px'}}>Carregando...</p>}

          <section className="lista-livros">
              {livros.map((item) => {
                  const info = item.volumeInfo;
                  const imagemCapa = info.imageLinks?.thumbnail || 'https://via.placeholder.com/128x190?text=Sem+Capa';
                  
                  return (
                      <div 
                        key={item.id} 
                        className="card-livro"
                        onClick={() => setSelectedBook(item)} 
                        style={{cursor: 'pointer'}}
                      >
                          <img src={imagemCapa} alt={info.title} className="img-livro" />
                          <div className="info-livro">
                              <h2>{info.title}</h2>
                              <h3>{info.authors ? info.authors.join(', ') : 'Autor Desconhecido'}</h3>
                              <p className="descricao">
                                  {info.description || 'Sem descrição.'}
                              </p>
                          </div>
                      </div>
                  );
              })}
          </section>
      </main>

      {selectedBook && (
        <BookModal 
          book={selectedBook} 
          onClose={() => setSelectedBook(null)} 
          onAdd={handleAddToReadings}
        />
      )}
    </div>
  );
};

export default Livraria;
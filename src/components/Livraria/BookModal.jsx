import React from 'react';
import '../../css/Livraria.css';


const BookModal = ({ book, onClose, onAdd }) => {
  if (!book) return null;

  const info = book.volumeInfo;
  
  const imagemCapa = info.imageLinks?.thumbnail || 'https://via.placeholder.com/128x190?text=Sem+Capa';
  const autores = info.authors ? info.authors.join(', ') : 'Autor Desconhecido';
  const dataPub = info.publishedDate || 'Data n/a';
  const editora = info.publisher || 'Editora n/a';
  const categorias = info.categories ? info.categories.join(', ') : 'Geral';
  
  const descricaoLimpa = info.description ? info.description.replace(/<[^>]+>/g, '') : 'Sem descrição disponível.';

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 9999, 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    visibility: 'visible',
    opacity: 1             
  };

  return (
    <div className="overlay" style={overlayStyle}>
      <div className="popup">
        <a className="close" onClick={onClose} style={{cursor: 'pointer', fontSize: '30px'}}>&times;</a>

        <div className="container-principal">
            <div className="linha-superior">
                <div className="sobre-livro">
                    <img src={imagemCapa} className="imagem-livro-modal" alt={info.title} /> 

                    <div className="box-detalhe">
                        <p><strong>Autor:</strong> {autores}</p>
                        <p><strong>Lançamento:</strong> {dataPub}</p>
                        <p><strong>Editora:</strong> {editora}</p>
                        <p><strong>Gênero:</strong> {categorias}</p>
                    </div>
                </div>

                <div className="texto-livro">
                    <h2>{info.title}</h2>
                    <p className="descricao-modal">{descricaoLimpa}</p>
                </div>
            </div>

            <div className="view-botao">
                <button 
                    className="botao-tipo1" 
                    onClick={() => onAdd(book)}
                >
                    Adicionar às Minhas Leituras
                </button>
            </div> 
        </div>
      </div>
    </div>
  );
};

export default BookModal;
import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [dogImage, setDogImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar uma imagem aleatória de cachorro
  const fetchDogImage = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      if (data.status === 'success') {
        setDogImage(data.message);
      } else {
        throw new Error('Erro ao buscar a imagem');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Chama a função ao montar o componente
    fetchDogImage();
  }, []);

  return (
    <div className="App">
      <h1>Imagem Aleatória de Cachorro</h1>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      {dogImage && <img src={dogImage} alt="Cachorro Aleatório" style={{ width: '300px', height: 'auto' }} />}
      <button onClick={() => fetchDogImage()}>Nova Imagem</button>
    </div>
  );
};

export default App;

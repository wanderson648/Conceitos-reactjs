import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [respositories, setRepositiries] = useState([]);

  useEffect(() => {
    api.get('/repositories')
    .then(({data}) => setRepositiries(data)) 
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', { "title": `Rocketseat ${Date.now()}` });

    setRepositiries([...respositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const { status } = await api.delete(`/repositories/${id}`);

    if( status === 204) {
      setRepositiries([...respositories.filter(repository => repository.id !== id)]);
    }
  }

  
  return (
    <div>
      <ul data-testid="repository-list">
        {respositories.map(repo => (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          ))}  
      </ul>
       
      <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

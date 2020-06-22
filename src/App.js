import React, { useState } from "react";
import api from './services/api';
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const repository = await api.post('/repositories', {
      title: "Novo"
    })

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const newRepositories = repositories.filter((repository) => repository.id !== id);
    console.log(newRepositories)
  }

  async function handleShowRepository(id) {    
    console.log(repositories)
  }
  

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.data.id}>
          <h3>Title: {repository.data.title} - </h3>
          <p> id {repository.data.id}</p>
          <button onClick={() => handleRemoveRepository(repository.data.id)}>
            Remover
          </button>
          {/* <button onClick={handleShowActualRepository}>Mostra log do atual</button> */}
        </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
      <p></p>
      <button onClick={handleShowRepository}>Mostra log</button>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import ComputerGrid from './components/computer/ComputerGrid';
import './App.css';
import serverImage from './assets/server.png';

function App() {
  const [sync, setSync] = useState(false);
  const [resetTime, setResetTime] = useState(false);

  const handleSync = () => {
    setSync(true);
    setResetTime(false);

    // Espera 3 segundos antes de resetar os relógios para "00:00:00"
    setTimeout(() => {
      setSync(false);
      setResetTime(true);
    }, 4000);
  };

  return (
    <div className="app-container">
      {/* <h1 style={{ color: '#81c784', marginBottom: '20px' }}>Simulador de Sincronização de Relógios</h1> */}
      <div className={`server-container ${sync ? 'syncing' : ''}`}>
        <img src={serverImage} alt="Servidor" className="server-image" />
        <button onClick={handleSync} className="sync-button">
          Sincronizar
        </button>
      </div>
      <ComputerGrid resetTime={resetTime} />
    </div>
  );
}

export default App;

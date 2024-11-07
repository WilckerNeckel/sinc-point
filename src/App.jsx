import React, { useState } from 'react';
import ComputerGrid from './components/computer/ComputerGrid';
import ServerClock from './components/server/ServerClock';
import './App.css';

function App() {
  const [sync, setSync] = useState(false);
  const [resetTime, setResetTime] = useState(false);

  const handleSync = () => {
    setSync(true);
    setResetTime(false);

    // Espera 4 segundos antes de resetar os relógios para "00:00:00"
    setTimeout(() => {
      setSync(false);
      setResetTime(true);
    }, 4000);
  };

  return (
    <div className="app-container">
      <div className={`server-image-container ${sync ? 'syncing' : ''}`}>
        <ServerClock resetTime={resetTime} timeAdjustment={5} />
      </div>
      <button onClick={handleSync} className="sync-button">
        Sincronizar
      </button>
      <ComputerGrid resetTime={resetTime} />
    </div>
  );
}

export default App;

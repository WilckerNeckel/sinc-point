import React from 'react';
import ComputerGrid from './components/computer/ComputerGrid';
import './App.css';
function App() {
  return (
    <div>
      <h1 style={{ color: '#81c784', marginBottom: '20px' }}>Simulador de Sincronização de Relógios</h1>      <ComputerGrid />
    </div>
  );
}

export default App;

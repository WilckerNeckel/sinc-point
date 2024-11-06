import React, { useState } from 'react';
import ComputerCard from './ComputerCard';

function ComputerGrid() {
  const [computers, setComputers] = useState([
    { id: 1, ip: '192.168.1.1', time: '2024-11-06T08:30:00' },
    { id: 2, ip: '192.168.1.2', time: '2024-11-06T08:30:00' },
    // Adicione mais computadores conforme necessário
  ]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {computers.map((computer) => (
        <ComputerCard key={computer.id} ip={computer.ip} time={computer.time} />
      ))}
    </div>
  );
}

export default ComputerGrid;

import React from 'react';
import ComputerCard from './ComputerCard';

function ComputerGrid({ resetTime }) {
  const computers = [
    { id: 1, ip: '192.168.1.1' },
    { id: 2, ip: '192.168.1.2' },
    // Adicione mais computadores conforme necessário
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {computers.map((computer) => (
        <ComputerCard key={computer.id} ip={computer.ip} resetTime={resetTime} />
      ))}
    </div>
  );
}

export default ComputerGrid;

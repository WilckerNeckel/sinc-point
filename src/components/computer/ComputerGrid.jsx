import React from 'react';
import ComputerCard from './ComputerCard';

function ComputerGrid({ resetTime }) {
  const computers = [
    { id: 1, ip: '192.168.1.1', time: '2024-11-06T08:30:00', timeAdjustment: 5 }, // Ajuste de +5 segundos
    { id: 2, ip: '192.168.1.2', time: '2024-11-06T09:00:00', timeAdjustment: -3 }, // Ajuste de -3 segundos
    // Adicione mais computadores conforme necessário
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {computers.map((computer) => (
        <ComputerCard
          key={computer.id}
          ip={computer.ip}
          time={computer.time}
          resetTime={resetTime}
          timeAdjustment={computer.timeAdjustment} // Passando o ajuste de tempo como prop
        />
      ))}
    </div>
  );
}

export default ComputerGrid;

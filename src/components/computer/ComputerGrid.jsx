import React from 'react';
import ComputerCard from './ComputerCard';

function ComputerGrid({ computers, resetTime, setComputers }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {computers.map((computer) => (
        <ComputerCard
          key={computer?.id}
          ip={computer?.ip}
          time={computer?.time}
          resetTime={resetTime}
          timeAdjustment={computer?.timeAdjustment}
          setComputers={setComputers}
        />
      ))}
    </div>
  );
}

export default ComputerGrid;

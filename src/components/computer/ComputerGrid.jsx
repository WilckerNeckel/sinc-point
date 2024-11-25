import React from 'react';
import ComputerCard from './ComputerCard';

function ComputerGrid({ computers, onDeleteCard }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
      {computers.map((computer) => (
        <ComputerCard
          key={computer?.id}
          ip={computer?.ip}
          time={computer?.time}
          timeAdjustment={computer?.timeAdjustment}
          onDeleteCard={onDeleteCard}
        />
      ))}
    </div>
  );
}

export default ComputerGrid;

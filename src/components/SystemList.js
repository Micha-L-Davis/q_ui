import React from 'react';
import System from './System';

function SystemList({ systems, handleSelectSystem, selectedSystem }) {
  return (
    <div className="system-list">
      {systems.map((system) => (
        <System
          key={system.symbol}
          system={system}
          onClick={() => handleSelectSystem(system)}
          isSelected={selectedSystem?.symbol === system.symbol}
        />
      ))}
    </div>
  );
}

export default SystemList;

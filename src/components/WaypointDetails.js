import React from 'react';

const WaypointDetails = ({ waypoint }) => {
  console.log('Deets', waypoint);
  return (
    <div>
      <h2>{waypoint.symbol}</h2>
      <p>Type: {waypoint.type}</p>
      <p>X: {waypoint.x}</p>
      <p>Y: {waypoint.y}</p>
      <h3>Traits:</h3>
      <ul>
        {waypoint.traits.map((trait, index) => (
          <li key={index}>
            <strong>{trait.name}</strong> - {trait.description}
          </li>
        ))}
      </ul>
      <h3>Chart:</h3>
      <p>Submitted by: {waypoint.chart?.submittedBy}</p>
      <p>Submitted on: {waypoint.chart?.submittedOn}</p>
      <h3>Faction:</h3>
      <p>{waypoint.faction?.symbol}</p>
    </div>
  );
};

export default WaypointDetails;

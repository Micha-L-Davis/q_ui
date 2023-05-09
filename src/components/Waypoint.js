import React from "react";

const Waypoint = ({ waypoint, onClick, isSelected }) => {
  const { symbol, type } = waypoint;
  return (
    <div onClick={onClick} style={{ fontWeight: isSelected ? "bold" : "normal" }}>
      {symbol} ({type})
    </div>
  );
};

export default Waypoint;

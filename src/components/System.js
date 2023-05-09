import React from "react";


const System = ({ system, onClick, isSelected }) => {
  const { symbol } = system;

  return (
    <div onClick={onClick} style={{ fontWeight: isSelected ? "bold" : "normal" }}>
      <h2>{symbol}</h2>
    </div>
  );
};

export default System;

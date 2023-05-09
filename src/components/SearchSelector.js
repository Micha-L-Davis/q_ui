import React from "react";

function SearchSelector({ selectedTags, onTagClick }) {
  const waypointTags = ["PLANET", "GAS_GIANT", "ASTEROID_FIELD", "MOON", "ORBITAL_STATION", "JUMP_GATE", "NEBULA", "DEBRIS_FIELD", "GRAVITY_WELL"];
  return (
    <div className="search-selector">
      {waypointTags.map((tag) => (
        <button
          key={tag}
          className={selectedTags.includes(tag) ? "active" : ""}
          onClick={() => onTagClick(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

export default SearchSelector;

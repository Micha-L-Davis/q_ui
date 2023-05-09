import React from "react";
import Waypoint from "./Waypoint";

const WaypointList = ({ waypoints, onWaypointSelect, selectedWaypointIndex }) => {
  return (
    <ul>
      {waypoints.map((waypoint, index) => (
        <li key={waypoint.symbol}>
          <Waypoint
            waypoint={waypoint}
            onClick={() => onWaypointSelect(index)}
            isSelected={index === selectedWaypointIndex}
          />
        </li>
      ))}
    </ul>
  );
};

export default WaypointList;

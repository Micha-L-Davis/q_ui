import React, { useState } from "react";
import SystemList from "./SystemList";
import WaypointList from "./WaypointList";
import WaypointDetails from "./WaypointDetails";

function SystemViewer({ systems }) {
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [selectedWaypoint, setSelectedWaypoint] = useState(null);
  const [waypointDetails, setWaypointDetails] = useState(null);

  const handleSelectSystem = (system) => {
    setSelectedSystem(system);
    setSelectedWaypoint(null);
  };

  const token = process.env.REACT_APP_SPACETRADERS_TOKEN;
  const handleWaypointSelect = async (index) => {
    const waypoint = selectedSystem.waypoints[index];
    setSelectedWaypoint(waypoint);

    try {
      const response = await fetch(`https://api.spacetraders.io/v2/systems/${selectedSystem.symbol}/waypoints/${waypoint.symbol}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();
      console.log('Waypoint details', data.data);
      setWaypointDetails(data.data);
    } catch (error) {
      console.error('Error fetching waypoint details', error);
      setWaypointDetails(null);
    }
  };


  const renderWaypointList = () => {
    if (!selectedSystem) {
      return null;
    }
    return (
      <WaypointList
        waypoints={selectedSystem.waypoints}
        onWaypointSelect={handleWaypointSelect}
      />
    );
  };

  const renderWaypointDetails = () => {
    if (!selectedWaypoint) {
      return null;
    }

    if (!waypointDetails) {
      return <div>Loading...</div>;
    }

    return <WaypointDetails waypoint={waypointDetails} />;
  };

  return (
    <div className="system-viewer">
      <div className="column">
        <SystemList systems={systems} handleSelectSystem={handleSelectSystem} selectedSystem={selectedSystem} />
      </div>
      <div className="column">
        {renderWaypointList()}
      </div>
      <div className="column">
        {renderWaypointDetails()}
      </div>
    </div>
  );
}

export default SystemViewer;

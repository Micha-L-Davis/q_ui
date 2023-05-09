import React, { useState } from "react";
import SystemList from "./SystemList";
import WaypointList from "./WaypointList";
import WaypointDetails from "./WaypointDetails";
import SearchSelector from "./SearchSelector";

function SystemViewer({ systems }) {
  const token = process.env.REACT_APP_SPACETRADERS_TOKEN;

  const [selectedSystem, setSelectedSystem] = useState(null);
  const [selectedWaypoint, setSelectedWaypoint] = useState(null);
  const [waypointDetails, setWaypointDetails] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);


  const filteredSystems = systems.filter((system) => {
    if (selectedTags.length === 0) {
      return true;
    }
    const waypointTypes = system.waypoints.map((waypoint) => waypoint.type);
    return selectedTags.every((tag) => waypointTypes.includes(tag));
  });

  const handleSelectSystem = (system) => {
    setSelectedSystem(system);
    setSelectedWaypoint(null);
  };

  const handleTagSelect = (tag) => {
    console.log("Current tags", selectedTags);
    console.log("Setting ", tag);
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };


  const renderSystemList = () => {
    console.log("Filtered systems", filteredSystems)
    return (
      <SystemList
        systems={filteredSystems}
        handleSelectSystem={handleSelectSystem}
        selectedSystem={selectedSystem}
        onTagSelect={handleTagSelect}
        selectedTags={selectedTags}
      />
    );
  };

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
      <>
        <h2>{selectedSystem.symbol}</h2>
        <WaypointList
          waypoints={selectedSystem.waypoints}
          onWaypointSelect={handleWaypointSelect}
        />
      </>
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
    <>
      <div><SearchSelector selectedTags={selectedTags} onTagClick={handleTagSelect} /></div>
      <div className="system-viewer">
        <div className="column">
          {renderSystemList()}
        </div>
        <div className="column">
          {renderWaypointList()}
        </div>
        <div className="column">
          {renderWaypointDetails()}
        </div>
      </div>
    </>
  );
}

export default SystemViewer;

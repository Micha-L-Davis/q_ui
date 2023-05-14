import createSurvey from "./create-survey";
import dockShip from "./dock-ship";
import extractResources from "./extract-resources";
import navigateShip from "./navigate-ship";
import orbitShip from "./orbit-ship";
import purchaseShip from "./purchase-ship";
import refuelShip from "./refuel-ship";
import sellCargo from "./sell-cargo";

const actionEndpoints = {
  createSurvey,
  dockShip,
  extractResources,
  navigateShip,
  orbitShip,
  purchaseShip,
  refuelShip,
  sellCargo,
}

export default actionEndpoints;

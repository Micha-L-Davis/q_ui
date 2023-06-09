import { ActionEndpoint } from '../index.js';

const API_TOKEN = process.env.REACT_APP_SPACETRADERS_TOKEN;

function purchaseShip(shipType, waypointSymbol, cost) {
  new ActionEndpoint(
    'Purchase Ship',
    'POST',
    'https://api.spacetraders.io/v2/my/ships',
    [`Authorization: Bearer ${API_TOKEN}`],
    {
      shipType: `${shipType}`,
      waypointSymbol: `${waypointSymbol}`
    },
    {
      credits: cost,
    }
  );
}

export default purchaseShip;

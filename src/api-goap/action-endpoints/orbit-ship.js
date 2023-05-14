import { ActionEndpoint } from '../index.js';

const API_TOKEN = process.env.REACT_APP_SPACETRADERS_TOKEN;

function orbitShip(shipSymbol) {
  new ActionEndpoint(
    'Orbit Ship',
    'POST',
    `https://api.spacetraders.io/v2/my/ships/${shipSymbol}/orbit`,
    [`Authorization: Bearer ${API_TOKEN}`],
    null,
    {
      nav: {
        status: 'DOCKED'
      },
    }
  );
}

export default orbitShip;

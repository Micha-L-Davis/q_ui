import { ActionEndpoint } from '../index.js';

const API_TOKEN = process.env.REACT_APP_SPACETRADERS_TOKEN;

function dockShip(shipSymbol) {
  new ActionEndpoint(
    'Dock Ship',
    'POST',
    `https://api.spacetraders.io/v2/my/ships/${shipSymbol}/dock`,
    [`Authorization: Bearer ${API_TOKEN}`],
    null,
    {
      nav: {
        status: 'IN_ORBIT'
      },
    }
  );
}

export default dockShip;

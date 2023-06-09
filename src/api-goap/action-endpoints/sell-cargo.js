import { ActionEndpoint } from '../index.js';

const API_TOKEN = process.env.REACT_APP_SPACETRADERS_TOKEN;

function sellCargo(shipSymbol, resourceSymbol, units) {
  new ActionEndpoint(
    'Sell Cargo',
    'POST',
    `https://api.spacetraders.io/v2/my/ships/${shipSymbol}/sell`,
    [`Authorization: Bearer ${API_TOKEN}`],
    {
      symbol: `${resourceSymbol}`,
      units: units
    },
    {
      nav: {
        status: 'DOCKED',
      },
      cargo: {
        empty: false,
      }
    }
  );
}

export default sellCargo;

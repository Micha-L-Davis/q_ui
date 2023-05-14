import { ActionEndpoint } from '../index.js';

const API_TOKEN = process.env.REACT_APP_SPACETRADERS_TOKEN;

const refuelShip = (shipSymbol) => {
  new ActionEndpoint(
    'Refuel Ship',
    'POST',
    `https://api.spacetraders.io/v2/my/ships/${shipSymbol}/survey`,
    [`Authorization: Bearer ${API_TOKEN}`],
    null,
    {
      fuel: {
        full: false,
      },
    }
  );
};

export default refuelShip;

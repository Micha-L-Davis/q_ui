import { ActionEndpoint } from '../index.js';

const API_TOKEN = process.env.REACT_APP_SPACETRADERS_TOKEN;

const dockShip = (shipSymbol) => {
  new ActionEndpoint(
    'Dock Ship',
    'POST',
    `https://api.spacetraders.io/v2/my/ships/${shipSymbol}/dock`,
    [`Authorization: Bearer ${API_TOKEN}`],
    null,
    //prerequiste state
  );
};

export default dockShip;

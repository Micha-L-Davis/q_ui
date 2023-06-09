import { ActionEndpoint } from '../index.js';

const API_TOKEN = process.env.REACT_APP_SPACETRADERS_TOKEN;

function createSurvey(shipSymbol, waypointSymbol) {
  new ActionEndpoint(
    'Create Survey',
    'POST',
    `https://api.spacetraders.io/v2/my/ships/${shipSymbol}/survey`,
    [`Authorization: Bearer ${API_TOKEN}`],
    {
      waypointSymbol: `${waypointSymbol}`
    },
    {
      fuel: {
        overTravelThreshold: true,
      }
    }
  );
}

export default createSurvey;

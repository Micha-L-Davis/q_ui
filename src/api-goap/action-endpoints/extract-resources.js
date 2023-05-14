import ActionEndpoint from '../index.js';

const API_TOKEN = process.env.REACT_APP_SPACETRADERS_TOKEN;

function createSurvey(shipSymbol, survey = null) {
  new ActionEndpoint(
    'Create Survey',
    'POST',
    `https://api.spacetraders.io/v2/my/ships/${shipSymbol}/extract`,
    [`Authorization: Bearer ${API_TOKEN}`],
    survey,
    {
      nav: {
        system: {
          type: 'ASTEROID_BELT',
        },
        status: 'IN_ORBIT'
      },
      cargo: {
        isFull: false,
      }
    }
  );
}

export default createSurvey;

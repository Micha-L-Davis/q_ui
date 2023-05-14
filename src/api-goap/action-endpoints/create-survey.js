import { ActionEndpoint } from '../index.js';

const API_TOKEN = process.env.REACT_APP_SPACETRADERS_TOKEN;

const createSurvey = (shipSymbol) => {
  new ActionEndpoint(
    'Create Survey',
    'POST',
    `https://api.spacetraders.io/v2/my/ships/${shipSymbol}/survey`,
    [`Authorization: Bearer ${API_TOKEN}`],
    null,
    {
      nav: {
        system: {
          type: 'ASTEROID_BELT',
          survey: {
            isActive: true,
          },
        },
        status: 'IN_ORBIT'
      },
      cargo: {
        isFull: false,
      }
    },
  );
};

export default createSurvey;

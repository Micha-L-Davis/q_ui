const API_TOKEN = process.env.REACT_APP_SPACETRADERS_TOKEN;

export async function getMyAgent() {
  const response = await fetch('https://api.spacetraders.io/v2/my/agent', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function getShips() {
  const response = await fetch('https://api.spacetraders.io/v2/my/ships', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
    },
  });
  const data = await response.json();
  return data;
}

const getters = {
  getMyAgent,
  getShips,
};

export default getters;

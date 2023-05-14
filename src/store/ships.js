import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ships: getShips(),
};

const API_TOKEN = process.env.REACT_APP_SPACETRADERS_TOKEN;

async function getShips() {
  const response = await fetch('https://api.spacetraders.io/v2/my/ships', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
    },
  });
  const data = await response.json();
  return data.data;
}

const shipsSlice = createSlice({
  name: 'ships',
  initialState,
  reducers: {
    addShip(state, action) {
      state.ships.push(action.payload);
    },
    updateNav(state, action) {
      const ship = state.ships.find(ship => ship.symbol === action.payload.symbol);
      ship.nav = action.payload.nav;
    },
    updateFuel(state, action) {
      const ship = state.ships.find(ship => ship.symbol === action.payload.symbol);
      ship.fuel = action.payload.fuel;
    },
    updateCargo(state, action) {
      const ship = state.ships.find(ship => ship.symbol === action.payload.symbol);
      ship.cargo = action.payload.cargo;
    },
  },
});

export const { updateNav, addShip, updateFuel, updateCargo } = shipsSlice.actions;
export default shipsSlice.reducer;

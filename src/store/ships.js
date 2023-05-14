import { createSlice } from '@reduxjs/toolkit';
import { getShips } from '../api-goap/information-endpoints';

const initialState = {
  ships: getShips(),
};

const shipsSlice = createSlice({
  name: 'ships',
  initialState,
  reducers: {
    addShip(state, action) {
      state.ships.push(action.payload);
    },
    updateShips(state, action) {
      state.ships = action.payload;
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
    updateCoolDown(state, action) {
      const ship = state.ships.find(ship => ship.symbol === action.payload.symbol);
      ship.coolDown = action.payload.coolDown;
    },
  },
});

export const { updateNav, addShip, updateFuel, updateCargo } = shipsSlice.actions;
export default shipsSlice.reducer;

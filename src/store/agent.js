import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ships: getAgent(),
};

const API_TOKEN = process.env.REACT_APP_SPACETRADERS_TOKEN;

async function getAgent() {
  const response = await fetch('https://api.spacetraders.io/v2/my/agent', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
    },
  });
  const data = await response.json();
  return data.data;
}

const agentSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {
    updateCredits(state, action) {
      state.agent.credits = action.payload.credits;
    }
  },
});

export const { updateCredits } = agentSlice.actions;
export default agentSlice.reducer;

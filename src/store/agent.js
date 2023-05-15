import { createSlice } from '@reduxjs/toolkit';
import { getMyAgent } from '../api-goap/information-endpoints';

const initialState = {
  ships: getMyAgent(),
};

const agentSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {
    updateCredits(state, action) {
      state.agent.data.credits = action.payload.credits;
    }
  },
});

export const { updateCredits } = agentSlice.actions;
export default agentSlice.reducer;

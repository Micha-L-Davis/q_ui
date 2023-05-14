import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { agentReducer } from './agent';
import { shipsReducer } from './ships';


import thunk from '../store/middleware/thunk';

let reducers = combineReducers({
  agentReducer,
  shipsReducer,
});

export default function store() {
  return createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
}

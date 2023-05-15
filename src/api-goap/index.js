import RateLimiter from "./rate-limiter";

const enqueueRequest = new RateLimiter().enqueueRequest;

class Action {
  constructor(actionEndpoint, preconditions, cost) {
    this.apiEndpoint = actionEndpoint.apiEndpoint;
    this.preconditions = this.setPreconditions(actionEndpoint.hardPreconditions, preconditions);
    this.method = actionEndpoint.method;
    this.headers = actionEndpoint.headers;
    this.body = actionEndpoint.body;
    this.cost = cost;
  }

  setPreconditions(hardPreconditions, preconditions) {
    return mergeState(hardPreconditions, preconditions, false);
  }

  applyAction(state, effects) {
    return mergeState(state, effects);
  }

  async execute(currentState) {
    const response = enqueueRequest({
      url: this.apiEndpoint,
      parameters: {
        method: this.method,
        headers: this.headers,
        body: this.body
      }
    })

    const responseState = await response.json();
    const newState = this.applyAction(currentState, responseState);
    return newState;
  }
}

class ActionEndpoint {
  constructor(name, method, apiEndpoint, headers, body, hardPreconditions, coolDown = 0) {
    this.name = name;
    this.method = method;
    this.apiEndpoint = apiEndpoint;
    this.headers = headers;
    this.body = body;
    this.hardPreconditions = hardPreconditions;
    this.coolDown = coolDown;
  }
}


class Planner {
  constructor(actions) {
    this.actions = actions;
  }

  async plan(currentState, goal) {
    let openSet = [{ state: currentState, actions: [], cost: 0 }];
    let closedSet = [];

    while (openSet.length > 0) {
      openSet.sort((a, b) => a.cost - b.cost);
      let node = openSet.shift();

      if (this.goalMet(node.state, goal)) {
        return node.actions;
      }

      for (let action of this.actions) {
        if (this.actionSatisfies(node.state, action, goal) && action.coolDown === 0) {
          let newActions = node.actions.concat(action);
          let newCost = node.cost + action.cost;

          openSet.push({ state: node.state, actions: newActions, cost: newCost });
        }
      }

      closedSet.push(node);
    }
    return [];
  }

  goalMet(state, goal) {
    for (let key in goal) {
      if (state[key] !== goal[key]) {
        return false;
      }
    }
    return true;
  }

  actionSatisfies(state, action, goal) {
    let responseSchema = this.getResponseSchema(action);
    let newState = this.simulateAction(state, action);

    for (let key in goal) {
      if (responseSchema[key] && newState[key] !== goal[key]) {
        return false;
      }
    }

    return true;
  }

  getResponseSchema(action) {
    // retrieve the schema of the response object for the given action
    // (define a separate schema property for each action)

    // return the response schema object
  }

  simulateAction(state, action) {
    // simulate the action's effects on the state without actually executing it

    // return the new state after applying the action's effects
  }
}

//this should be refactored to use redux store reducers to merge state
function mergeState(state1, state2, overwrite = true) {
  let newState = { ...state1 };

  for (let key in state2) {
    switch (typeof state2[key]) {
      case 'object': //recurse into object keys
        if (typeof newState[key] === 'object') {
          newState[key] = mergeState(newState[key], state2[key], overwrite);
        }
        break;
      case 'number':
        if (overwrite) { newState[key] = state2[key]; }
        else if (!(key in newState) || state2[key] > newState[key]) { //assume a greater value represents a more strict requirement
          newState[key] = state2[key];
        }
        break;
      default: //assume initial state supersedes, unless overwrite is true
        if (overwrite) { newState[key] = state2[key]; }
        else if (!(key in newState)) {
          newState[key] = state2[key];
        }
        break;
    }
  }

  return newState;
}

const ApiGoap = {
  Action,
  ActionEndpoint,
  Planner,
  mergeState
};

export default ApiGoap;

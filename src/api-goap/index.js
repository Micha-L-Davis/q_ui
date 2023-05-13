class Action {
  constructor(method, apiEndpoint, headers, body, preconditions, cost) {
    this.apiEndpoint = apiEndpoint;
    this.preconditions = preconditions;
    this.method = method;
    this.headers = headers;
    this.cost = cost;
  }

  async execute(currentState) {
    const response = await fetch(this.apiEndpoint, {
      method: this.method,
      headers: this.headers,
      body: this.body
    });


    const responseState = await response.json();
    const newState = this.applyAction(currentState, responseState);
    return newState;
  }

  applyAction(state, effects) {
    let newState = Object.assign({}, state);
    for (let key in effects) {
      newState[key] = effects[key];
    }
    return newState;
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
        if (this.stateSatisfies(node.state, action.preconditions)) {
          let newState = await action.execute(node.state);
          let newActions = node.actions.concat(action);
          let newCost = node.cost + action.cost;

          openSet.push({ state: newState, actions: newActions, cost: newCost });
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

  stateSatisfies(state, preconditions) {
    for (let key in preconditions) {
      if (state[key] !== preconditions[key]) {
        return false;
      }
    }
    return true;
  }
}

const ApiGoap = {
  Action,
  Planner
};

export default ApiGoap;

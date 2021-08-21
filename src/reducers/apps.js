import * as types from "../actions/actionTypes";

export function apps(state = [], action) {
  switch (action.type) {
    case types.LOAD_APPS:
      return action.payload.apps;
    default:
      return state;
  }
}

export function app(state = {}, action) {
  switch (action.type) {
    case types.SELECT_APP:
      return action.payload.app;
    default:
      return state;
  }
}

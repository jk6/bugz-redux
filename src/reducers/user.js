import * as types from "../actions/actionTypes";

export function user(state = {}, action) {
  switch (action.type) {
    case types.LOAD_USER:
      return action.payload;
    default:
      return state;
  }
}

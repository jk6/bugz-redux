import * as types from "../actions/actionTypes";

export function comments(state = [], action) {
  switch (action.type) {
    case types.LOAD_COMMENTS:
      return action.payload.comments;
    case types.CREATE_COMMENT:
      return [action.payload.comment, ...state];
    default:
      return state;
  }
}

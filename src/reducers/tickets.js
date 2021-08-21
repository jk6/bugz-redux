import * as types from "../actions/actionTypes";

export function tickets(state = [], action) {
  switch (action.type) {
    case types.LOAD_TICKETS:
      return action.payload.tickets;
    case types.CREATE_TICKET:
      return [...state, action.payload.ticket];
    case types.TOGGLE_TICKET_STATUS:
      return [
        ...action.payload.tickets.slice(0, action.payload.idx),
        Object.assign({}, action.payload.tickets[action.payload.idx], {
          status: action.payload.newStatus,
        }),
        ...action.payload.tickets.slice(action.payload.idx + 1),
      ];
    default:
      return state;
  }
}

export function ticket(state = {}, action) {
  switch (action.type) {
    case types.SELECT_TICKET:
      return action.payload.ticket;
    case types.TOGGLE_SELECTED_TICKET_STATUS:
      return Object.assign({}, action.payload.ticket, {
        status: action.payload.newStatus,
      });
    default:
      return state;
  }
}

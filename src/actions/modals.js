import * as types from "./actionTypes";

export function toggleTicketModal(bool) {
  return {
    type: types.TOGGLE_TICKET_MODAL,
    payload: bool,
  };
}

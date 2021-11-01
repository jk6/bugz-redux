import axios from "axios";
import * as types from "../../actions/actionTypes";

export function createTicket(ticket) {
  return {
    type: types.CREATE_TICKET,
    payload: {
      ticket,
    },
  };
}

export function selectTicket(id, appId, app, date, openedBy, issue, status) {
  return {
    type: types.SELECT_TICKET,
    payload: {
      ticket: {
        id,
        appId,
        app,
        date,
        openedBy,
        issue,
        status,
      },
    },
  };
}

export function toggleTicketStatus(tickets, newStatus, idx) {
  return {
    type: types.TOGGLE_TICKET_STATUS,
    payload: {
      tickets,
      idx,
      newStatus,
    },
  };
}

export function toggleSelectedTicketStatus(ticket, newStatus) {
  return {
    type: types.TOGGLE_SELECTED_TICKET_STATUS,
    payload: {
      ticket,
      newStatus,
    },
  };
}

export function loadTickets(tickets) {
  return {
    type: types.LOAD_TICKETS,
    payload: {
      tickets,
    },
  };
}

export function loadFetchTickets(url) {
  return (dispatch) => {
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => dispatch(loadTickets(response)))
      .catch((err) => console.log(err.toString()));
  };
}

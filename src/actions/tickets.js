import axios from 'axios';

export function createTicket (ticket){
    return {
        type: 'CREATE_TICKET',
        payload: {
            ticket
        }
    };
}

export function selectTicket (id, appId, app, date, openedBy, issue, status){
    return {
        type: 'SELECT_TICKET',
        payload: {
            ticket: {
                id,
                appId,
                app,
                date,
                openedBy,
                issue,
                status
            }
        }
    };
}

export function toggleTicketStatus (tickets, newStatus, idx){    
    return {
        type: 'TOGGLE_TICKET_STATUS',
        payload: {
            tickets,
            idx,
            newStatus         
        }
    };
}

export function toggleSelectedTicketStatus (ticket, newStatus){
    return {
        type: 'TOGGLE_SELECTED_TICKET_STATUS',
        payload: {
            ticket,
            newStatus
        }
    };
}

export function loadTickets (tickets){
    return {
        type: 'LOAD_TICKETS',
        payload: {
            tickets
        }
    };
}

export function loadFetchTickets (url){
    return (dispatch) => {
        axios.get(url)
            .then(response => response.data)
            .then(response => dispatch(loadTickets(response)))
            .catch(err => console.log(err.toString()));     
    };
}
export function tickets (state = [], action){
    switch (action.type){
        case 'LOAD_TICKETS':
            return action.payload.tickets;
            break;
        case 'CREATE_TICKET':
            return [
                ...state,
                action.payload.ticket
            ];
            break;
        case 'TOGGLE_TICKET_STATUS':
            return [
                ...action.payload.tickets.slice(0, action.payload.idx),                
                Object.assign({}, action.payload.tickets[action.payload.idx], {
                    status: action.payload.newStatus
                }),
                ...action.payload.tickets.slice(action.payload.idx + 1)
            ];            
            break;
        default:
            return state;
    }
}

export function ticket (state = {}, action){
    switch (action.type){
        case 'SELECT_TICKET':
            return action.payload.ticket;
            break;
        case 'TOGGLE_SELECTED_TICKET_STATUS':
            return Object.assign({}, 
                action.payload.ticket, { 
                    status: action.payload.newStatus 
                });
            break;
        default:
            return state;
    }
}
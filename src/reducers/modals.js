export function showTicketModal (state = false, action){
    switch (action.type){
        case 'TOGGLE_TICKET_MODAL':            
            return action.payload;
            break;
        default:
            return state;
    }
}
import * as types from '../actions/actionTypes';

export function showTicketModal (state = false, action){
    switch (action.type){
        case types.TOGGLE_TICKET_MODAL:
            return action.payload;
            break;
        default:
            return state;
    }
}
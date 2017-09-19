export function apps (state = [], action){
    switch (action.type){
        case 'LOAD_APPS':
            return action.payload.apps;
            break;        
        default:
            return state;
    }
}

export function app (state = {}, action){
    switch (action.type){
        case 'SELECT_APP':
            return action.payload.app;
            break;
        default:
            return state;
    }
}
export function user (state = {}, action){
    switch (action.type){
        case 'LOAD_USER':
            return action.payload;
            break;
        default:
            return state;
    }
}
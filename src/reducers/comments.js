export function comments (state = [], action){
    switch (action.type){
        case 'LOAD_COMMENTS':
            return action.payload.comments;
            break;
        case 'CREATE_COMMENT':
            return [
                action.payload.comment,
                ...state
            ];
            break;
        default:
            return state;
    }
}
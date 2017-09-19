import axios from 'axios';

export function loadComments (comments){
    return {
        type: 'LOAD_COMMENTS',
        payload: {
            comments
        }
    };
}

export function createComment (comment){
    return {
        type: 'CREATE_COMMENT',
        payload: {
            comment
        }
    };
}

export function loadFetchComments(url){
    return (dispatch) => {
        axios.get(url)
            .then(response => response.data)
            .then(response => dispatch(loadComments(response)))
            .catch(err => console.log(err.toString()))
        
    };
}
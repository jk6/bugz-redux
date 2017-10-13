import axios from 'axios';
import * as types from './actionTypes';

export function loadComments (comments){
    return {
        type: types.LOAD_COMMENTS,
        payload: {
            comments
        }
    };
}

export function createComment (comment){
    return {
        type: types.CREATE_COMMENT,
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
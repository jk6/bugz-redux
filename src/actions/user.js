import axios from 'axios';
import * as types from './actionTypes';

export function loadUser (user){
    return {
        type: types.LOAD_USER,
        payload: user
    };
}

export function loadFetchUser (url){
    return (dispatch) => {
        axios.get(url)
            .then(response => response.data[0])
            .then(response => dispatch(loadUser(response)))
            .catch(err => console.log(err.toString()));
    };
}
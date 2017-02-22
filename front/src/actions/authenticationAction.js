import * as types from '../constants/ActionTypes.js';
import * as http from '../constants/Http.js';
import * as urls from '../constants/Urls.js';
import * as utils from '../utils';

export function getProfile() {
    var authHeader = new Headers();
    authHeader.append("Authorization", "Bearer " + utils.getAuthCookie());

    return dispatch => {
        fetch(urls.GET_PROFILE, {
            method: http.METHOD_GET,
            headers: authHeader
        }).then(response => {
            dispatch({type: types.GET_PROFILE_SUCCESS, data: response});
        }).catch(() => {
            dispatch({type: types.GET_PROFILE_ERROR});
        });
    };
}


export function logout() {
    var authHeader = new Headers();
    authHeader.append("Authorization", "Bearer " + utils.getAuthCookie());

    return dispatch => {
        fetch(urls.LOGOUT, {
            method: http.METHOD_GET,
            headers: authHeader
        }).then(() => {
            dispatch({type: types.LOGOUT_SUCCESS});
        }).catch(() => {
            dispatch({type: types.LOGOUT_ERROR});
        });

    };
}

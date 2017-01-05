import * as types from '../constants/ActionTypes.js';
import * as Http from '../constants/Http.js';

const API_URL_AUTHENTICATE = "";

export function authenticate(login, password) {
    return dispatch => {
        if (!login.length || !password.length) {
            dispatch(userInputError());
        } else {
            dispatch({type: types.AUTHENTICATION_START_REQUEST});
            dispatch(requestAuthenticationService(login, password));
        }
    }
}

function requestAuthenticationService(login, password) {
    return dispatch => {
        fetch(API_URL_AUTHENTICATE, {
            method: Http.METHOD_POST,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + window.btoa(`${login}:${password}`)
            }
        })
            .then(r => {
                if (r.response.status === Http.STATUS_CODE_CREATED) {
                    dispatch(checkLicencesRights(r.data.sessionId));
                } else {
                    dispatch(authenticationError());
                }
            })
            .catch(() => {
                dispatch(authenticationError());
            });
    };
}

export function logout(authToken, withRedirection = true) {
    return dispatch => {
        dispatch({
            type: types.REQUEST,
            url: `${API_URL_SESSIONS}/${authToken}`,
            method: Http.METHOD_DELETE
        });
        dispatch({
            type: types.CLEAN_USER_INFO
        });
        if (withRedirection) {
            dispatch(logoutAndRedirect());
        }
    };
}


export function logoutAndRedirect() {
    return dispatch => {
        dispatch({type: types.AUTHENTICATION_LOGOUT});
        dispatch(redirectToLoginPage());
    };
}


function redirectToLoginPage() {
    return {
        type: types.REDIRECT,
        link: '/login'
    };
}
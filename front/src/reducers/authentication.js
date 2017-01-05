import * as types from '../constants/ActionTypes';
import * as appConstants from '../constants/App';

function getInitialState() {
    return {
        token: localStorage.get(appConstants.LOCALSTORAGE_AUTH_TOKEN),
        sessionValid: false,
        errorMessage: null,
        pending: false
    }
}

export default function authentication(state=getInitialState(), action) {
    switch (action.type) {
        case types.AUTHENTICATION_START_REQUEST:
            const newState = {...state};
            newState.pending = true;
            return newState;
        case types.AUTHENTICATION_SUCCESS:
            return {
                token: action.token,
                sessionValid: true,
                errorMessage: null,
                pending: false
            };
        case types.AUTHENTICATION_LOGOUT:
        case types.AUTHENTICATION_DENIED:
            return {
                token: null,
                sessionValid: false,
                errorMessage: null,
                pending: false
            };
        case types.AUTHENTICATION_ERROR:
            return {
                token: null,
                sessionValid: false,
                errorMessage: action.message,
                pending: false
            };
    }
    return state;
}

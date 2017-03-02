import * as types from '../constants/ActionTypes';
import * as appConstants from '../constants/App';
import * as utils from '../utils';

const invalidState = {
    id: null,
    sessionValid: false,
    errorMessage: appConstants.ERROR_MESSAGE,
    pending: false
};

const initialState = {
    session: {
        id: null,
        sessionValid: false,
        errorMessage: null,
        pending: false
    }
};

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case types.GET_PROFILE_SUCCESS:
            return {
                id: action.data._id,
                sessionValid: true,
                errorMessage: null,
                pending: false
            };

        case types.GET_PROFILE_ERROR:
            return invalidState;

        case types.LOGOUT_SUCCESS:
            utils.removeAuthCookie();
            window.location.reload();
            return initialState;

        default:
            return state;
    }
}

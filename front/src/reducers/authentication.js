import * as types from '../constants/ActionTypes';
import * as appConstants from '../constants/App';

function getInitialState() {
    return {
        session: {
            id: null,
            sessionValid: false,
            errorMessage: null,
            pending: false
        }
    };
}

export default function authentication(state = getInitialState(), action) {
    switch (action.type) {
        // case types.AUTHENTICATION_LOGOUT:
        // case types.AUTHENTICATION_DENIED:
        //     return {
        //         token: null,
        //         sessionValid: false,
        //         errorMessage: null,
        //         pending: false
        //     };
        case types.GET_PROFILE_SUCCESS:
            if (action.type === 200) {
                return {
                    id: action.data._id,
                    sessionValid: true,
                    errorMessage: null,
                    pending: false
                };
            } else {
                return {
                    id: null,
                    sessionValid: false,
                    errorMessage: appConstants.ERROR_MESSAGE,
                    pending: false
                };
            }

        case types.GET_PROFILE_ERROR:
            return {
                id: null,
                sessionValid: false,
                errorMessage: appConstants.ERROR_MESSAGE,
                pending: false
            };
        default:
            return state;
    }
}

import * as types   from '../constants/ActionTypes.js';
import * as urls    from '../constants/Urls.js';
import * as http    from '../constants/Http.js';
import * as utils   from '../utils';

const buildAuthUrl = url => {
    const authHeader = {
        'Authorization': 'Bearer ' + utils.getAuthCookie(),
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    return new Request(url, {
        headers: authHeader
    });
};

export function getProfile() {
    var init = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + utils.getAuthCookie()
        }
    };

    return dispatch => {
        if(utils.getAuthCookie() === undefined) {
            dispatch({type: types.GET_PROFILE_ERROR});
            return;
        }

        fetch(urls.GET_PROFILE, init)
            .then(response => {
                if (response.status === http.STATUS_CODE_OK) {
                    response.json().then(dataJson => {
                        dispatch({type: types.GET_PROFILE_SUCCESS, data: dataJson});
                    });
                }
                else {
                    dispatch({type: types.GET_PROFILE_ERROR});
                }
            }).catch(() => {
            dispatch({type: types.GET_PROFILE_ERROR});
        });
    };
}

export function logout() {
    return dispatch => {
        fetch(buildAuthUrl(urls.LOGOUT))
            .then(() => {
                dispatch({type: types.LOGOUT_SUCCESS});
            }).catch(() => {
            dispatch({type: types.LOGOUT_ERROR});
        });
    };
}

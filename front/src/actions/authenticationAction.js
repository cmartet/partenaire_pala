import * as types from '../constants/ActionTypes.js';
import * as http from '../constants/Http.js';
import * as urls from '../constants/Urls.js';

// export function authenticateToFacebook() {
//     return dispatch => {
//         fetch(urls.FACEBOOK_AUTH, {
//             method: Http.METHOD_GET
//         })
//             .then(response => {
//                 dispatch({type: types.AUTHENTICATION_SUCCESS, data: response});
//             })
//             .catch(() => {
//                 dispatch({type: types.AUTHENTICATION_ERROR});
//             });
//     };
// }

export function getProfile() {
    return dispatch => {
        fetch(urls.GET_PROFILE, {
            method: http.METHOD_GET
        })
            .then(response => {
                dispatch({type: types.GET_PROFILE_SUCCESS, data: response});
            })
            .catch(() => {
                dispatch({type: types.GET_PROFILE_ERROR});
            });
    };
}

//
// export function logout(authToken, withRedirection = true) {
//     return dispatch => {
//         dispatch({
//             type: types.REQUEST,
//             url: `${API_URL_SESSIONS}/${authToken}`,
//             method: Http.METHOD_DELETE
//         });
//         dispatch({
//             type: types.CLEAN_USER_INFO
//         });
//         if (withRedirection) {
//             dispatch(logoutAndRedirect());
//         }
//     };
// }

//
// export function logoutAndRedirect() {
//     return dispatch => {
//         dispatch({type: types.AUTHENTICATION_LOGOUT});
//         dispatch(redirectToLoginPage());
//     };
// }
//
//
// function redirectToLoginPage() {
//     return {
//         type: types.REDIRECT,
//         link: '/login'
//     };
// }
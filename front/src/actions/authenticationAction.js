import * as types from '../constants/ActionTypes.js';
import * as Http from '../constants/Http.js';

const API_URL_AUTHENTICATE = "http://localhost:8090/auth/facebook";

//
// export function authenticateToFacebook() {
//     return dispatch => {
//         fetch(API_URL_AUTHENTICATE, {
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
//
// export function logoutAndRedirect() {
//     return dispatch => {
//         dispatch({type: types.AUTHENTICATION_LOGOUT});
//         dispatch(redirectToLoginPage());
//     };
// }


function redirectToLoginPage() {
    return {
        type: types.REDIRECT,
        link: '/login'
    };
}
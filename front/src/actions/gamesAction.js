import * as types from '../constants/ActionTypes.js';
import * as urls from '../constants/Urls';

const receiveGames = data => {
    return {
        type: types.RECEIVED_GAMES,
        data: data
    }
};

export const fetchGames = (/*ajouter les filtres ici*/) => {
    return function (dispatch) {
        return fetch(urls.GET_GAMES_TEST)  // TODO : change API URL
            .then(response => {
                return response.json();
            }).then(data => {
                dispatch(receiveGames(data));
            }).catch(err => {
                console.log(err);
            });
    }
};

import * as types from '../constants/ActionTypes.js';
import * as urls from '../constants/Urls';

const receiveGames = data => {
    return {
        type: types.RECEIVED_GAMES,
        data: data
    }
};

const receivePlaces = data => {
    return {
        type: types.RECEIVED_PLACES,
        data: data
    }
};

const postHeaders = (body) => {
    return {
        'method': 'POST',
        'Content-Type': 'application/json',
        'body': body
    }
};

export const createGame = (game) => {
    return function (dispatch) {
        return fetch(urls.CREATE_GAME_TEST, postHeaders(game))  // TODO : change API URL
            .then(response => {
                return response.json();
            }).then(data => {
                dispatch(receiveGames(data));
            }).catch(err => {
                console.log(err);
            });
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

export const fetchPlaces = () => {
    return function (dispatch) {
        return fetch(urls.GET_PLACES)
            .then(response => {
                return response.json();
            }).then(data => {
                dispatch(receivePlaces(data.results));
            }).catch(err => {
                console.log(err);
            });
    }
};
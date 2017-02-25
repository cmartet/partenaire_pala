import * as types   from '../constants/ActionTypes.js';
import * as urls    from '../constants/Urls';
import * as http    from '../constants/Http';
import * as util    from '../utils';

const receiveGames = data => {
    return {
        type: types.RECEIVED_GAMES,
        data: data
    }
};

const createdGame = data => {
    return {
        type: types.CREATED_GAME,
        data: data
    }
};

const receivePlaces = data => {
    return {
        type: types.RECEIVED_PLACES,
        data: data
    }
};

const postHeaders = body => {
    return {
        'method': http.METHOD_POST,
        'Content-Type': 'application/json',
        'body': body
    }
};

const deleteHeaders = () => {
    return {
        'method': http.METHOD_DELETE,
        'Authorization': 'Bearer ' + util.getAuthCookie()
    }
};

const formatParametersForFetchingGames = (date, place) => {
    var url = urls.GET_GAMES_TEST; // TODO : change API URL

    if (date !== null) {
        url += '/date/' + date.toISOString();
    }

    if (place !== null) {
        url += '/place/' + place;
    }

    return url;
};

export const createGame = (game) => {
    return function (dispatch) {
        return fetch(urls.CREATE_GAME, postHeaders(game))
            .then(response => {
                return response.json();
            }).then(data => {
                dispatch(createdGame(data));
            }).catch(err => {
                console.log(err);
            });
    }
};

export const fetchGames = (date, place) => {
    return function (dispatch) {

        var url = formatParametersForFetchingGames(date, place);

        return fetch(url)
            .then(response => {
                return response.json();
            }).then(data => {
                dispatch(receiveGames(data));
            }).catch(err => {
                console.log(err);
            });
    }
};

export const deleteGame = gameId => {
    return function (dispatch) {

        return fetch(urls.DELETE_GAME + gameId, deleteHeaders())
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
                dispatch(receivePlaces(data));
            }).catch(err => {
                console.log(err);
            });
    }
};

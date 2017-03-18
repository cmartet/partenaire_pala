import * as types   from '../constants/ActionTypes.js';
import * as urls    from '../constants/Urls';
import * as http    from '../constants/Http';
import * as util    from '../utils';

const createHeadersFor = (type, body) => {
    return {
        'method': type,
        'headers': {
            'Authorization': 'Bearer ' + util.getAuthCookie(),
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify(body)
    }
};

const putHeaders = body => {
    return createHeadersFor(http.METHOD_PUT, body)
};

const postHeaders = body => {
    return createHeadersFor(http.METHOD_POST, body)
};

const deleteHeaders = () => {
    return {
        'method': http.METHOD_DELETE,
        'headers': {
            'Authorization': 'Bearer ' + util.getAuthCookie()
        }
    }
};

const formatParametersForFetchingGames = (date, place) => {
    var url = urls.GET_GAMES;

    var filter = {};
    var isFilterSet = false;

    if (date !== null) {
        var end = new Date(date.getTime());
        end.setHours(23, 59, 59, 999);

        filter.start = date.toString();
        filter.end = end.toString();
        isFilterSet = true;
    }

    if (place !== null) {
        filter.place = place;
        isFilterSet = true;
    }

    if (isFilterSet) {
        url += '?search=' + JSON.stringify(filter);
    }

    return url;
};

export const createGame = (game) => {
    return function (dispatch) {
        dispatch({
            type: types.CREATION_IN_PROGRESS
        });

        return fetch(urls.CREATE_GAME, postHeaders(game))
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: types.CREATED_GAME
                    });
                }
                else {
                    dispatch({
                        type: types.CREATION_FAILED
                    });
                }
            });
    }
};

export const fetchGames = (date, place) => {
    return function (dispatch) {
        dispatch({type: types.GAMES_RETRIEVAL_IN_PROGRESS});
        var url = formatParametersForFetchingGames(date, place);

        return fetch(url)
            .then(response => {
                return response.json();
            }).then(data => {
                dispatch({
                    type: types.GAMES_RETRIEVED,
                    data: data
                });
            }).catch(err => {
                dispatch({type: types.GAMES_RETRIEVAL_ERROR});
            });
    }
};

export const deleteGame = gameId => {
    return function (dispatch) {

        return fetch(urls.DELETE_GAME + gameId, deleteHeaders())
            .then(response => {
                if (response.status === 200) {
                    dispatch({type: types.DELETE_GAME})
                }
                else {
                    dispatch({type: types.DELETE_GAME_ERROR})
                }
            })
    }
};

export const reinitState = () => {
    return function (dispatch) {
        dispatch({
            type: types.REINIT_PROPS
        })
    }
};

export const joinGame = (gameId, data) => {
    return function (dispatch) {
        dispatch({
            type: types.JOIN_IN_PROGRESS
        });

        return fetch(urls.JOIN_GAME + gameId, putHeaders(data))
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: types.JOIN_SUCCESS
                    });
                }
                else {
                    dispatch({
                        type: types.JOIN_FAILED
                    });
                }
            });
    }
};
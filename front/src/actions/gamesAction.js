import * as types   from '../constants/ActionTypes.js';
import * as urls    from '../constants/Urls';
import * as http    from '../constants/Http';
import * as util    from '../utils';

const createHeadersFor = (type, body) => {
    var headers = {
        'method': type,
        'headers': {
            'Authorization': 'Bearer ' + util.getAuthCookie(),
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    };

    if (body) {
        headers.body = JSON.stringify(body)
    }

    return headers;
};

const putHeaders = body => {
    return createHeadersFor(http.METHOD_PUT, body)
};

const postHeaders = body => {
    return createHeadersFor(http.METHOD_POST, body)
};

const deleteHeaders = () => {
    return createHeadersFor(http.METHOD_DELETE)
};

const getHeaders = () => {
    return createHeadersFor(http.METHOD_GET)
};

const launchRequest = (url, headers, eventProgress, eventSuccess, eventError) => {
    return function (dispatch) {
        dispatch({type: eventProgress});

        return fetch(url, headers)
            .then(response => {
                // response.status === http.STATUS_CODE_OK ?
                    dispatch({type: eventSuccess})
            }).catch(() => {
                dispatch({type: eventError});
            });
    };
};

const launchGetRequest = (url, headers, eventProgress, eventSuccess, eventError) => {
    return function (dispatch) {
        dispatch({type: eventProgress});

        return fetch(url, headers || {})
            .then(response => {
                return response.json();
            }).then(data => {
                dispatch({
                    type: eventSuccess,
                    data: data
                });
            }).catch(() => {
                dispatch({type: eventError});
            });
    };
};

const formatParametersForFetchingGames = (place, beginDate, allDay) => {
    let url = urls.GET_GAMES;

    let filter = {};
    let isFilterSet = false;
    const today = new Date();

    if (beginDate !== null) {
        if (allDay) {
            let end = new Date(beginDate);
            end.setHours(23, 59, 59, 999);
            beginDate.setHours(0, 0, 0);
            filter.start = new Date(beginDate.getTime() + (today.getTimezoneOffset() * 3600)).toJSON();
            filter.end = new Date(end.getTime() + (today.getTimezoneOffset() * 3600)).toJSON();
        }
        else {
            let end = beginDate.getTime();
            end += (59 * 60 * 1000);
            filter.start = new Date(beginDate.getTime() + (today.getTimezoneOffset() * 3600)).toJSON();
            filter.end = new Date(end + (today.getTimezoneOffset() * 3600)).toJSON();
        }
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
                if (response.status === http.STATUS_CODE_OK) {
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

export const updateGame = (game) => {
    return launchRequest(urls.UPDATE_GAME + game._id,
        putHeaders(game),
        types.UPDATE_IN_PROGRESS,
        types.UPDATED_GAME,
        types.UPDATE_FAILED);
};

export const deleteGame = gameId => {
    return function (dispatch) {

        return fetch(urls.DELETE_GAME + gameId, deleteHeaders())
            .then(response => {
                if (response.status === http.STATUS_CODE_OK) {
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

export const joinGame = (gameId) => {
    return launchRequest(urls.JOIN_GAME + gameId,
        putHeaders(),
        types.JOIN_IN_PROGRESS,
        types.JOIN_SUCCESS,
        types.JOIN_FAILED);
};

export const unjoinGame = (gameId) => {
    return launchRequest(urls.UNJOIN_GAME + gameId,
        putHeaders(),
        types.UNJOIN_IN_PROGRESS,
        types.UNJOIN_SUCCESS,
        types.UNJOIN_FAILED);
};

export const fetchGames = (date, place) => {
    var url = formatParametersForFetchingGames(place, date, true);

    return launchGetRequest(url,
        null,
        types.GAMES_RETRIEVAL_IN_PROGRESS,
        types.GAMES_RETRIEVED,
        types.GAMES_RETRIEVAL_ERROR);

};

export const fetchGame = (gameId) => {
    var url = urls.GET_GAME + gameId;

    return launchGetRequest(url,
        getHeaders(),
        types.GAME_RETRIEVAL_IN_PROGRESS,
        types.GAME_RETRIEVED,
        types.GAME_RETRIEVAL_ERROR);

};

export const getGameWithinHourAndPlace = (dateTime, place) => {
    var url = formatParametersForFetchingGames(place, dateTime, false);

    return launchGetRequest(url,
        null,
        types.GAMES_RETRIEVAL_IN_PROGRESS,
        types.GAMES_RETRIEVED,
        types.GAMES_RETRIEVAL_ERROR);
};
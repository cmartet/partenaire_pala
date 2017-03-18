import * as types   from '../constants/ActionTypes.js';
import * as urls    from '../constants/Urls';
import * as http    from '../constants/Http';
import * as util    from '../utils';

const createHeadersFor = (type, body) => {
    var headers = {
        'method': type,
        'headers': {
            'Authorization': 'Bearer ' + util.getAuthCookie(),
            'Content-Type': 'application/json'
        }
    };

    if(type  === http.METHOD_POST){
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
    return {
        'method': http.METHOD_DELETE,
        'headers': {
            'Authorization': 'Bearer ' + util.getAuthCookie()
        }
    }
};

const formatParametersForFetchingGames = (place, beginDate, allDay) => {
    var url = urls.GET_GAMES;

    var filter = {};
    var isFilterSet = false;

    if (beginDate !== null) {
        var end = new Date(beginDate.getTime());
        if (allDay) {
            end.setHours(23, 59, 59, 999);
            filter.start = beginDate.toJSON();
            filter.end = end.toJSON();
        }
        else {
            end.setTime(end.getTime() + (59 * 60 * 1000));
            filter.start = beginDate.toJSON();
            filter.end = end.toJSON();
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

const launchPutRequest = (url, body, eventProgress, eventSuccess, eventError) => {
    return function (dispatch) {
        dispatch({type: eventProgress});

        return fetch(url, putHeaders(body))
            .then(response => {
                if (response.status === 200) {
                    dispatch({type: eventSuccess});
                }
                else {
                    dispatch({type: eventError});
                }
            });
    };
};

export const joinGame = (gameId) => {
    return launchPutRequest(urls.JOIN_GAME + gameId,
        null,
        types.JOIN_IN_PROGRESS,
        types.JOIN_SUCCESS,
        types.JOIN_FAILED);
};

export const unjoinGame = (gameId) => {
    return launchPutRequest(urls.UNJOIN_GAME + gameId,
        null,
        types.UNJOIN_IN_PROGRESS,
        types.UNJOIN_SUCCESS,
        types.UNJOIN_FAILED);
};


const retrieveGames = (url) => {
    return function (dispatch) {
        dispatch({type: types.GAMES_RETRIEVAL_IN_PROGRESS});

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

export const fetchGames = (date, place) => {
    var url = formatParametersForFetchingGames(place, date, true);
    return retrieveGames(url);
};

export const getGameWithinHourAndPlace = (dateTime, place) => {
    var url = formatParametersForFetchingGames(place, dateTime, false);
    return retrieveGames(url);
};
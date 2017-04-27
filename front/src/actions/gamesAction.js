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
    return {
        'method': http.METHOD_DELETE,
        'headers': {
            'Authorization': 'Bearer ' + util.getAuthCookie()
        }
    }
};

const launchRequest = (url, headers, eventProgress, eventSuccess, eventError) => {
    return function (dispatch) {
        dispatch({type: eventProgress});

        return fetch(url, headers)
            .then(response => {
                if (response.status === http.STATUS_CODE_OK) {
                    if (response.data) {
                        dispatch({type: eventSuccess, data: response.json().data});
                    }
                    else {
                        dispatch({type: eventSuccess});
                    }
                }
                else {
                    dispatch({type: eventError});
                }
            });
    };
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


// const retrieveGames = (url) => {
//
//     return function (dispatch) {
//         dispatch({type: types.GAMES_RETRIEVAL_IN_PROGRESS});
//
//         return fetch(url)
//             .then(response => {
//                 return response.json();
//             }).then(data => {
//                 dispatch({
//                     type: types.GAMES_RETRIEVED,
//                     data: data
//                 });
//             }).catch(err => {
//                 dispatch({type: types.GAMES_RETRIEVAL_ERROR});
//             });
//     }
// };

export const fetchGames = (date, place) => {
    var url = formatParametersForFetchingGames(place, date, true);
    // return retrieveGames(url);

    return launchRequest(url,
        null,
        types.GAMES_RETRIEVAL_IN_PROGRESS,
        types.GAMES_RETRIEVED,
        types.GAMES_RETRIEVAL_ERROR);

};

export const fetchGame = (gameId) => {
    var url = urls.GET_GAME + gameId;

    return launchRequest(url,
        null,
        types.GAME_RETRIEVAL_IN_PROGRESS,
        types.GAME_RETRIEVED,
        types.GAME_RETRIEVAL_ERROR);

    // return retrieveGames(url);
};

export const getGameWithinHourAndPlace = (dateTime, place) => {
    var url = formatParametersForFetchingGames(place, dateTime, false);

    return launchRequest(url,
        null,
        types.GAME_RETRIEVAL_IN_PROGRESS,
        types.GAME_RETRIEVED,
        types.GAME_RETRIEVAL_ERROR);

    // return retrieveGames(url);
};
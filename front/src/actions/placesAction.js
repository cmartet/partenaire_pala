import * as types   from '../constants/ActionTypes.js';
import * as urls    from '../constants/Urls';

export const fetchPlaces = (searchedPlace) => {
    return function (dispatch) {
        dispatch({type: types.PLACES_RETRIEVAL_PROGRESS});

        return fetch(urls.GET_PLACES + searchedPlace)
            .then(response => {
                return response.json();
            }).then(data => {
                dispatch({
                    type: types.PLACES_RETRIEVED,
                    data: data
                });
            }).catch(err => {
                dispatch({type: types.PLACES_RETRIEVAL_ERROR});
            });
    }
};

import * as types from '../constants/ActionTypes.js';

const initialState = {games : {}};

export default (state=initialState, action) => {
    switch (action.type) {
        case types.RECEIVED_GAMES:
            return {games: action.data};

        default:
            return state;
    }
}
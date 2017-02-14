import * as types from '../constants/ActionTypes.js';

const initialState = {games: {}};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.RECEIVED_GAMES:
            return {games: action.data};

        case types.CREATED_GAME:
            if (action.type === 200)
                return {created: true};
            else
                return {created: false};

        case types.RECEIVED_PLACES:
            return {places: action.data};

        default:
            return state;
    }
}
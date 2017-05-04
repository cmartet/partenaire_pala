import * as types from '../constants/ActionTypes.js';

const getInitialState = () => {
    return {
        game: {
            data: undefined,
            inProgress: false,
            success: false,
            error: false
        }
    }
};

export default (state = getInitialState(), action) => {
    var newState = getInitialState();

    switch (action.type) {
        case types.GAME_RETRIEVED:
            newState.game.success = true;
            newState.game.data = action.data;
            return newState;

        case types.GAME_RETRIEVAL_ERROR:
            newState.game.error = true;
            return newState;

        case types.GAME_RETRIEVAL_IN_PROGRESS:
            newState.game.inProgress = true;
            return newState;

        default:
            return state;
    }
}

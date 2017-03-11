import * as types from '../constants/ActionTypes.js';

const initialState = {
    places: [],
    games: [],
    gameCreation: {
        inProgress: false,
        success: false,
        error: false
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.RECEIVED_GAMES:
            return {
                places: [],
                games: action.data,
                gameCreation: {
                    inProgress: false,
                    success: false,
                    error: false
                }
            };

        case types.CREATION_IN_PROGRESS:
            return {
                places: [],
                games: [],
                gameCreation: {
                    inProgress: true,
                    success: false,
                    error: false
                }
            };

        case types.CREATED_GAME:
            return {
                places: [],
                games: [],
                gameCreation: {
                    inProgress: false,
                    success: true,
                    error: false
                }
            };

        case types.CREATION_FAILED:
            return {
                places: [],
                games: [],
                gameCreation: {
                    inProgress: false,
                    success: false,
                    error: true
                }
            };

        case types.RECEIVED_PLACES:
            return {
                places: action.data,
                games: [],
                gameCreation: {
                    inProgress: false,
                    success: false,
                    error: false
                }
            };

        default:
            return state;
    }
}
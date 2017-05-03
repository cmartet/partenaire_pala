import * as types from '../constants/ActionTypes.js';

const getInitialState = () => {
    return {
        gamesRetrieval: {
            data: [],
            inProgress: false,
            success: false,
            error: false
        },
        gameCreation: {
            inProgress: false,
            success: false,
            error: false
        },
        gameUpdate: {
            data: [],
            inProgress: false,
            success: false,
            error: false
        },
        gameDeletion: {
            inProgress: false,
            success: false,
            error: false
        },
        gameJoin: {
            inProgress: false,
            success: false,
            error: false
        }
    }
};

const handleGamesRetrieval = (type, data) => {
    var state = getInitialState();

    switch (type) {
        case types.GAMES_RETRIEVED:
            state.gamesRetrieval.success = true;
            state.gamesRetrieval.data = data;
            return state;

        case types.GAMES_RETRIEVAL_ERROR:
            state.gamesRetrieval.error = true;
            return state;

        case types.GAMES_RETRIEVAL_IN_PROGRESS:
            state.gamesRetrieval.inProgress = true;
            return state;

        default:
            return state;
    }
};

const handleCreationActions = (type) => {
    var state = getInitialState();

    switch (type) {
        case types.CREATION_IN_PROGRESS:
            state.gameCreation.inProgress = true;
            return state;

        case types.CREATED_GAME:
            state.gameCreation.success = true;
            return state;

        case types.CREATION_FAILED:
            state.gameCreation.error = true;
            return state;

        default:
            return state;
    }
};

const handleUpdateActions = (type) => {
    var state = getInitialState();

    switch (type) {
        case types.UPDATE_IN_PROGRESS:
            state.gameUpdate.inProgress = true;
            return state;

        case types.UPDATED_GAME:
            state.gameUpdate.success = true;
            return state;

        case types.UPDATE_FAILED:
            state.gameUpdate.error = true;
            return state;

        default:
            return state;
    }
};

const handleDeletionActions = (type) => {
    var state = getInitialState();

    switch (type) {
        case types.DELETE_GAME:
            state.gameDeletion.success = true;
            return state;

        case types.DELETE_GAME_ERROR:
            state.gameDeletion.error = true;
            return state;

        case types.DELETE_GAME_PROGRESS:
            state.gameDeletion.inProgress = true;
            return state;

        default:
            return state;
    }
};

const handleJoinActions = (type) => {
    var state = getInitialState();

    switch (type) {
        case types.JOIN_FAILED:
        case types.UNJOIN_FAILED:
            state.gameJoin.error = true;
            return state;

        case types.JOIN_SUCCESS:
        case types.UNJOIN_SUCCESS:
            state.gameJoin.success = true;
            return state;

        case types.JOIN_IN_PROGRESS:
        case types.UNJOIN_IN_PROGRESS:
            state.gameJoin.inProgress = true;
            return state;

        default:
            return state;
    }
};

export default (state = getInitialState(), action) => {
    switch (action.type) {
        case types.GAMES_RETRIEVED:
        case types.GAMES_RETRIEVAL_IN_PROGRESS:
        case types.GAMES_RETRIEVAL_ERROR:
            return handleGamesRetrieval(action.type, action.data);

        case types.CREATION_FAILED:
        case types.CREATION_IN_PROGRESS:
        case types.CREATED_GAME:
            return handleCreationActions(action.type);

        case types.UPDATE_FAILED:
        case types.UPDATE_IN_PROGRESS:
        case types.UPDATED_GAME:
            return handleUpdateActions(action.type);

        case types.DELETE_GAME:
        case types.DELETE_GAME_ERROR:
        case types.DELETE_GAME_PROGRESS:
            return handleDeletionActions(action.type);

        case types.JOIN_SUCCESS:
        case types.JOIN_IN_PROGRESS:
        case types.JOIN_FAILED:
        case types.UNJOIN_SUCCESS:
        case types.UNJOIN_IN_PROGRESS:
        case types.UNJOIN_FAILED:
            return handleJoinActions(action.type);

        default:
            return state;
    }
}
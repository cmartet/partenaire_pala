import * as types from '../constants/ActionTypes.js';

const initialState = {
    placesRetrieval: {
        data: [],
        inProgress: false,
        success: false,
        error: false
    },
    games: [],
    gameCreation: {
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
};

const getInitialState = () => {
    return {
        placesRetrieval: {
            data: [],
            inProgress: false,
            success: false,
            error: false
        },
        games: [],
        gameCreation: {
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

const handlePlacesRetrieval = (type, data) => {
    var state = getInitialState();

    switch (type) {
        case types.RECEIVED_PLACES:
            state.placesRetrieval.success = true;
            state.placesRetrieval.data = data;
            return state;

        case types.PLACES_RETRIEVAL_ERROR:
            state.placesRetrieval.error = true;
            return state;

        case types.PLACES_RETRIEVAL_PROGRESS:
            state.placesRetrieval.inProgress = true;
            state.placesRetrieval.data = [];

            return state;

        default:
            return initialState;
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
            return initialState;
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
            return initialState;
    }
};

const handleJoinActions = (type) => {
    var state = getInitialState();

    switch (type) {
        case types.JOIN_FAILED:
            state.gameJoin.error = true;
            return state;

        case types.JOIN_SUCCESS:
            state.gameJoin.success = true;
            return state;

        case types.JOIN_IN_PROGRESS:
            state.gameJoin.inProgress = true;
            return state;

        default:
            return initialState;
    }
};

export default (state = initialState, action) => {
    var stateToUpdate = getInitialState();

    switch (action.type) {
        case types.RECEIVED_GAMES:
            stateToUpdate.games = action.data;
            return stateToUpdate;

        case types.RECEIVED_PLACES:
        case types.PLACES_RETRIEVAL_ERROR:
        case types.PLACES_RETRIEVAL_PROGRESS:
            return handlePlacesRetrieval(action.type, action.data);

        case types.CREATION_FAILED:
        case types.CREATION_IN_PROGRESS:
        case types.CREATED_GAME:
            return handleCreationActions(action.type);

        case types.DELETE_GAME:
        case types.DELETE_GAME_ERROR:
        case types.DELETE_GAME_PROGRESS:
            return handleDeletionActions(action.type);

        case types.JOIN_SUCCESS:
        case types.JOIN_IN_PROGRESS:
        case types.JOIN_FAILED:
            return handleJoinActions(action.type);

        default:
            return state;
    }
}
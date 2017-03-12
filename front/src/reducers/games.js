import * as types from '../constants/ActionTypes.js';

const initialState = {
    places: [],
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

const handleCreationActions = (type) => {
    switch (type) {
        case types.CREATION_IN_PROGRESS:
            return {
                places: [],
                games: [],
                gameCreation: {
                    inProgress: true,
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

        case types.CREATED_GAME:
            return {
                places: [],
                games: [],
                gameCreation: {
                    inProgress: false,
                    success: true,
                    error: false
                },
                gameJoin: {
                    inProgress: false,
                    success: false,
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

        default:
            return initialState;
    }
};

const handleDeletionActions = (type) => {
    switch (type) {
        case types.DELETE_GAME:
            return {
                places: [],
                games: [],
                gameCreation: {
                    inProgress: false,
                    success: false,
                    error: false
                },
                gameDeletion: {
                    inProgress: false,
                    success: true,
                    error: false
                },
                gameJoin: {
                    inProgress: false,
                    success: false,
                    error: false
                }
            };

        case types.DELETE_GAME_ERROR:
            return {
                places: [],
                games: [],
                gameCreation: {
                    inProgress: false,
                    success: false,
                    error: false
                },
                gameDeletion: {
                    inProgress: false,
                    success: false,
                    error: true
                },
                gameJoin: {
                    inProgress: false,
                    success: false,
                    error: false
                }
            };

        case types.DELETE_GAME_PROGRESS:
            return {
                places: [],
                games: [],
                gameCreation: {
                    inProgress: false,
                    success: false,
                    error: false
                },
                gameDeletion: {
                    inProgress: true,
                    success: false,
                    error: false
                },
                gameJoin: {
                    inProgress: false,
                    success: false,
                    error: false
                }
            };

        default:
            return initialState;
    }
};

const handleJoinActions = (type) => {
    switch (type) {
        case types.JOIN_FAILED:
            return {
                places: [],
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
                    error: true
                }
            };

        case types.JOIN_SUCCESS:
            return {
                places: [],
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
                    success: true,
                    error: false
                }
            };

        case types.JOIN_IN_PROGRESS:
            return {
                places: [],
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
                    inProgress: true,
                    success: false,
                    error: false
                }
            };

        default:
            return initialState;
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

        case types.RECEIVED_PLACES:
            return {
                places: action.data,
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
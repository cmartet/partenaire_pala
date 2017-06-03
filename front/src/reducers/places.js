import * as types from '../constants/ActionTypes.js';

const getInitialState = () => {
    return {
        placesRetrieval: {
            data: [],
            inProgress: false,
            success: false,
            error: false
        }
    }
};

export default (state = getInitialState(), action) => {
    switch (action.type) {
        case types.PLACES_RETRIEVED:
            var successState = getInitialState();
            successState.placesRetrieval.success = true;
            successState.placesRetrieval.data = action.data;
            return successState;

        case types.PLACES_RETRIEVAL_ERROR:
            var errorState = getInitialState();
            errorState.placesRetrieval.error = true;
            return errorState;

        case types.PLACES_RETRIEVAL_PROGRESS:
            var progressState = getInitialState();
            progressState.placesRetrieval.inProgress = true;
            return progressState;

        case types.PLACES_REINIT_STATE:
        default:
            return getInitialState();
    }
}
import {createStore, applyMiddleware, compose} from 'redux';
import * as constants from '../constants/App.js';

import rootReducer from '../reducers';

export default function configureStore(state = {}, middlewares = []) {
    const createStoreWithMiddleware = compose(
        applyMiddleware(...middlewares),
        // redux devtool chrome extension
        constants.DEV_MODE && window.devToolsExtension ? window.devToolsExtension() : f => f
    )(createStore);
    return createStoreWithMiddleware(rootReducer, state);
}

import { combineReducers } from 'redux';
import games from './games.js'
// import authentication from './test.reducer.js';

const rootReducer = combineReducers({
    games
    // authentication
});

export default rootReducer;

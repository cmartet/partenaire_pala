import { combineReducers } from 'redux';
import games from './games.js'
import authentication from './authentication';

const rootReducer = combineReducers({
    games,
    authentication
});

export default rootReducer;

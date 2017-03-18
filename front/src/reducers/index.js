import { combineReducers }  from 'redux';
import authentication       from './authentication';
import games                from './games.js';
import places               from './places.js';

const rootReducer = combineReducers({
    authentication,
    games,
    places
});

export default rootReducer;

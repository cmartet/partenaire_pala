import { combineReducers }  from 'redux';
import authentication       from './authentication';
import game                 from './game.js';
import games                from './games.js';
import places               from './places.js';

const rootReducer = combineReducers({
    authentication,
    game,
    games,
    places
});

export default rootReducer;

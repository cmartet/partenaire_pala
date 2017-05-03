import {bindActionCreators} from 'redux';
import {connect}            from 'react-redux';
import * as authActions     from '../actions/authenticationAction';
import * as gamesActions    from '../actions/gamesAction';
import * as placesActions   from '../actions/placesAction';
import UpdateScreen         from '../components/screens/UpdateScreen.jsx';

const mapStateToProps = (state) => {
    return {
        auth: state.authentication,
        gameUpdate: state.games.gameUpdate,
        games: state.games.gamesRetrieval,
        game: state.game.game,
        places: state.places.placesRetrieval
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        gamesActions: bindActionCreators(gamesActions, dispatch),
        placesActions: bindActionCreators(placesActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateScreen);
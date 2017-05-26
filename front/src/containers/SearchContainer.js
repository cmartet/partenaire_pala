import { bindActionCreators }   from 'redux';
import { connect }              from 'react-redux';
import * as authActions         from '../actions/authenticationAction';
import * as placesActions       from '../actions/placesAction';
import * as gamesActions        from '../actions/gamesAction';
import SearchScreen             from '../components/screens/SearchScreen';

const mapStateToProps = (state) => {
    return {
        auth: state.authentication,
        games: state.games.gamesRetrieval,
        gameJoin: state.games.gameJoin,
        gameDeletion: state.games.gameDeletion,
        gameUpdate: state.games.gameUpdate,
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);

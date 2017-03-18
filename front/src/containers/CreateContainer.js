import {bindActionCreators}       from 'redux';
import {connect}                  from 'react-redux';
import * as gamesActions          from '../actions/gamesAction';
import * as authenticationActions from '../actions/authenticationAction';
import * as placesActions         from '../actions/placesAction';
import CreateScreen               from '../components/screens/CreateScreen';

const mapStateToProps = (state) => {
    return {
        auth: state.authentication,
        gameCreation: state.games.gameCreation,
        games: state.games.gamesRetrieval,
        places: state.places.placesRetrieval
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        authActions: bindActionCreators(authenticationActions, dispatch),
        gamesActions: bindActionCreators(gamesActions, dispatch),
        placesActions: bindActionCreators(placesActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateScreen);
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as gamesActions from '../actions/gamesAction';
import * as authActions from '../actions/authenticationAction';

import SearchScreen from '../components/screens/SearchScreen';

const mapStateToProps = (state) => {
    return {
        games: state.games.games,
        auth: state.authentication.session
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        gamesActions: bindActionCreators(gamesActions, dispatch),
        authActions: bindActionCreators(authActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);

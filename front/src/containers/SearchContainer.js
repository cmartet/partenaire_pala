import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as gamesActions from '../actions/gamesAction';

import SearchScreen from '../components/screens/SearchScreen';

const mapStateToProps = (state) => {
    return {
        games: state.games.games
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        gamesActions: bindActionCreators(gamesActions, dispatch)
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);

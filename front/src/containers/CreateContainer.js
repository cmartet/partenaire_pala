import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as gamesActions from '../actions/gamesAction';

import CreateScreen from '../components/screens/CreateScreen';

const mapStateToProps = (state) => {
    return {
        places: state.games.places
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        gamesActions: bindActionCreators(gamesActions, dispatch)
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(CreateScreen);

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as authenticationActions from '../actions/authenticationActions.js';

import AppScreen from '../components/screens/App';

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(AppScreen);

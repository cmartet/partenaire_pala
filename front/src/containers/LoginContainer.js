import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authenticateActions from '../actions/authenticationAction';

import LoginScreen from '../components/screens/LoginScreen';

const mapStateToProps = (state) => {
    return {
        auth: state.authentication.token
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        authenticateActions: bindActionCreators(authenticateActions, dispatch)
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

import { bindActionCreators }   from 'redux';
import { connect }              from 'react-redux';
import * as authActions         from '../actions/authenticationAction';
import AuthSuccessScreen        from '../components/screens/AuthSuccessScreen';

const mapStateToProps = (state) => {
    return {
        auth: state.authentication
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        authActions: bindActionCreators(authActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthSuccessScreen);

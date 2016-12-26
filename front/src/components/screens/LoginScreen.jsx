import React, {PropTypes} from 'react';
import {withRouter} from 'react-router'
import LoginForm from '../authentication/LoginForm.jsx';

const propTypes = {};

const LoginScreen = React.createClass({

    lala(){
    },

    render () {
        return (
            <LoginForm
                onLogin={this.lala}
            />
        )
    }
});

LoginScreen.propTypes = propTypes;

export default withRouter(LoginScreen);

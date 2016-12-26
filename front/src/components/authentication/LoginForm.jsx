import React, {PropTypes} from 'react';

import './LoginForm.scss';

const propTypes = {
    onLogin: PropTypes.func.isRequired
};

const LoginForm = React.createClass({

    handleFormSubmit(evt){
        evt.preventDefault();
        alert("Log you yourself, pony !");
        // this.props.onLogin();
    },

    render() {
        return (
            <div className="LoginForm">
                <form onSubmit={this.handleFormSubmit}>
                    <h1>Log me</h1>
                    <button type="submit">Please!</button>
                </form>
            </div>
        )
    }
});

LoginForm.propTypes = propTypes;

export default LoginForm;

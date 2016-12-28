import React from 'react';
import { Button } from 'react-bootstrap';

import './LoginForm.scss';

const propTypes = {
    onLogin: React.PropTypes.func.isRequired
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
                    <Button type="submit">Please!</Button>
                </form>
            </div>
        )
    }
});

LoginForm.propTypes = propTypes;

export default LoginForm;

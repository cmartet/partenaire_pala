import React from 'react';
import {withRouter} from 'react-router'

const AuthSuccessScreen = React.createClass({

    componentDidMount() {
        const url = '/private';
        window.opener.open(url, '_self');
        window.opener.focus();
        window.close();
    },

    render () {
        return (
            <div className="AuthSuccessScreen"></div>
        )
    }
});


export default withRouter(AuthSuccessScreen);

import React        from 'react';
import {withRouter} from 'react-router'

const AuthSuccessScreen = React.createClass({

    componentDidMount() {
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

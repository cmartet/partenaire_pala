import React        from 'react';
import {withRouter} from 'react-router'

class AuthSuccessScreen extends React.Component{

    componentDidMount() {
        window.opener.postMessage('authSuccess', process.env.PUBLIC_URL);
        window.opener.focus();
        window.close();
    }

    render () {
        return (
            <div className="AuthSuccessScreen"></div>
        )
    }
}

export default withRouter(AuthSuccessScreen);

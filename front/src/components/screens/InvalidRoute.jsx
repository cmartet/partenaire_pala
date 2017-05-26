import React from 'react';
import {browserHistory, withRouter} from 'react-router'

const propTypes = {};

class InvalidRoute extends React.Component{

    redirectHome(){
        browserHistory.push('/');
    }

    render () {
        return (-
            <div>
                <h1>Got Lost ?</h1>
                <button onClick={this.redirectHome}>Get back on your tracks</button>
            </div>
        )
    }
}

InvalidRoute.propTypes = propTypes;

export default withRouter(InvalidRoute);

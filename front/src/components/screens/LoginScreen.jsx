import React from 'react';
import {withRouter} from 'react-router'
import NavBar from '../navBar/NavBar';
import Login from './../login/Login'

class LoginScreen extends React.Component{

    render () {
        return (
            <div className="LoginScreen">
                <NavBar location={this.props.location}/>
                <Login/>
            </div>
        )
    }
};


export default withRouter(LoginScreen);

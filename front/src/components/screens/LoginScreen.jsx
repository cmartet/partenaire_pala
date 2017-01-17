import React from 'react';
import {withRouter} from 'react-router';

import './LoginScreen.scss';

const LoginScreen = React.createClass({

    // login(){
    //     this.props.authenticateActions.authenticateToFacebook();
    // },

    render () {
        return (
            <div className="LoginScreen">

                <a href="http://localhost:8090/auth/facebook">Log me please</a>
                <div className="explanations">
                    <div className="expl1">
                        <h2>Pourquoi me connecter ?</h2>
                        <p> bla bla bla</p>
                    </div>

                    <div className="expl1">
                        <h2>Non, nous ne publierons rien sur votre mur !</h2>
                        <p> bla bla bla</p>
                    </div>
                </div>

            </div>
        )
    }
});

export default withRouter(LoginScreen);

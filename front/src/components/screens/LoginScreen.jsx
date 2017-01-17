import React from 'react';
import {withRouter} from 'react-router'

import './LoginScreen.scss';

const LoginScreen = React.createClass({

    render () {
        return (
            <div className="LoginScreen">

                <div className="fb-login-button"
                     data-max-rows="1"
                     data-size="xlarge"
                     data-show-faces="false"
                     data-auto-logout-link="false"></div>

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

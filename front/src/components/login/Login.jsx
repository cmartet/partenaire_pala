import React from 'react';
import {withRouter} from 'react-router';
import {Button} from 'react-bootstrap';
import * as urls from '../../constants/Urls'
var FaFacebook = require('react-icons/lib/fa/facebook');

import './Login.scss';

const LoginScreen = React.createClass({

    login(){
        window.location.href = urls.FACEBOOK_AUTH;
    },

    render () {
        return (
            <div className="Login">

                <div className="login-zone">
                    <div className="need-login">Vous devez vous connecter pour pouvoir créer une partie</div>
                    <Button
                        bsStyle="primary"
                        onClick={this.login}>
                        {React.createElement(FaFacebook, null)} Connexion avec Facebook
                    </Button>
                </div>

                <div className="explanations">
                    <div className="expl1">
                        <div className="section-title">Pourquoi dois-je me connecter ?</div>
                        <div>bla bla bla</div>
                    </div>

                    <div className="expl1">
                        <div className="section-title">Non, nous ne publierons rien sur votre mur !</div>
                        <div> bla bla bla</div>
                    </div>
                </div>

            </div>
        )
    }
});

export default withRouter(LoginScreen);

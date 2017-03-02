import React, {PropTypes}   from 'react';
import * as urls            from '../../constants/Urls'
import * as utils           from '../../utils';


import './NavBar.scss';

const propTypes = {
    location: PropTypes.object,
    logout: PropTypes.func
};

const NavBar = React.createClass({

    loginFB() {
        const url = urls.FACEBOOK_AUTH;
        const name = 'facebook_login';
        const specs = 'width=500,height=500';
        window.open(url, name, specs);
    },

    isSearchScreen() {
        return this.props.location.pathname === '/' ? " active" : "";
    },

    isCreateScreen() {
        return this.props.location.pathname === '/create' ? " active" : "";
    },

    render() {
        return (
            <div className="navBar">
                <div className="brand">Partenaire Pala</div>
                <div className="menu">
                    <div className={"search" + this.isSearchScreen()}>
                        <a href="#/">Rechercher une partie</a>
                    </div>
                    <div className={"create" + this.isCreateScreen()}>
                        <a href="#/create">Proposer une partie</a>
                    </div>
                    <div className="login">
                        {utils.getAuthCookie() ?
                            <span onClick={() => this.props.logout()} className="logout">Déconnexion</span> :
                            <span onClick={this.loginFB}>Connexion</span>}
                    </div>
                </div>
            </div>
        )
    }
});

NavBar.propTypes = propTypes;
export default NavBar;

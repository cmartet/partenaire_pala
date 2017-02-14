import React from 'react';
import * as urls from '../../constants/Urls'

import './NavBar.scss';

const propTypes = {
    location: React.PropTypes.object,
    isLoggedIn: React.PropTypes.bool
};

const NavBar = React.createClass({

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
                        {this.props.isLoggedIn ? <span>Déconnexion</span> : <a href={urls.FACEBOOK_AUTH}>Connexion</a>}
                    </div>
                </div>
            </div>
        )
    }
});

NavBar.propTypes = propTypes;
export default NavBar;

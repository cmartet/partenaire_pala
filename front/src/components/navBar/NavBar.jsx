import React      from 'react';
import PropTypes  from 'prop-types';
import * as utils from '../../utils';

import './NavBar.scss';

const propTypes = {
    location: PropTypes.object,
    logout: PropTypes.func,
    profilePic: PropTypes.string,
    username: PropTypes.string
};

class NavBar extends React.Component {

    isSearchScreen() {
        return this.props.location.pathname === '/' ? " active" : "";
    }

    isCreateScreen() {
        return this.props.location.pathname === '/create' ? " active" : "";
    }

    displayUserInfo() {
        return (<span onClick={utils.loginFB}>Connexion</span>);
    }

    displayLogout() {
        return (
            <div className="profile-info">
                <span className="profile-name">
                Bonjour {this.props.username} !
                    {this.props.profilePic ?
                        <img src={this.props.profilePic} alt="profile"/>
                        : null}
                </span>
                <div onClick={() => this.props.logout()} className="logout">Déconnexion
                </div>
            </div>);
    }

    displayAuthInfo() {
        return utils.getAuthCookie() ? this.displayLogout() : this.displayUserInfo();
    }

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
                        {this.displayAuthInfo()}
                    </div>
                </div>
            </div>
        )
    }
}

NavBar.propTypes = propTypes;

export default NavBar;

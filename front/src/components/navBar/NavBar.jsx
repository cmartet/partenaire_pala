import React        from 'react';
import ExitToApp    from 'material-ui/svg-icons/action/exit-to-app';
import {List, ListItem} from 'material-ui/List';
import Paper        from 'material-ui/Paper';
import PropTypes    from 'prop-types';
import * as utils   from '../../utils';
import classNames from 'classnames';

import './NavBar.scss';

const propTypes = {
    location: PropTypes.object,
    logout: PropTypes.func,
    profilePic: PropTypes.string,
    username: PropTypes.string
};

const defaultProps = {
    logout: () => {
    },
    profilePic: undefined,
    username: undefined
};

class NavBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            menuOpen: false
        };
    };

    isSearchScreen = () => {
        return this.props.location.pathname === '/' ? " active" : "";
    };

    isCreateScreen = () => {
        return this.props.location.pathname === '/create' ? " active" : "";
    };

    displayConnectionLink = () => {
        return (<span className="connection-link"
                      onClick={utils.loginFB}>
                    Connexion
                </span>);
    };

    displayProfilePicture = () => {
        const paperStyle = {
            height: 45,
            width: 45,
            marginTop: '2px',
            textAlign: 'center',
            display: 'inline-block'
        };

        const backgroundImage = {
            height: '45px',
            borderRadius: '50%',
            backgroundImage: `url(${this.props.profilePic})`
        };

        if (this.props.profilePic)
            return (<Paper zDepth={1} circle={true} style={paperStyle}>
                <div style={backgroundImage}></div>
            </Paper>);
    };

    displayLogin = () => {
        const listItemStyle = {
            padding: '10px 10px 10px 50px'
        };

        const className = classNames('menu-list', {'toggled': this.state.menuOpen});

        return (
            <div className="name">
                <span onClick={this.handleOpenMenu}>{this.props.username}</span>
                {this.state.menuOpen ?
                    <List className={className}>
                        <ListItem className="list-item"
                                  innerDivStyle={listItemStyle}
                                  primaryText="Déconnexion"
                                  leftIcon={<ExitToApp />}
                                  onClick={() => this.props.logout()}/>
                    </List> : null }
            </div>)
    };

    handleOpenMenu = () => {
        this.setState({'menuOpen': !this.state.menuOpen})
    };

    displayLogout() {
        return (
            <div className="profile-info">
                <span className="profile-name">
                    {this.displayProfilePicture()}
                    {this.displayLogin()}
                </span>
            </div>);
    }

    displayAuthInfo() {
        return utils.getAuthCookie() && this.props.username ? this.displayLogout() : this.displayConnectionLink();
    }

    render() {
        return (
            <div className="navBar">
                <div className="brand">
                    <span>Partenaire Pala</span>
                </div>
                <div className="menu">
                    <div className="links">
                        <div className={"search" + this.isSearchScreen()}>
                            <a href="#/">Rechercher une partie</a>
                        </div>
                        <div className={"create" + this.isCreateScreen()}>
                            <a href="#/create">Proposer une partie</a>
                        </div>
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
NavBar.defaultProps = defaultProps;

export default NavBar;

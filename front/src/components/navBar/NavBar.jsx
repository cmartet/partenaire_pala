import React        from 'react';
import ExitToApp    from 'material-ui/svg-icons/action/exit-to-app';
import DownArrow    from 'material-ui/svg-icons/navigation/arrow-drop-down';
import IconButton   from 'material-ui/IconButton';
import IconMenu     from 'material-ui/IconMenu';
import MenuItem     from 'material-ui/MenuItem';
import Paper        from 'material-ui/Paper';
import PropTypes    from 'prop-types';
import * as utils   from '../../utils';

import basqueimg  from '../../../public/assets/images/basque_color_lines.svg';

import './NavBar.scss';

const propTypes = {
    location: PropTypes.object,
    logout: PropTypes.func,
    profilePic: PropTypes.string,
    username: PropTypes.string
};

const defaultProps = {
    logout: () => {},
    profilePic: undefined,
    username: undefined
};

class NavBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            openMenu: false
        };
    };

    isSearchScreen = () => {
        return this.props.location.pathname === '/' ? " active" : "";
    };

    isCreateScreen = () => {
        return this.props.location.pathname === '/create' ? " active" : "";
    };

    displayUserInfo = () => {
        return (<span onClick={utils.loginFB}>Connexion</span>);
    };

    handleMenuItemSelection = (event, item, index) => {
        switch (item) {
            case "logout":
                this.props.logout();
                break;
            default:
                return;
        }
    };

    displayLogout() {
        const welcomeMessage = (<span onClick={this.handleOpenMenu}>
                         {"Bonjour " + this.props.username}
                         </span>);

        const paperStyle = {
            height: 50,
            width: 50,
            textAlign: 'center',
            display: 'inline-block'
        };

        const backgroundImage =  {
            height: '50px',
            borderRadius: '50%',
            backgroundImage: `url(${this.props.profilePic})`
        };

        return (
            <div className="profile-info">
                <span className="profile-name">
                    <span>{welcomeMessage}</span>

                     <IconMenu
                         iconButtonElement={<IconButton><DownArrow/></IconButton>}
                         onItemTouchTap={this.handleMenuItemSelection}
                     >
                      <MenuItem
                          value="logout"
                          primaryText="Déconnexion"
                          leftIcon={<ExitToApp/>}/>
                    </IconMenu>

                    {this.props.profilePic ?
                        <Paper zDepth={2} circle={true} style={paperStyle}>
                            <div style={backgroundImage}></div>
                        </Paper>
                        : null}
                </span>
            </div>);
    }

    displayAuthInfo() {
        return utils.getAuthCookie() && this.props.username ? this.displayLogout() : this.displayUserInfo();
    }

    render() {
        return (
            <div className="navBar">
                <div className="brand">
                    <img src={basqueimg} alt="basque"/>
                    <span>Partenaire Pala</span>
                </div>
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
NavBar.defaultProps = defaultProps;

export default NavBar;

import React from 'react';

import './NavBar.scss';

const NavBar = React.createClass({

    isSearchScreen(){
        return this.props.location.pathname === '/' ? " active" : "";
    },

    isCreateScreen(){
        return this.props.location.pathname === '/create' ? " active" : "";
    },

    render() {
        return (
            <div className="navBar">
                <div className="brand">Partenaire Pala</div>
                <div className="menu">
                    <div className={"search" + this.isSearchScreen()}>Rechercher une partie</div>
                    <div className={"create" + this.isCreateScreen()}>Proposer une partie</div>
                </div>
            </div>
        )
    }
});

export default NavBar;

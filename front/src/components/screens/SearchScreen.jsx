import React from 'react';
import {withRouter} from 'react-router'
import FilterBar from '../search/FilterBar'
import GameInfo from '../search/GameInfo'

import './SearchScreen.scss';

const SearchScreen = React.createClass({

    isSearchScreen(){
        return this.props.location.pathname === '/'? " active" : "";
    },

    isCreateScreen(){
        return this.props.location.pathname === '/create' ? " active" : "";
    },

    render () {
        return (
            <div>
                <div className="header">
                    <div className="brand">Partenaire Pala</div>
                    <div className="menu">
                        <div className={"search" + this.isSearchScreen()}>Rechercher une partie</div>
                        <div className={"create" + this.isCreateScreen()}>Proposer une partie</div>
                    </div>
                </div>
                <FilterBar/>
                <GameInfo
                    level="3"
                    place="Pessac"
                    maxPlayers="4"
                    date={new Date().toLocaleString()}
                />
            </div>
        )
    }
});

export default withRouter(SearchScreen);

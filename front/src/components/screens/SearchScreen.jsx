import React from 'react';
import {withRouter} from 'react-router'
import FilterBar from '../search/FilterBar'
import GameInfo from '../search/GameInfo'
import murtest from '../../../public/assets/images/murtest.jpg';

import './SearchScreen.scss';

const SearchScreen = React.createClass({

    componentDidMount(){
        this.props.gamesActions.fetchGames();
    },

    isSearchScreen(){
        return this.props.location.pathname === '/' ? " active" : "";
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
                <div className="result-games">
                    <GameInfo
                        level="3"
                        placePicture={murtest}
                        place="Pessac"
                        maxPlayers="4"
                        creator="Rainbow Dash"
                        date="2017-10-31T14:00:00.000Z"
                        players={[{"name": "Sushiii"}, {"name": "Pinkie pie"}]}
                    />
                    <GameInfo
                        level="1"
                        place="VILLENAVE D'ORNON"
                        maxPlayers="8"
                        date="2016-12-29T14:00:00.000Z"
                        players={[{"name": "Sushiii"}]}
                    />
                    <GameInfo
                        level="2"
                        place="BLA BLA BLA"
                        maxPlayers="2"
                        date="2016-12-30T14:00:00.000Z"
                        players={[{"name": "Sushiii"}, {"name": "Pinkie pie"}]}
                    />
                    <GameInfo
                        level="6"
                        place="Moga"
                        maxPlayers="4"
                        date="2015-10-31T00:00:00.000Z"
                        players={[{"name": "Sushiii"}, {"name": "Pinkie pie"}]}
                    />
                </div>
            </div>
        )
    }
});

export default withRouter(SearchScreen);

import React        from 'react';
import {withRouter} from 'react-router'
import FilterBar    from '../search/FilterBar'
import GameInfo     from '../search/GameInfo'
import NavBar       from '../navBar/NavBar';

import './SearchScreen.scss';

const defaultProps = {
    games: []
};

class SearchScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fieldType: null,
            date: null,
            place: null
        }
    }

    componentDidMount = () => {
        this.search();
        this.props.authActions.getProfile();
    };

    search = () => {
        this.props.gamesActions.fetchGames(this.state.date, this.state.place);
    };

    changeDateValue = (event, value) => {
        this.setState({'date': value});
    };

    handleChange = (inputName, event) => {
        this.setState({[inputName]: event.target.value});
    };

    handleSelectChange = (value) => {
        this.setState({'fieldType': value});
    };

    render() {
        return (
            <div>
                <NavBar location={this.props.location}
                        logout={this.props.authActions.logout}/>

                <FilterBar changeFieldType={this.handleSelectChange.bind(this)}
                           changePlace={this.handleChange.bind(this, 'place')}
                           changeDateTime={this.changeDateValue}
                           launchReseach={() => this.search()}/>

                <div className="result-games">
                    {
                        this.props.games.length > 0 ?
                            this.props.games.map(game => {
                                return <GameInfo
                                    key={game._id}
                                    level={game.level}
                                    placePicture={game.place.photo}
                                    place={game.place.name}
                                    maxPlayers={game.maxMissingPlayers}
                                    creator={game.creator.name}
                                    creatorId={game.creator._id}
                                    date={game.date}
                                    players={game.players}
                                    connectedUserId={this.props.auth._id}
                                    gameId={game._id}
                                    deleteGame={this.props.gamesActions.deleteGame}
                                />
                            }) :
                            (<div>Pas de résultat. Et pas de résultat ... pas d'palais.</div>)
                    }
                </div>
            </div>
        )
    }
}

SearchScreen.defaultProps = defaultProps;

export default withRouter(SearchScreen);

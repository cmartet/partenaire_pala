import React        from 'react';
import {withRouter} from 'react-router';
import FilterBar    from '../search/FilterBar';
import GameInfo     from '../search/GameInfo';
import NavBar       from '../navBar/NavBar';
import Popup        from '../popup/Popup';
import Snackbar     from 'material-ui/Snackbar';


import './SearchScreen.scss';

class SearchScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fieldType: null,
            date: null,
            place: null,
            delete: {}
        }
    }

    componentDidMount = () => {
        this.search();
        this.props.authActions.getProfile();
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.gameDeletion.success) {
            this.props.gamesActions.reinitSuccessFromDeletion();
            this.setState({'delete': {asking: false, gameId: null, success: true}});
            this.search();
        }
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

    deleteGame = () => {
        this.props.gamesActions.deleteGame(this.state.delete.gameId);
    };

    setStateForGameDeletion = (gameId) => {
        this.setState({delete: {asking: true, gameId: gameId, success: false}});
    };

    handleSnackBarClose = () => {
        this.setState({delete: {asking: false, gameId: null, success: false}});
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

                <Popup title="Supprimer une partie"
                       message="Êtes-vous certain de vouloir supprimer cette partie ? Sûr Sûr ?"
                       open={this.state.delete.asking || this.props.gameDeletion.inProgress}
                       cancelButton={false}
                       handleClose={() => this.deleteGame()}/>

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
                                    deleteGame={() => this.setStateForGameDeletion(game._id)}
                                />
                            }) :
                            (<div>Pas de résultat. Et pas de résultat ... pas d'palais.</div>)
                    }
                </div>
                <Snackbar
                    open={!!this.state.delete.success}
                    message="La partie a bien été supprimée"
                    autoHideDuration={4000}
                    onRequestClose={this.handleSnackBarClose}
                />
            </div>
        )
    }
}

export default withRouter(SearchScreen);

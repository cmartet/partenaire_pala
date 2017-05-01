import React            from 'react';
import {withRouter}     from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';
import FilterBar        from '../search/FilterBar';
import GameInfo         from '../search/GameInfo';
import NavBar           from '../navBar/NavBar';
import Popup            from '../popup/Popup';
import Snackbar         from 'material-ui/Snackbar';

import './SearchScreen.scss';

class SearchScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: null,
            delete: {},
            editGame: false,
            join: {},
            fieldType: null,
            place: null
        }
    }

    componentDidMount = () => {
        this.search();
        this.props.authActions.getProfile();

        window.addEventListener('message', event => {
            if (event.origin !== process.env.PUBLIC_URL) return;
            this.props.authActions.getProfile();
        }, false);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.gameDeletion.success) {
            this.props.gamesActions.reinitState();
            this.setState({'delete': {asking: false, gameId: null, success: true}});
            this.search();
        }
        else if (nextProps.gameJoin.success) {
            this.props.gamesActions.reinitState();
            this.setState({'join': {inProgress: false, success: true}});
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

    deleteGame = (buttonClicked, cancelButtonClicked) => {
        if (!buttonClicked || cancelButtonClicked) {
            this.setState({'delete': {asking: false, gameId: null, success: false}});
        }
        else {
            this.props.gamesActions.deleteGame(this.state.delete.gameId);
        }
    };

    joinGame = gameId => {
        this.setState({join: {inProgress: true, success: false, gameId: gameId}});
        this.props.gamesActions.joinGame(gameId);
    };

    unjoinGame = gameId => {
        this.setState({unjoin: {inProgress: true, success: false, gameId: gameId}});
        this.props.gamesActions.unjoinGame(gameId);
    };

    setStateForGameDeletion = (gameId) => {
        this.setState({delete: {asking: true, gameId: gameId, success: false}});
    };

    handleSnackBarDeleteClose = () => {
        this.setState({delete: {asking: false, gameId: null, success: false}});
    };

    handleSnackBarJoinClose = () => {
        this.setState({join: {inProgress: false, success: false}});
    };

    render() {
        return (
            <div>
                <NavBar location={this.props.location}
                        logout={this.props.authActions.logout}
                        profilePic={this.props.auth.profilePic}
                        username={this.props.auth.name}/>

                <FilterBar changeFieldType={this.handleSelectChange.bind(this)}
                           changePlace={this.handleChange.bind(this, 'place')}
                           changeDateTime={this.changeDateValue}
                           launchReseach={() => this.search()}/>

                <Popup title="Supprimer une partie"
                       message="Êtes-vous certain de vouloir supprimer cette partie ? Sûr Sûr ?"
                       open={this.state.delete.asking || this.props.gameDeletion.inProgress}
                       cancelButton={true}
                       handleCancel={() => this.setState({'delete': {asking: false, gameId: null, success: false}})}
                       handleClose={this.deleteGame}/>

                <div className="result-games">
                    {
                        (this.props.games.data.length > 0 && !this.props.games.inProgress) ?
                            this.props.games.data.map(game => {
                                return <GameInfo
                                    key={game._id}
                                    creator={game.creator.name}
                                    creatorId={game.creator._id}
                                    connectedUserId={this.props.auth.id}
                                    date={game.date}
                                    deleteGame={() => this.setStateForGameDeletion(game._id)}
                                    editGame={() => this.editGame(game)}
                                    gameId={game._id}
                                    joinGame={() => this.joinGame(game._id)}
                                    leaveGame={() => this.unjoinGame(game._id)}
                                    level={game.level}
                                    maxPlayers={game.maxMissingPlayers}
                                    place={game.place.name}
                                    placePicture={game.place.photo}
                                    players={game.players}
                                />
                            }) :
                            this.props.games.inProgress ?
                                <CircularProgress size={80} thickness={5}/> :
                                (<div>Pas de résultat. Et pas de résultat ... pas d'palais.</div>)
                    }
                </div>

                <Snackbar
                    open={!!this.state.delete.success}
                    message="La partie a bien été supprimée"
                    autoHideDuration={4000}
                    onRequestClose={this.handleSnackBarDeleteClose}/>

                <Snackbar
                    open={!!this.state.join.success}
                    message="La modification a bien été enregistrée :)"
                    autoHideDuration={4000}
                    onRequestClose={this.handleSnackBarJoinClose}/>
            </div>
        )
    }
}

export default withRouter(SearchScreen);

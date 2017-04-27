import React, {Component}   from 'react';
import {withRouter}         from 'react-router'
import CircularProgress     from 'material-ui/CircularProgress';
import CreateForm           from '../createForm/CreateForm'
import NavBar               from '../navBar/NavBar';

class UpdateScreen extends Component {

    componentDidMount = () => {
        this.props.authActions.getProfile();
        console.log();
    };
    
    getGameToUpdate = () => {
        this.props.games.fetchGame(this.props.params.id);
    };

    render() {
        return (
            <div className="CreateScreen">
                <NavBar location={this.props.location}
                        logout={this.props.authActions.logout}
                        profilePic={this.props.auth.profilePic}
                        username={this.props.auth.name}
                />
                {this.props.games.inProgress ?
                <CircularProgress size={80} thickness={5}/> :
                <CreateForm
                    auth={this.props.auth}
                    createGame={this.props.gamesActions.updateGame}
                    games={this.props.games.data}
                    gameToUpdate={this.props.game.data}
                    gameAtSameTime={this.props.gamesActions.getGameWithinHourAndPlace}
                    gameCreationStatus={this.props.gameUpdate}
                    places={this.props.places.data}
                    searchPlaces={this.props.placesActions.fetchPlaces}
                    searchPlacesInProgress={this.props.places.inProgress}
                    update={true}
                />}

            </div>
        )
    }
}

export default withRouter(UpdateScreen);

import React, {Component}   from 'react';
import {withRouter}         from 'react-router'
import CreateForm           from '../createForm/CreateForm'
import NavBar               from '../navBar/NavBar';

class CreateScreen extends Component {

    componentDidMount = () => {
        this.props.authActions.getProfile();

        window.addEventListener('message', event => {
            if (event.origin !== process.env.PUBLIC_URL) return;
            this.props.authActions.getProfile();
        }, false);
    };

    render() {
        return (
            <div className="CreateScreen">
                <NavBar location={this.props.location}
                        logout={this.props.authActions.logout}
                        profilePic={this.props.auth.profilePic}
                        username={this.props.auth.name}
                />

                <CreateForm
                    auth={this.props.auth}
                    createGame={this.props.gamesActions.createGame}
                    games={this.props.games.data}
                    gameAtSameTime={this.props.gamesActions.getGameWithinHourAndPlace}
                    gameCreationStatus={this.props.gameCreation}
                    places={this.props.places.data}
                    searchPlaces={this.props.placesActions.fetchPlaces}
                    searchPlacesInProgress={this.props.places.inProgress}
                />

            </div>
        )
    }
}

export default withRouter(CreateScreen);

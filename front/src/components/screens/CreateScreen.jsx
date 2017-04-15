import React, {Component}   from 'react';
import {withRouter}         from 'react-router'
import {Row, Col}           from 'react-flexbox-grid';
import DatePicker           from 'material-ui/DatePicker';
import MenuItem             from 'material-ui/MenuItem';
import NavBar               from '../navBar/NavBar';
import SearchPlace          from '../createForm/SearchPlace';
import SelectField          from 'material-ui/SelectField';
import TextField            from 'material-ui/TextField';
import TimePicker           from 'material-ui/TimePicker';
import * as util            from '../../utils'
import CheckAndCreate       from '../createForm/CheckAndCreate';
import CreateStepper       from '../createForm/CreateStepper';

import './CreateScreen.scss';

class CreateScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchedPlace: '',
            allGameInfo: {},
            validation: {
                maxMissingPlayers: null,
                players: null
            },
            place: {},
            date: new Date(),
            level: '',
            maxMissingPlayers: 4,
            nbPlayers: 1,
            message: '',
            error: {},
            creationInProgress: false,
            players: []
        };
    };

    componentDidMount = () => {
        this.props.authActions.getProfile();
        this.changeFirstPlayerInParticipants('Vous !');
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.name) {
            this.changeFirstPlayerInParticipants(this.props.auth.id, this.props.auth.name);
        }
    };

    changeFirstPlayerInParticipants = (playerId, playerName) => {
        var players = this.state.players.slice();
        players[0] = { _id: playerId, name: playerName};
        this.setState({'players': players});
    };

    buildGameFromState = () => {
        return {
            place: this.state.place,
            date: this.state.dateTime,
            level: this.state.level,
            maxMissingPlayers: this.state.maxMissingPlayers,
            message: this.state.message,
            players: this.state.players
        }
    };

    createGame = () => {
        if (this.props.auth.sessionValid) {
            this.setState({'creationInProgress': true});
            this.props.gamesActions.createGame(this.state.allGameInfo);
        }
        else {
            this.setState({openPopup: true});
        }
    };

    handleChange = (inputName, event) => {
        this.setState({[inputName]: event.target.value});
    };

    handleDateTimeChange = (stateKey) => {
        return (event, value) => {
            this.setState({[stateKey]: value});
        };
    };

    getSameGamesAsTheOneToBeCreated = () => {
        this.props.gamesActions.getGameWithinHourAndPlace(this.state.dateTime, this.state.place.name);
    };

    areInfoOK(stepIndex) {
        switch (stepIndex) {
            case 0:
                return this.checkPlaceInfo();
            case 1:
                return this.checkGameInfo();
            case 2:
                return this.checkPlayersInfo();
            default:
                return true;
        }
    };

    checkPlaceInfo = () => {
        var isFrontonSelected = !!this.state.place.fronton_id;
        this.setState({error: {place: !isFrontonSelected}});
        return isFrontonSelected;
    };

    checkGameInfo = () => {
        var isFormValid = true;

        if (!this.state.level) {
            this.setErrorMessageForKey('level', 'Veuillez sélectionner un niveau pour la partie');
            isFormValid = false;
        }
        else {
            this.resetErrorFor('level');
        }

        if (!this.state.date) {
            this.setErrorMessageForKey('date', 'Veuillez sélectionner le jour de la partie');
            isFormValid = false;
        }
        else {
            this.resetErrorFor('date');
        }

        if (!this.state.time) {
            this.setErrorMessageForKey('time', 'Veuillez sélectionner l\'heure de début de la partie');
            isFormValid = false;
        }
        else {
            this.resetErrorFor('time');
        }

        if (isFormValid) {
            let dateTime = new Date(this.state.date);
            dateTime.setHours(this.state.time.getHours());
            dateTime.setMinutes(this.state.time.getMinutes());
            this.setState({'dateTime': dateTime});
        }

        return isFormValid;
    };

    checkPlayersInfo = () => {
        var isFormValid = true;

        if (!this.state.maxMissingPlayers) {
            this.setErrorMessageForKey('maxMissingPlayers', 'Veuillez noter le nombre total de participants à la partie');
            isFormValid = false;
        }
        else {
            this.resetErrorFor('maxMissingPlayers');
        }

        if (!this.state.nbPlayers ||
            this.state.nbPlayers > this.state.maxMissingPlayers ||
            this.state.nbPlayers < 0) {
            this.setErrorMessageForKey('nbPlayers', 'saisir un nombre valide de participants');
            isFormValid = false;
        }
        else {
            this.resetErrorFor('nbPlayers');
        }

        return isFormValid;
    };

    resetErrorFor = key => {
        let allErrors = this.state.error;
        allErrors[key] = null;
        this.setState({'error': allErrors});
    };

    setErrorMessageForKey = (key, message) => {
        let allErrors = this.state.error;
        allErrors[key] = message;
        this.setState({'error': allErrors});
    };

    handleSelectChange = stateKey => {
        return (event, index, value) => this.setState({[stateKey]: value});
    };

    getSelectedGame = (value) => {
        this.setState({'place': value}, this.refs.stepper.handleNext);
    };

    setGameValidationState = (isValid) => {
        this.setState({placeIsValid: isValid});
    };

    onChangeNbPlayers = (event, value) => {
        var intValue = parseInt(value, 10);

        if (!value || intValue < 0 || intValue > this.state.maxMissingPlayers) {
            this.setState({'nbPlayers': value});
            return;
        }

        var players = this.state.players.slice();
        var newPlayersArray = [];

        for (var i = 0; i < intValue; i++) {
            if (!players[i]) {
                newPlayersArray[i] = {name: 'Joueur n°' + i};
            }
            else {
                newPlayersArray[i] = { _id: players[i]._id, name: players[i].name };
            }
        }

        this.setState({'players': newPlayersArray});
        this.setState({'nbPlayers': value});
    };

    onChangePlayerName = (index) => {
        return (event, value) => {
            var players = this.state.players.slice();
            players[index] = {name: value};
            this.setState({'players': players});
        };
    };

    handleLastStep = () => {
        this.getSameGamesAsTheOneToBeCreated();
        this.setState({'allGameInfo': this.buildGameFromState()});
    };

    closePopup = () => {
        this.setState({openPopup: false});
    };

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <div>
                        <SearchPlace
                            searchAction={this.props.placesActions.fetchPlaces}
                            onSelectPlace={this.getSelectedGame}
                            places={this.props.places.data}
                            selectedPlace={this.state.place}
                            isValid={this.setGameValidationState}
                            isSearchInProgress={this.props.places.inProgress}
                        />
                        {this.state.error.place ?
                            (<div>Merci de sélectionner un fronton avant de continuer</div>) : null}
                    </div>);
            case 1:
                return (
                    <div>
                        <Row>
                            <Col md={6}>
                                <SelectField
                                    floatingLabelText="Niveau moyen *"
                                    value={this.state.level}
                                    onChange={this.handleSelectChange('level')}
                                    errorText={this.state.error.level}>

                                    <MenuItem key={0} value="Débutant" primaryText="Débutant"/>
                                    <MenuItem key={1} value="Intermédiaire" primaryText="Intermédiaire"/>
                                    <MenuItem key={2} value="Bon" primaryText="Bon"/>
                                    <MenuItem key={3} value="Très bon" primaryText="Très bon"/>
                                    <MenuItem key={4} value="Tout niveau accepté" primaryText="Tout niveau accepté"/>

                                </SelectField>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={6} md={4}>
                                <DatePicker hintText="Date *"
                                            DateTimeFormat={util.getDateTimeFormat()}
                                            locale="fr"
                                            autoOk={true}
                                            cancelLabel="Annuler"
                                            defaultDate={this.state.date}
                                            errorText={this.state.error.date}
                                            onChange={this.handleDateTimeChange('date')}/>

                                <TimePicker
                                    format="24hr"
                                    hintText="Heure *"
                                    cancelLabel="Annuler"
                                    value={this.state.time}
                                    errorText={this.state.error.time}
                                    onChange={this.handleDateTimeChange('time')}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} md={8}>
                                <TextField
                                    floatingLabelText="Information complémentaire"
                                    hintText="(facultatif)"
                                    multiLine={true}
                                    rows={2}
                                    value={this.state.message}
                                    onChange={this.handleChange.bind(this, 'message')}/>
                            </Col>
                        </Row>
                    </div>
                );
            case 2:
                return (
                    <Row>
                        <Col md={6}>
                            <div className="inline-form">
                                <TextField
                                    floatingLabelText="Nombre de participants maximum *"
                                    type="number"
                                    value={this.state.maxMissingPlayers}
                                    errorText={this.state.error.maxMissingPlayers}
                                    onChange={this.handleChange.bind(this, 'maxMissingPlayers')}/>

                                <TextField
                                    floatingLabelText="Nombre de participants déjà prévus *"
                                    type="number"
                                    value={this.state.nbPlayers}
                                    errorText={this.state.error.nbPlayers}
                                    onChange={this.onChangeNbPlayers.bind(this)}
                                    max={this.state.maxMissingPlayers}
                                    min={0}
                                />

                            </div>

                            {this.state.players.map((player, i) => {
                                return <div key={"player_" + i}>
                                    <TextField
                                        floatingLabelText={"Nom du joueur n°" + i}
                                        type="text"
                                        value={player.name}
                                        onChange={this.onChangePlayerName(i)}/>
                                </div>
                            })}
                        </Col>
                    </Row>
                );
            case 3:
                return (
                    <CheckAndCreate
                        gameInfo={this.state.allGameInfo}
                        games={this.props.games.data}
                        connectedUserName={this.props.auth.name}
                        gameCreation={this.props.gameCreation}
                    />);
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }

    render() {
        return (
            <div className="CreateScreen">
                <NavBar location={this.props.location}
                        logout={this.props.authActions.logout}
                        profilePic={this.props.auth.profilePic}
                        username={this.props.auth.name}
                />

                <CreateStepper
                    ref="stepper"
                    createGame={this.createGame.bind(this)}
                    getStepContent={this.getStepContent.bind(this)}
                    areInfoOK={this.areInfoOK.bind(this)}
                    handleLastStep={this.handleLastStep.bind(this)}
                    openPopup={this.state.openPopup}
                    closePopup={this.closePopup.bind(this)}
                    gameCreation={this.props.gameCreation}
                />
            </div>
        )
    }
}

export default withRouter(CreateScreen);

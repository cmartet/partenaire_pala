import React, {Component}       from 'react';
import {withRouter}             from 'react-router'
import {Row, Col}               from 'react-flexbox-grid';
import DatePicker               from 'material-ui/DatePicker';
import FlatButton               from 'material-ui/FlatButton';
import GameInfo                 from '../search/GameInfo'
import LoginScreen              from './../login/Login'
import MenuItem                 from 'material-ui/MenuItem';
import NavBar                   from '../navBar/NavBar';
import Popup                    from '../popup/Popup'
import RaisedButton             from 'material-ui/RaisedButton';
import SearchPlace              from '../createForm/SearchPlace';
import SelectField              from 'material-ui/SelectField';
import TextField                from 'material-ui/TextField';
import TimePicker               from 'material-ui/TimePicker';
import * as util                from '../../utils'

import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';

import './CreateScreen.scss';

class CreateScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchedPlace: '',
            stepIndex: 0,
            validation: {
                maxMissingPlayers: null,
                players: null
            },
            place: {},
            date: new Date(),
            level: '',
            maxMissingPlayers: 4,
            message: '',
            error: {},
            creationInProgress: false
        };
    };

    componentDidMount = () => {
        this.props.authActions.getProfile();
    };

    buildGameFromState = () => {
        return {
            place: this.state.place,
            date: this.state.dateTime,
            level: this.state.level,
            maxMissingPlayers: this.state.maxMissingPlayers,
            message: this.state.message,
            creator: {
                _id: this.props.auth.id,
                name: this.props.auth.name
            },
            players: []
        }
    };

    redirectToSearchPage = () => {
        window.location.href = '/';
    };

    createGame = () => {
        if (this.props.auth.sessionValid) {
            this.setState({'creationInProgress': true});
            let game = this.buildGameFromState();
            this.props.gamesActions.createGame(game);
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

    closePopup = () => {
        this.setState({openPopup: false});
    };

    handleNext = () => {
        const {stepIndex} = this.state;
        if (stepIndex < 3) {
            if (this.areInfoOK(stepIndex))
                this.setState({stepIndex: stepIndex + 1});
        }
        else {
            this.createGame();
        }
    };

    areInfoOK = stepIndex => {
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

    getNextButtonLabel = () => {
        const {stepIndex} = this.state;
        return stepIndex < 3 ? 'Suivant' : 'C\'est tout bon, créer cette partie';
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    handleSelectChange = stateKey => {
        return (event, index, value) => this.setState({[stateKey]: value});
    };

    getSelectedGame = (value) => {
        this.setState({'place': value})
    };

    setGameValidationState = (isValid) => {
        this.setState({placeIsValid: isValid})
    };

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <div>
                        <SearchPlace
                            searchAction={this.props.gamesActions.fetchPlaces}
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
                            </div>
                        </Col>
                    </Row>
                );
            case 3:
                return (
                    <div>
                        <GameInfo
                            level={this.state.level}
                            placePicture={this.state.place.photo}
                            place={this.state.place.name}
                            maxPlayers={this.state.maxMissingPlayers}
                            creator={this.props.auth.name}
                            date={this.state.dateTime}
                            displayMode={true}
                            nbPlayers={this.state.players}/>

                        <Popup title="Game On !"
                               message="La partie est bien enregistrée !"
                               handleClose={this.redirectToSearchPage}
                               open={this.props.gameCreation.success}
                               cancelButton={false}/>

                        <Popup title="Oups ..."
                               message="Une erreur est survenue. Veuillez ré-essayer, ou contactez-nous !"
                               open={this.props.gameCreation.error}
                               handleClose={() => location.reload()}
                               cancelButton={false}/>

                    </div>);
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }

    render() {
        const {stepIndex} = this.state;

        return (
            <div className="CreateScreen">
                <NavBar location={this.props.location}
                        logout={this.props.authActions.logout}/>

                {this.props.id === null ?
                    (<LoginScreen/>)
                    :
                    ( <div style={{width: '100%', maxWidth: 1000, margin: 'auto'}}>
                        <Stepper linear={false} activeStep={stepIndex}>
                            <Step>
                                <StepLabel>
                                    Sélection du terrain
                                </StepLabel>
                            </Step>
                            <Step>
                                <StepLabel >
                                    Informations sur la partie
                                </StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>
                                    Qui joue ?
                                </StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>
                                    Vérification des informations
                                </StepLabel>
                            </Step>
                        </Stepper>

                        <Popup title="Connexion obligatoire"
                               message="Il faut vous connecter pour continuer !"
                               open={this.state.openPopup}
                               cancelButton={false}
                               handleClose={() => this.closePopup()}/>

                        <div className="step-nav-container">
                            <div>{this.getStepContent(stepIndex)}</div>
                            <div style={{marginTop: 12}}>
                                <FlatButton
                                    label="Précédent"
                                    disabled={stepIndex === 0 || this.props.gameCreation.inProgress || this.props.gameCreation.success}
                                    onTouchTap={() => this.handlePrev()}
                                    style={{marginRight: 12}}
                                />
                                <RaisedButton
                                    label={this.getNextButtonLabel()}
                                    hidden={stepIndex === 2}
                                    primary={true}
                                    onTouchTap={() => this.handleNext()}
                                    disabled={this.props.gameCreation.inProgress || this.props.gameCreation.success}
                                />
                            </div>
                        </div>
                    </div>)}
            </div>
        )
    }
}

export default withRouter(CreateScreen);

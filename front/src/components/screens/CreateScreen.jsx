import React, {Component}       from 'react';
import {withRouter}             from 'react-router'
import NavBar                   from '../navBar/NavBar';
import LoginScreen              from './../login/Login'
import GameInfo                 from '../search/GameInfo'
import Popup                    from '../popup/Popup'
import RaisedButton             from 'material-ui/RaisedButton';
import FlatButton               from 'material-ui/FlatButton';
import TextField                from 'material-ui/TextField';
import TimePicker               from 'material-ui/TimePicker';
import SelectField              from 'material-ui/SelectField';
import DatePicker               from 'material-ui/DatePicker';
import MenuItem                 from 'material-ui/MenuItem';
import {Row, Col}               from 'react-flexbox-grid';
import * as util                from '../../utils'
import areIntlLocalesSupported  from 'intl-locales-supported';
import {
    Card,
    CardActions,
    CardMedia,
    CardTitle, CardText
} from 'material-ui/Card';

import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';

import './CreateScreen.scss';

const propTypes = {};

const defaultProps = {
    places: []
};

const getDateTimeFormat = () => {
    /**
     * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
     */
    if (areIntlLocalesSupported(['fr', 'fa-IR'])) {
        return global.Intl.DateTimeFormat;
    } else {
        const IntlPolyfill = require('intl');
        require('intl/locale-data/jsonp/fr');
        require('intl/locale-data/jsonp/fa-IR');
        return IntlPolyfill.DateTimeFormat;
    }
};

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
            players: 1,
            error: {}
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
                id: this.props.auth.id,
                name: this.props.auth.name
            },
            players: []
        }
    };

    createGame = () => {
        if (this.props.auth.sessionValid) {
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
        if (!this.state.place.fronton_id) {
            this.setState({'error': {'place': 'Veuillez chercher puis sélectionner un fronton'}});
            return false;
        }
        else {
            this.resetErrorFor('place');
            return true;
        }
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

        if (!this.state.players) {
            this.setErrorMessageForKey('players', 'Veuillez indiquer quel le nombre de personnes déjà prévues pour cette partie');
            isFormValid = false;
        }
        else {
            this.resetErrorFor('players');
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

    searchPlaces = () => {
        if (this.state.searchedPlace.length < 3) {
            this.setState({'error': {'place': 'Veuillez taper au moins 3 caractères'}});
        }
        else {
            this.resetErrorFor('place');
            this.props.gamesActions.fetchPlaces(this.state.searchedPlace);
        }
    };

    handleSelectChange = stateKey => {
        return (event, index, value) => this.setState({[stateKey]: value});
    };


    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <div>
                        <Row>
                            <Col xs={12} sm={8} md={8} lg={8}>
                                <div className="place-filter-container">
                                    <TextField
                                        type="text"
                                        floatingLabelText="Rechercher un fronton"
                                        value={this.state.searchedPlace}
                                        onChange={this.handleChange.bind(this, 'searchedPlace')}
                                        errorText={this.state.error.place}
                                        onKeyPress={(e) => {if (e.key === 'Enter') this.searchPlaces()}}
                                    />
                                    <RaisedButton
                                        className="margin-left-l"
                                        label="Rechercher"
                                        primary={true}
                                        onTouchTap={this.searchPlaces.bind(this)}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <div className="card-container">
                                {
                                    this.props.places.map(place => {
                                        return <Card
                                            className={"card-place " + (this.state.place.fronton_id === place.fronton_id ? 'selected' : '')}
                                            key={place.fronton_id}
                                            onClick={() => this.setState({'place':place})}>
                                            <CardMedia>
                                                <img src={place.photo} alt="place_pic"/>
                                            </CardMedia>
                                            <CardTitle title={place.name} subtitle={util.mapPlaceType(place.type)}/>
                                            <CardText>{place.location.address}</CardText>
                                            <CardActions>
                                                <FlatButton label="Choisir ce fronton"/>
                                            </CardActions>
                                        </Card>;
                                    })
                                }
                            </div>

                        </Row>
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

                                    <MenuItem key={0} value={0} primaryText="Débutant"/>
                                    <MenuItem key={1} value={1} primaryText="Intermédiaire"/>
                                    <MenuItem key={2} value={2} primaryText="Bon"/>
                                    <MenuItem key={3} value={3} primaryText="Très bon"/>
                                    <MenuItem key={4} value={4} primaryText="Tout niveau accepté"/>

                                </SelectField>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={6} md={4}>
                                <DatePicker hintText="Date *"
                                            DateTimeFormat={getDateTimeFormat()}
                                            locale="fr"
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
                                    className="margin-left-l"
                                    type="number"
                                    floatingLabelText="Nombre de participants déjà prévus *"
                                    value={this.state.players}
                                    errorText={this.state.error.players}
                                    onChange={this.handleChange.bind(this, 'players')}/>
                            </div>
                        </Col>
                    </Row>
                );
            case 3:
                return (
                    <GameInfo
                        level={this.state.level}
                        placePicture={this.state.place.photo}
                        place={this.state.place.name}
                        maxPlayers={this.state.maxMissingPlayers}
                        creator={this.props.auth.name}
                        date={this.state.dateTime}
                        displayMode={true}
                        nbPlayers={this.state.players}
                    />);
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
                                    disabled={stepIndex === 0}
                                    onTouchTap={() => this.handlePrev()}
                                    style={{marginRight: 12}}
                                />
                                <RaisedButton
                                    label={this.getNextButtonLabel()}
                                    hidden={stepIndex === 2}
                                    primary={true}
                                    onTouchTap={() => this.handleNext()}
                                />
                            </div>
                        </div>
                    </div>)}
            </div>
        )
    }
}

CreateScreen.propTypes = propTypes;
CreateScreen.defaultProps = defaultProps;

export default withRouter(CreateScreen);

import React, {Component}   from 'react';
import {withRouter}         from 'react-router'
import NavBar               from '../navBar/NavBar';
import LoginScreen          from './../login/Login'
import RaisedButton         from 'material-ui/RaisedButton';
import FlatButton           from 'material-ui/FlatButton';
import TextField            from 'material-ui/TextField';
import TimePicker           from 'material-ui/TimePicker';
import SelectField          from 'material-ui/SelectField';
import DatePicker           from 'material-ui/DatePicker';
import MenuItem             from 'material-ui/MenuItem';
import {Row, Col}           from 'react-flexbox-grid';
import * as urls            from '../../constants/Urls';
import * as util            from '../../utils'
import areIntlLocalesSupported from 'intl-locales-supported';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';

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
            place: '',
            date: new Date(),
            level: '',
            maxMissingPlayers: 4,
            message: '',
            players: 1,
            error: {}
        };
    }

    componentDidMount() {
        this.props.authActions.getProfile();
    }

    createGame() {
        if (this.props.auth.sessionValid) {
            this.props.gamesActions.createGame(this.state);
        }
        else {
            window.location.href = urls.FACEBOOK_AUTH;
        }
    }

    checkFormAndCreate() {
        var isFormValid = true;

        isFormValid |= this.checkNumericInput('maxMissingPlayers');
        isFormValid |= this.checkNumericInput('players');

        if (isFormValid) {
            this.createGame();
        }
    }

    checkNumericInput(inputName) {
        if (!this.state[inputName] || this.state[inputName] < 0) {
            this.setValidationToError(inputName);
            return false;
        }
        else {
            this.resetValidation(inputName);
            return true;
        }
    }

    setValidationToError(inputName) {
        this.setState({validation: {[inputName]: 'error'}});
    }

    resetValidation(inputName) {
        this.setState({validation: {[inputName]: null}});
    }

    handleChange(inputName, e) {
        this.setState({[inputName]: e.target.value});
    }

    handleDateChange(e) {
        this.setState({'date': e.target.value});
    }

    handleTimeChange(e) {
        this.setState({'time': e.target.value});
    }

    handleNext() {
        const {stepIndex} = this.state;
        if (stepIndex < 3) {
            if (this.areInfoOK(stepIndex))
                this.setState({stepIndex: stepIndex + 1});
        }
        else {
            this.checkFormAndCreate();
        }
    }

    areInfoOK(stepIndex) {
        switch (stepIndex) {
            case 0:
                if (!this.state.place.fronton_id) {
                    this.setState({'error': {'place': 'Veuillez chercher puis sélectionner un fronton'}});
                    return false;
                }
                else {
                    this.setState({'error': {'place': null}});
                    return true;
                }
                break;
            case 1:
                break;
            case 2:
                break;
            default:
                return true;
        }
    }

    getNextButtonLabel() {
        const {stepIndex} = this.state;
        return stepIndex < 3 ? 'Suivant' : 'Créer la partie';
    }

    handlePrev() {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    }

    searchPlaces() {
        if (this.state.searchedPlace.length < 3) {
            this.setState({'error': {'place': 'Veuillez taper au moins 3 caractères'}});
        }
        else {
            this.setState({'error': {'place': null}});
            this.props.gamesActions.fetchPlaces(this.state.searchedPlace);
        }
    }

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
                                        onTouchTap={() => this.searchPlaces()}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <div className="card-container">
                                {
                                    this.props.places.map(place => {
                                        return <Card className={"card-place " + (this.state.place.fronton_id === place.fronton_id ? 'selected' : '')}
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
                                    onChange={this.handleChange.bind(this, 'level')}>
                                    <MenuItem value="0" primaryText="Débutant"/>
                                    <MenuItem value="1" primaryText="Intermédiaire"/>
                                    <MenuItem value="2" primaryText="Bon"/>
                                    <MenuItem value="3" primaryText="Très bon"/>
                                    <MenuItem value="4" primaryText="Tout niveau accepté"/>
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
                                            onChange={this.handleDateChange}/>

                                <TimePicker
                                    format="24hr"
                                    hintText="Heure *"
                                    cancelLabel="Annuler"
                                    value={this.state.time}
                                    onChange={this.handleTimeChange}/>
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
                                    onChange={this.handleChange.bind(this, 'maxMissingPlayers')}/>
                                <TextField
                                    className="margin-left-l"
                                    type="number"
                                    floatingLabelText="Nombre de participants déjà prévus *"
                                    value={this.state.players}
                                    onChange={this.handleChange.bind(this, 'players')}/>
                            </div>
                        </Col>
                    </Row>
                );
            case 3:
                return (<p>Vérification des infos</p>);
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }

    render() {
        const {stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};

        return (
            <div className="CreateScreen">
                <NavBar location={this.props.location}/>

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

                        <div style={contentStyle}>
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

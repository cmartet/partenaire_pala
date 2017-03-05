import React                from 'react';
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
import areIntlLocalesSupported from 'intl-locales-supported';
import {
    Step,
    Stepper,
    StepButton,
} from 'material-ui/Stepper';

import './CreateScreen.scss';

const propTypes = {};

const defaultProps = {
    places: []
};

const CreateScreen = React.createClass({

        componentDidMount(){
            this.props.gamesActions.fetchPlaces();
            this.props.authActions.getProfile();
        },

        getDateTimeFormat() {
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

        },

        getInitialState() {
            return {
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
                players: 1
            }
        },

        getValidationState() {
            if (this.props.place !== null) {
                const length = this.props.place.length;
                return (length >= 1) ? 'success' : 'error';
            }
        },

        createGame() {
            if (this.props.auth.sessionValid) {
                this.props.gamesActions.createGame(this.state);
            }
            else {
                window.location.href = urls.FACEBOOK_AUTH;
            }
        },

        checkFormAndCreate(){
            var isFormValid = true;

            isFormValid |= this.checkNumericInput('maxMissingPlayers');
            isFormValid |= this.checkNumericInput('players');

            if (isFormValid) {
                this.createGame();
            }
        },

        checkNumericInput(inputName) {
            if (!this.state[inputName] || this.state[inputName] < 0) {
                this.setValidationToError(inputName);
                return false;
            }
            else {
                this.resetValidation(inputName);
                return true;
            }
        },

        setValidationToError(inputName) {
            this.setState({validation: {[inputName]: 'error'}});
        },

        resetValidation(inputName) {
            this.setState({validation: {[inputName]: null}});
        },

        handleChange(inputName, e) {
            this.setState({[inputName]: e.target.value});
        },

        handleDateChange(e){
            this.setState({'date': e.target.value});
        },

        handleTimeChange(e){
            this.setState({'time': e.target.value});
        },

        handleNext() {
            const {stepIndex} = this.state;
            if (stepIndex < 3) {
                this.setState({stepIndex: stepIndex + 1});
            }
            else {
                this.checkFormAndCreate();
            }
        },

        getNextButtonLabel() {
            const {stepIndex} = this.state;
            return stepIndex < 3 ? 'Suivant' : 'Créer la partie';
        },

        handlePrev() {
            const {stepIndex} = this.state;
            if (stepIndex > 0) {
                this.setState({stepIndex: stepIndex - 1});
            }
        },

        getStepContent(stepIndex) {
            switch (stepIndex) {
                case 0:
                    return (
                        <Row>
                            <Col xs={12} sm={8} md={8} lg={8}>
                                <SelectField
                                    floatingLabelText="Lieu de la partie *"
                                    value={this.state.place}
                                    onChange={this.handleChange.bind(this, 'place')}>
                                    {
                                        this.props.places.map(function (p) {
                                            return <MenuItem value={p.name}
                                                             primaryText={p.name}/>;
                                        })
                                    }
                                </SelectField>
                            </Col>
                        </Row>);
                case 1:
                    return (<div>
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
                                            DateTimeFormat={this.getDateTimeFormat()}
                                            locale="fr"
                                            cancelLabel="Annuler"
                                            defaultDate={this.state.date}
                                            onChange={this.handleDatetimeChange}/>

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
                    </div>);
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
        },

        render()
        {
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
                                    <StepButton onClick={() => this.setState({stepIndex: 0})}>
                                        Sélection du terrain
                                    </StepButton>
                                </Step>
                                <Step>
                                    <StepButton onClick={() => this.setState({stepIndex: 1})}>
                                        Informations sur la partie
                                    </StepButton>
                                </Step>
                                <Step>
                                    <StepButton onClick={() => this.setState({stepIndex: 2})}>
                                        Qui joue ?
                                    </StepButton>
                                </Step>
                                <Step>
                                    <StepButton onClick={() => this.setState({stepIndex: 3})}>
                                        Vérification des informations
                                    </StepButton>
                                </Step>
                            </Stepper>

                            <div style={contentStyle}>
                                <div>{this.getStepContent(stepIndex)}</div>
                                <div style={{marginTop: 12}}>
                                    <FlatButton
                                        label="Précédent"
                                        disabled={stepIndex === 0}
                                        onTouchTap={this.handlePrev}
                                        style={{marginRight: 12}}
                                    />
                                    <RaisedButton
                                        label={this.getNextButtonLabel()}
                                        hidden={stepIndex === 2}
                                        primary={true}
                                        onTouchTap={this.handleNext}
                                    />
                                </div>
                            </div>
                        </div>)}
                </div>
            )
        }
    })
    ;

CreateScreen.propTypes = propTypes;
CreateScreen.defaultProps = defaultProps;

export default withRouter(CreateScreen);

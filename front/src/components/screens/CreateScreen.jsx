import React                from 'react';
import {withRouter}         from 'react-router'
import NavBar               from '../navBar/NavBar';
import LoginScreen          from './../login/Login'
import RaisedButton         from 'material-ui/RaisedButton';
import TextField            from 'material-ui/TextField';
import TimePicker           from 'material-ui/TimePicker';
import SelectField          from 'material-ui/SelectField';
import DatePicker           from 'material-ui/DatePicker';
import MenuItem             from 'material-ui/MenuItem';
import {Row, Col}           from 'react-flexbox-grid';
import * as urls            from '../../constants/Urls';
import areIntlLocalesSupported from 'intl-locales-supported';

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

    render () {
        return (
            <div className="CreateScreen">
                <NavBar location={this.props.location}/>

                {this.props.id === null ?
                    (<LoginScreen/>)
                    :
                    (<form>
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
                        </Row>

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

                        <Row>
                            <Col md={8}>
                                <RaisedButton
                                    primary={true}
                                    fullWidth={true}
                                    label="Créer"
                                    onClick={this.checkFormAndCreate}>
                                </RaisedButton>
                            </Col>
                        </Row>
                    </form>)}
            </div>
        )
    }
});

CreateScreen.propTypes = propTypes;
CreateScreen.defaultProps = defaultProps;

export default withRouter(CreateScreen);

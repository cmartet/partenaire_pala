import React from 'react';
import {withRouter} from 'react-router'
import NavBar from '../navBar/NavBar';
import LoginScreen from './../login/Login'
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Row} from 'react-bootstrap';
import DateTimePicker from '../datetimepicker/DateTimePicker'
import * as urls from '../../constants/Urls';

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
            // this.props.authActions.authenticateToFacebook();
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

    handleDatetimeChange(e){
        this.setState({'date': e.target.value});
    },

    render () {
        return (
            <div className="CreateScreen">
                <NavBar location={this.props.location}/>

                {this.props.id === null ?
                    (<LoginScreen/>)
                    :
                    (<Form>
                        <Row>
                            <Col xs={12} md={8}>
                                <FormGroup controlId="formControlsSelect">
                                    <ControlLabel>Lieu de la partie *</ControlLabel>
                                    <FormControl componentClass="select"
                                                 placeholder="select"
                                                 onChange={this.handleChange.bind(this, 'place')}>
                                        {
                                            this.props.places.map(function (p) {
                                                return <option key={p.name}
                                                               value={p.name}>{p.name}</option>;
                                            })
                                        }
                                    </FormControl>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <div className="inline-form">
                                    <FormGroup validationState={this.state.validation.maxMissingPlayers}>
                                        <ControlLabel>Nombre de participants maximum *</ControlLabel>
                                        <FormControl
                                            type="number"
                                            value={this.state.maxMissingPlayers}
                                            onChange={this.handleChange.bind(this, 'maxMissingPlayers')}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup validationState={this.state.validation.players}>
                                        <ControlLabel>Nombre de participants déjà prévus *</ControlLabel>
                                        <FormControl
                                            type="number"
                                            value={this.state.players}
                                            onChange={this.handleChange.bind(this, 'players')}
                                            required
                                        />
                                    </FormGroup>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <FormGroup controlId="formControlsSelect">
                                    <ControlLabel>Niveau moyen *</ControlLabel>
                                    <FormControl componentClass="select"
                                                 placeholder="Sélectionnez un niveau"
                                                 onChange={this.handleChange.bind(this, 'level')}>
                                        <option value="0">Débutant</option>
                                        <option value="1">Intermédiaire</option>
                                        <option value="2">Bon</option>
                                        <option value="3">Très bon</option>
                                        <option value="4">Tout niveau accepté</option>
                                    </FormControl>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={6} md={4}>
                                <FormGroup controlId="datetime">
                                    <ControlLabel>Date et heure *</ControlLabel>
                                    <DateTimePicker pickedValue={this.state.date}
                                                    onChange={this.handleDatetimeChange}/>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} md={8}>
                                <FormGroup controlId="description">
                                    <ControlLabel>Information complémentaire</ControlLabel>
                                    <FormControl componentClass="textarea"
                                                 placeholder="(facultatif)"
                                                 value={this.state.message}
                                                 onChange={this.handleChange.bind(this, 'message')}/>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={8}>
                                <Button bsSize="large"
                                        bsStyle="primary"
                                        block
                                        onClick={this.checkFormAndCreate}>
                                    Créer
                                </Button>
                            </Col>
                        </Row>
                    </Form>)}
            </div>
        )
    }
});

CreateScreen.propTypes = propTypes;
CreateScreen.defaultProps = defaultProps;

export default withRouter(CreateScreen);

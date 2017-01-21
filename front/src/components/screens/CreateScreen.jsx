import React from 'react';
import {withRouter} from 'react-router'
import NavBar from '../navBar/NavBar';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Row} from 'react-bootstrap';
import DateTimePicker from '../datetimepicker/DateTimePicker'

import './CreateScreen.scss';

const defaultProps = {
    places: []
};

const CreateScreen = React.createClass({

    componentDidMount(){
        this.props.gamesActions.fetchPlaces();
    },

    getInitialState () {
        return {
            place: ""
        };
    },

    getValidationState() {
        if (this.state.place !== null) {
            const length = this.state.place.length;
            if (length >= 1) return 'success';
            else if (length === 0) return 'error';
        }
    },

    checkFormAndCreate(){

    },

    handleChange(e) {
        this.setState({place: e.target.value});
    },

    render () {
        function FieldGroup({id, label, ...props}) {
            return (
                <FormGroup controlId={id}>
                    <ControlLabel>{label}</ControlLabel>
                    <FormControl {...props} />
                </FormGroup>
            );
        }

        return (
            <div className="CreateScreen">
                <NavBar location={this.props.location}/>
                <Form>
                    <Row>
                        <Col xs={12} md={8}>
                            <FormGroup controlId="formControlsSelect">
                                <ControlLabel>Lieu de la partie *</ControlLabel>
                                <FormControl componentClass="select" placeholder="select">
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
                                <FieldGroup
                                    type="number"
                                    label="Nombre de participants maximum *"
                                    placeholder="4"
                                />
                                <FieldGroup
                                    type="number"
                                    label="Nombre de participants déjà prévus *"
                                    placeholder="1"
                                />
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6} md={4}>
                            <FormGroup controlId="datetime">
                                <ControlLabel>Date et heure *</ControlLabel>
                                <DateTimePicker/>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={8}>
                            <FormGroup controlId="description">
                                <ControlLabel>Information complémentaire</ControlLabel>
                                <FormControl componentClass="textarea"
                                             onChange={this.handleChange}
                                             placeholder="(facultatif)"
                                             value={this.state.place}/>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={8}>
                            <Button bsSize="large"
                                    bsStyle="primary"
                                    block
                                    onClick={this.checkFormAndCreate()}>
                                Créer
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
});

CreateScreen.defaultProps = defaultProps;

export default withRouter(CreateScreen);

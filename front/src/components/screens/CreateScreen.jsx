import React from 'react';
import {withRouter} from 'react-router'
import NavBar from '../navBar/NavBar';
import {Button, ControlLabel, FieldGroup, FormControl, FormGroup} from 'react-bootstrap';

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
        if(this.state.place !== null) {
            const length = this.state.place.length;
            if (length >= 1) return 'success';
            else if (length === 0) return 'error';
        }
    },

    checkFormAndCreate(){

    },

    handleChange(e) {
        this.setState({ place: e.target.value });
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
                <form>
                    <FormGroup controlId="place">
                        <ControlLabel>Lieu</ControlLabel>
                        <FormControl type="text"
                                     onChange={this.handleChange}
                                     value={this.state.place}/>
                    </FormGroup>

                    <FieldGroup
                        type="text"
                        label="Nombre de participants maximum"
                        placeholder="4"
                    />
                    <FieldGroup
                        type="text"
                        label="Nombre de participants déjà prévus"
                        placeholder="1"
                    />
                    <FieldGroup
                        type="text"
                        label="Date et heure"
                        placeholder="lala"
                    />
                    <FieldGroup
                        type="text"
                        label="Information complémentaire"
                        placeholder="(facultatif)"
                    />

                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Select</ControlLabel>
                        <FormControl componentClass="select" placeholder="select">
                            {
                                this.props.places.map(function(place) {
                                    return <option key={place._id}
                                                   value={place.name}>{place.name}</option>;
                                })
                            }
                        </FormControl>
                    </FormGroup>

                    <Button onClick={this.checkFormAndCreate()}>
                        Créer
                    </Button>
                </form>
            </div>
        )
    }
});

CreateScreen.defaultProps = defaultProps;

export default withRouter(CreateScreen);

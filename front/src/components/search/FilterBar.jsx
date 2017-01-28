import React from 'react';
import DateTimePicker from '../datetimepicker/DateTimePicker'

import {
    Button,
    ButtonToolbar,
    DropdownButton,
    MenuItem,
    ControlLabel,
    Form,
    FormControl,
    FormGroup
} from 'react-bootstrap';

import './FilterBar.scss';

const propTypes = {
    changeFieldType: React.PropTypes.func,
    changePlace: React.PropTypes.func,
    changeDateTime: React.PropTypes.func,
    launchReseach: React.PropTypes.func
};

const FilterBar = React.createClass({

    render() {
        return (
            <div className="FilterBar">
                <Form inline className="search-form">
                    <FormGroup controlId="fieldType">

                        <ControlLabel>Type de terrain</ControlLabel>
                        <ButtonToolbar>
                            <DropdownButton title="Tout type de terrain"
                                            id="filedType"
                                            onChange={this.props.changeFieldType}>
                                <MenuItem eventKey="2">Fronton place libre</MenuItem>
                                <MenuItem eventKey="3">Fronton mur à gauche</MenuItem>
                                <MenuItem eventKey="4">Trinquet</MenuItem>
                            </DropdownButton>
                        </ButtonToolbar>
                    </FormGroup>
                    <FormGroup controlId="place">
                        <ControlLabel>Lieu</ControlLabel>
                        <FormControl type="text"
                                     placeholder="Ville, nom du terrain ..."
                                     onChange={this.props.changePlace}/>
                    </FormGroup>
                    <FormGroup controlId="datetime">
                        <ControlLabel>Date</ControlLabel>
                        <DateTimePicker pickedValue={null}
                                        onChange={this.props.changeDateTime}/>
                    </FormGroup>
                    <Button type="submit"
                            className="search-btn"
                            onClick={this.props.launchReseach}>
                        Rechercher
                    </Button>
                </Form>
            </div>
        )
    }
});

FilterBar.propsType = propTypes;

export default FilterBar;

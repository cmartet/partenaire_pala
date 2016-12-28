import React from 'react';
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

const FilterBar = React.createClass({
    render() {
        return (
            <div className="FilterBar">
                <Form inline className="search-form">
                    <FormGroup controlId="fieldType">
                        <ControlLabel>Type de terrain</ControlLabel>
                        <ButtonToolbar>
                            <DropdownButton title="Tout type de terrain" id="filedType">
                                <MenuItem eventKey="2">Fronton place libre</MenuItem>
                                <MenuItem eventKey="3">Fronton mur à gauche</MenuItem>
                                <MenuItem eventKey="4">Trinquet</MenuItem>
                            </DropdownButton>
                        </ButtonToolbar>
                    </FormGroup>
                    <FormGroup controlId="place">
                        <ControlLabel>Lieu</ControlLabel>
                        <FormControl type="text" placeholder="Ville"/>
                    </FormGroup>
                    <Button type="submit" className="search-btn">Rechercher</Button>
                </Form>
            </div>
        )
    }
});

export default FilterBar;

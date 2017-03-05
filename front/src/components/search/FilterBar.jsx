import React, {Component}   from 'react';
import SelectField          from 'material-ui/SelectField';
import MenuItem             from 'material-ui/MenuItem';
import RaisedButton         from 'material-ui/RaisedButton';
import TextField            from 'material-ui/TextField';

import './FilterBar.scss';

const propTypes = {
    changeFieldType: React.PropTypes.func,
    changePlace: React.PropTypes.func,
    changeDateTime: React.PropTypes.func,
    launchReseach: React.PropTypes.func
};

class FilterBar extends Component{

    render() {
        return (
            <div className="FilterBar">
                <form className="search-form">
                    <SelectField title="Tout type de terrain"
                                 id="filedType"
                                 floatingLabelText="Type de terrain"
                                 onChange={this.props.changeFieldType}>
                        <MenuItem value="2" primaryText="Fronton place libre"/>
                        <MenuItem value="3" primaryText="Fronton mur à gauche"/>
                        <MenuItem value="4" primaryText="Trinquet"/>
                    </SelectField>

                    <TextField
                        className="margin-left-l"
                        type="text"
                        floatingLabelText="Lieu"
                        hintText="Ville, nom du terrain ..."
                        onChange={this.props.changePlace}/>

                    <RaisedButton
                        className="margin-left-l"
                        primary={true}
                        label="Rechercher"
                        onClick={this.props.launchReseach}/>

                </form>
            </div>
        )
    }
}

FilterBar.propsType = propTypes;

export default FilterBar;

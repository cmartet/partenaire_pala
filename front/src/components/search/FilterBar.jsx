import React, {Component}   from 'react';
import DatePicker           from 'material-ui/DatePicker';
import MenuItem             from 'material-ui/MenuItem';
import PropTypes            from 'prop-types';
import RaisedButton         from 'material-ui/RaisedButton';
import SelectField          from 'material-ui/SelectField';
import TextField            from 'material-ui/TextField';
import * as gameData        from '../../constants/GameData.js';
import * as util            from '../../utils'

import './FilterBar.scss';

const propTypes = {
    changeFieldType: PropTypes.func,
    changePlace: PropTypes.func,
    changeDateTime: PropTypes.func,
    launchReseach: PropTypes.func
};

class FilterBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedFieldType: null
        }
    }

    onChangeFieldType = (event, index, value) => {
        this.props.changeFieldType(value);
        this.setState({'selectedFieldType': value});
    };

    render() {
        return (
            <div className="FilterBar">
                <h2>Filtrer les parties</h2>
                <form className="search-form">
                    <SelectField className="typefield-field"
                                 title="Tout type de terrain"
                                 id="filedType"
                                 floatingLabelText="Type de terrain"
                                 value={this.state.selectedFieldType}
                                 onChange={this.onChangeFieldType}>
                        <MenuItem value={gameData.FRONTON} primaryText="Fronton place libre"/>
                        <MenuItem value={gameData.MUR_GAUCHE} primaryText="Fronton mur à gauche"/>
                        <MenuItem value={gameData.TRINQUET} primaryText="Trinquet"/>
                    </SelectField>

                    <TextField className="place-field"
                               type="text"
                               floatingLabelText="Lieu"
                               hintText="Ville, nom du terrain ..."
                               onKeyPress={(e) => {if (e.key === 'Enter') this.props.launchReseach()}}
                               onChange={this.props.changePlace}/>


                    <DatePicker className="datepicker-field"
                            hintText="Date"
                                DateTimeFormat={util.getDateTimeFormat()}
                                locale="fr"
                                cancelLabel="Annuler"
                                autoOk={true}
                                onChange={this.props.changeDateTime}/>

                    <RaisedButton className="margin-left-l basque-theme green"
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

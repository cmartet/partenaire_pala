import React, {Component}   from 'react';
import ArrowDown            from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowUp              from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import DatePicker           from 'material-ui/DatePicker';
import FlatButton           from 'material-ui/FlatButton';
import IconButton           from 'material-ui/IconButton';
import PropTypes            from 'prop-types';
import RaisedButton         from 'material-ui/RaisedButton';
import TextField            from 'material-ui/TextField';
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
            selectedFieldType: null,
            displayFilters: false,
            place: '',
            date: null
        }
    }

    onChangeFieldType = (event, index, value) => {
        this.props.changeFieldType(value);
        this.setState({'selectedFieldType': value});
    };

    handleFilterDisplay = () => {
        this.setState({'displayFilters': !this.state.displayFilters})
    };

    resetFilters = () => {
        this.setState({place: '', date: undefined},
            () => {
                this.props.changePlace({target: {value: ''}});
                this.props.changeDateTime(undefined);

                this.props.launchReseach();
            });
    };

    changeDate = (evt, value) => {
        this.setState({date: value});
        this.props.changeDateTime(value);
    };

    changePlace = (evt) => {
        this.setState({place: evt.target.value});
        this.props.changePlace(evt);
    };

    render() {
        return (
            <div className="FilterBar">
                <div className="header" onClick={this.handleFilterDisplay}>
                    <IconButton>
                        {this.state.displayFilters ? <ArrowDown/> : <ArrowUp/>}
                    </IconButton>
                    <span className="filter-title">Filtrer les parties</span>
                </div>
                {this.state.displayFilters ?
                    <form className="search-form">

                        <TextField className="place-field"
                                   floatingLabelText="Ville, nom du terrain ..."
                                   onKeyPress={(e) => {if (e.key === 'Enter') this.props.launchReseach()}}
                                   value={this.state.place}
                                   onChange={this.changePlace}/>


                        <DatePicker className="datepicker-field"
                                    hintText="Date"
                                    DateTimeFormat={util.getDateTimeFormat()}
                                    locale="fr"
                                    cancelLabel="Annuler"
                                    autoOk={true}
                                    value={this.state.date}
                                    onChange={this.changeDate}/>

                        <RaisedButton className="margin-left-l basque-theme green"
                                      primary={true}
                                      label="Rechercher"
                                      onClick={this.props.launchReseach}/>

                        <FlatButton className="margin-left-l"
                                    label="Supprimer les filtres"
                                    onClick={this.resetFilters}/>

                    </form> : null }
            </div>
        )
    }
}

FilterBar.propsType = propTypes;

export default FilterBar;

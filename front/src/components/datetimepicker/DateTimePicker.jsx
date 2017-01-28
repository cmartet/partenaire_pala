import React from 'react';
import Datetime from 'react-datetime';

import './react-datetime.css';

const propTypes = {
    pickedValue: React.PropTypes.instanceOf(Date),
    onChange: React.PropTypes.func
};

const defaultProps = {
    pickedValue : new Date()
};

const DateTimePicker = React.createClass({

    render() {
        return (
            <Datetime
                locale="fr-fr"
                value={this.props.pickedValue}
                onChange={this.props.onChange}
                timeFormat="HH:mm"/>
        )
    }
});

DateTimePicker.propTypes = propTypes;
DateTimePicker.defaultProps = defaultProps;

export default DateTimePicker;

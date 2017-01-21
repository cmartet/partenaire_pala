import React from 'react';
import Datetime from 'react-datetime';

import './react-datetime.css';

const DateTimePicker = React.createClass({

    render() {
        return (
            <Datetime
                locale="fr-fr"
                timeFormat="HH:mm"/>
        )
    }
});

export default DateTimePicker;

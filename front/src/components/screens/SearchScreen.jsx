import React, {PropTypes} from 'react';
import {withRouter} from 'react-router'
import SearchBar from '../search/SearchBar'

const SearchScreen = React.createClass({

    render () {
        return (
            <SearchBar/>
        )
    }
});

export default withRouter(SearchScreen);

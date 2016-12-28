import React from 'react';
import {withRouter} from 'react-router'
import FilterBar from '../search/FilterBar'

import './SearchScreen.scss';

const SearchScreen = React.createClass({

    render () {
        return (
            <div>
                <div className="header">
                    <div className="brand">Partenaire Pala</div>
                    <div className="menu">
                        <div className="search">Rechercher une partie</div>
                        <div className="create">Proposer une partie</div>
                    </div>
                </div>
                <FilterBar/>
            </div>
        )
    }
});

export default withRouter(SearchScreen);

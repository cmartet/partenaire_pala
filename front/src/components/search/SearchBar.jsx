import React, {PropTypes} from 'react';

import './SearchBar.scss';

const SearchBar = React.createClass({
    render() {
        return (
            <div className="SearchBar">
                <h1>Ecran de recherche</h1>
               <input type="text"/>
            </div>
        )
    }
});

export default SearchBar;

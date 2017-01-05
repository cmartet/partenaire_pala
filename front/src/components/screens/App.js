import React, {Component} from 'react';
import Search from './SearchScreen'

import './App.scss';

class App extends Component {

    render() {
        return (
            <div className="App">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="../../animate.min.css"/>
                {this.props.children}
            </div>
        );
    }
}

export default App;

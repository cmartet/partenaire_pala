import React, {Component} from 'react';
import Search from './SearchScreen'

import './App.scss';

class App extends Component {

    getContent() {
        return this.props.children ? this.props.children : (<Search/>);
    }

    render() {
        return (
            <div className="App">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="../../animate.min.css"/>
                {this.getContent()}
            </div>
        );
    }
}

export default App;

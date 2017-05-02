import React, {Component}   from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
//import Footer               from '../footer/Footer';
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

import './App.scss';

class App extends Component {

    render() {
        return (
            <div className="App">
                <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet"/>
                <MuiThemeProvider>
                    {this.props.children}
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;

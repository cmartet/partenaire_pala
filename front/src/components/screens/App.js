import React, { Component } from 'react';
import Search from './SearchScreen'
import './App.scss';

class App extends Component {

  getContent(){
    return this.props.children ? this.props.children : (<Search/>);
  }

  render() {
    return (
      <div className="App">
        {this.getContent()}
      </div>
    );
  }
}

export default App;

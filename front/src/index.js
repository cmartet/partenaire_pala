import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/screens/App';
import Login from './components/screens/LoginScreen'
import InvalidRoute from './components/screens/InvalidRoute'
import { Router, Route, browserHistory } from 'react-router'

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="login" component={Login}/>
        </Route>
        <Route path="*" component={InvalidRoute}/>
    </Router>,
  document.getElementById('root')
);

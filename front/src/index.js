import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer.js';
import Login from './components/screens/LoginScreen'
import SearchScreen from './containers/SearchContainer'
import InvalidRoute from './components/screens/InvalidRoute'
import {Router, Route,IndexRoute, hashHistory} from 'react-router';
import configureStore from './store/configureStore.js';
import thunkMiddleware from 'redux-thunk';

import {Provider} from 'react-redux';

const store = configureStore({}, [thunkMiddleware]);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={AppContainer}>
                <IndexRoute component={SearchScreen}/>
                <Route path="login" component={Login}/>
            </Route>
            <Route path="*" component={InvalidRoute}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);

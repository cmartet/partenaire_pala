import React            from 'react';
import {Provider}       from 'react-redux';
import {
    Router,
    Route,
    IndexRoute,
    hashHistory
}                       from 'react-router';
import AppContainer     from './containers/AppContainer.js';
import AuthSuccess      from './components/screens/AuthSuccessScreen'
import CreateContainer  from './containers/CreateContainer'
import configureStore   from './store/configureStore.js';
import InvalidRoute     from './components/screens/InvalidRoute'
import LoginScreen      from './components/screens/LoginScreen'
import ReactDOM         from 'react-dom';
import SearchScreen     from './containers/SearchContainer'
import thunkMiddleware  from 'redux-thunk';

const store = configureStore({}, [thunkMiddleware]);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={AppContainer}>
                <IndexRoute component={SearchScreen}/>
                <Route path="create" component={CreateContainer}/>
                <Route path="login" component={LoginScreen}/>
                <Route path="authSuccess" component={AuthSuccess}/>
            </Route>
            <Route path="*" component={InvalidRoute}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);

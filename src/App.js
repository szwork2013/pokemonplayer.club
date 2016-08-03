import './common/common.scss'

import React from 'react'
import {render} from 'react-dom'

import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux';

import configureStore from './stores/configureStore';
import {Error, Home, Pokedex, Pokemap, DevTools} from './containers'

let initState = {};

// console.log(window.__REDUX_STATE__);
// if (window.__REDUX_STATE__) {
//     try {
//         initState = JSON.parse(unescape(__REDUX_STATE__))
//     } catch (exception) {
//         console.error(exception);
//     }
// }

// const user = Storage.get('user');
//
// initState = Object.assign({}, initState, {
//     auth: {
//         user: user,
//         loaded: user ? true : false,
//         logingIn: false,
//         logingInError: null
//     }
// });

const store = configureStore(initState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Home}/>
            <Route path="/pokedex" component={Pokedex}/>
            <Route path="/pokemap" component={Pokemap}/>
            <Route path="*" component={Home}/>
        </Router>
    </Provider>
), document.getElementById('reactRoot'));


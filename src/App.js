import './common/common.scss'

import React from 'react'
import {render} from 'react-dom'

import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux';

import configureStore from './stores/configureStore';
import {
    Error, Home, Pokedex, Pokemap, Calculator,
    Chatroom, Guide, Location, Message, Status,
    Donation, Settings, DevTools
} from './containers'

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

// window.socket = socketClient('http://127.0.0.1:2334');
// socket.on('test', function (data) {
//     console.log(data);
//     socket.emit('test', {my: 'data'});
// });

render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Home}/>
            <Route path="/pokedex" component={Pokedex}/>
            <Route path="/pokemap" component={Pokemap}/>
            <Route path="/calculator" component={Calculator}/>
            <Route path="/location" component={Location}/>
            <Route path="/guide" component={Guide}/>
            <Route path="/chatroom" component={Chatroom}/>
            <Route path="/status" component={Status}/>
            <Route path="/messages" component={Message}/>
            <Route path="/donation" component={Donation}/>
            <Route path="/settings" component={Settings}/>
            <Route path="*" component={Home}/>
        </Router>
    </Provider>
), document.getElementById('reactRoot'));

console.log(`Current Environment -> ${process.env.NODE_ENV}`);

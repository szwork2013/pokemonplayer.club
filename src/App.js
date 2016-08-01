import './common/common.scss'

import React from 'react'
import {render} from 'react-dom'

import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import {Error, Home, Pokedex} from './containers'

window.onload = function () {

    render((
        <Router history={browserHistory}>
            <Route path="/" component={Home}/>
            <Route path="/pokedex" component={Pokedex}/>
            <Route path="*" component={Home}/>
        </Router>
    ), document.getElementById('reactRoot'));
};

import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux';

import {Pokedex} from './Pokedex'
import {Donation} from './Donation'

export default combineReducers({
    Pokedex,
    Donation,
    routing: routerReducer
});

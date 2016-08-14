import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux';

import {Pokedex} from './Pokedex'
import {Donation} from './Donation'
import {Chat} from './Chat'

export default combineReducers({
    Pokedex,
    Donation,
    Chat,
    routing: routerReducer
});

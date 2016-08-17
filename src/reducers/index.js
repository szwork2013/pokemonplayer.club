import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux';

import {Pokedex} from './Pokedex'
import {Donation} from './Donation'
import {Chat} from './Chat'
import {Status} from './Status'

export default combineReducers({
    Pokedex,
    Donation,
    Chat,
    Status,
    routing: routerReducer
});

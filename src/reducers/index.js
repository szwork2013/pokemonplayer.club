import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux';

import {Pokedex} from './Pokedex'

export default combineReducers({
    Pokedex,
    routing: routerReducer
});

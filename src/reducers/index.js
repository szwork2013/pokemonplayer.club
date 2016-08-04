import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux';

import Pokedex from './Pokedex'
import PokedexTable from './PokedexTable'
import PokedexEggFilter from './PokedexEggFilter'
import PokedexTypeFilter from './PokedexTypeFilter'

export default combineReducers({
    Pokedex,
    PokedexTable,
    PokedexEggFilter,
    PokedexTypeFilter,
    routing: routerReducer
});

import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux';

import TestReducer from './TestReducer'

export default combineReducers({
    TestReducer,
    routing: routerReducer
});

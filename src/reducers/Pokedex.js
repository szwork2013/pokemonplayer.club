import {EGG_FILTER_2KM, EGG_FILTER_5KM, EGG_FILTER_10KM, EGG_FILTER_ALL} from '../actions/actions'

const Pokedex = (state = {}, action) => {

    if (action.type == 'Test') {
        console.log('!!!!!!!!!!!!!');
        console.log(action);
        console.log('!!!!!!!!!!!!!');
    }

    return state;
};

export default Pokedex

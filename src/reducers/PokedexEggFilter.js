import {EGG_FILTER_2KM, EGG_FILTER_5KM, EGG_FILTER_10KM, EGG_FILTER_ALL} from '../actions/actions'

const PokedexEggFilter = (state = {}, action) => {

    const EGG_FILTER = [EGG_FILTER_2KM, EGG_FILTER_5KM, EGG_FILTER_10KM, EGG_FILTER_ALL];

    if (-1 == EGG_FILTER.indexOf(action.type)) {
        return state;
    }

    let newData = action.data.map((item)=> {
        let distance = item['evolution-requirements']['egg-distance-to-hatch'];
        if (EGG_FILTER_ALL === action.type) {
            item.display = true;
        } else if (distance != action.type) {
            item.display = false;
        }
    });

    return [...state, {
        data: newData,
    }];
};

export default PokedexEggFilter

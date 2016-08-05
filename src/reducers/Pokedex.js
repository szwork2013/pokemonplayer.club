import {SET_POKEDEX_DATA, SET_EGG_FILTER, SORT_POKEDEX_DATA} from '../actions'

const initialState = [];
let isSorted = false;

export function Pokedex(state = initialState, action) {

    switch (action.type) {
        case SET_EGG_FILTER: {

            return state.map((item)=> {

                item.display = true;
                let eggDistanceToHatch = item['evolution-requirements']['egg-distance-to-hatch'];
                if ('ALL' !== action.filter.toUpperCase() && eggDistanceToHatch != action.filter) {
                    item.display = false;
                }

                return item;
            });
        }
        case SET_POKEDEX_DATA: {

            return action.data;
        }
        case SORT_POKEDEX_DATA: {

            let sortType = action.sortType;

            let newState = state.sort((a, b) => {

                if (isSorted) {
                    let temp = a;
                    a = b;
                    b = temp;
                }

                if (a[sortType] < b[sortType]) {
                    return 1;
                } else if (a[sortType] > b[sortType]) {
                    return -1;
                } else {
                    return 0;
                }
            });

            isSorted = !isSorted;

            return newState;
        }
        default: {
            return state
        }
    }
}

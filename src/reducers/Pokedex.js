import {SET_POKEDEX_DATA, SET_POKEDEX_FILTER, SORT_POKEDEX_DATA} from '../actions'

let initialState = [];
let isSorted = false;

export function Pokedex(state = initialState, action) {

    switch (action.type) {
        case SET_POKEDEX_FILTER: {

            let {filterType, filterValue} = action;
            if ('ALL' === filterType.toUpperCase()) {
                return initialState;
            }

            return state.filter((item)=> {

                if ('egg' == filterType) {
                    let eggDistanceToHatch = item['evolution-requirements']['egg-distance-to-hatch'];
                    return eggDistanceToHatch === filterValue
                } else if ('candy' == filterType) {
                    let candyToEvolve = String(item['evolution-requirements']['candy-to-evolve']);
                    return candyToEvolve === filterValue
                }
                return false;
            });
        }
        case SET_POKEDEX_DATA: {
            initialState = action.data;
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

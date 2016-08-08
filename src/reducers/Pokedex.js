import {SET_POKEDEX_DATA, SET_POKEDEX_FILTER, SORT_POKEDEX_DATA, SEARCH_POKEDEX_DATA} from '../actions'

let initialState = [];
let isSorted = false;
let filter = {
    egg: '',
    candy: '',
    type: [],
    reset() {
        this.egg = '';
        this.candy = '';
        this.type = [];
    }
};

export function Pokedex(state = initialState, action) {

    switch (action.type) {
        case SET_POKEDEX_FILTER: {

            let {filterType, filterValue} = action;
            if ('ALL' === filterType.toUpperCase()) {
                return initialState;
            }

            return initialState.filter((item)=> {

                let evolution = item['evolution-requirements'];

                if ('egg' == filterType) {
                    let eggDistanceToHatch = evolution['egg-distance-to-hatch'];
                    return eggDistanceToHatch === filterValue;
                } else if ('candy' == filterType) {
                    let candyToEvolve = String(evolution['candy-to-evolve']);
                    return candyToEvolve === filterValue;
                }
                return false;
            });
        }
        case SET_POKEDEX_DATA: {
            initialState = action.data;
            return action.data;
        }
        case SEARCH_POKEDEX_DATA: {

            // ID CN EN
            let search = action.search;
            return initialState.filter((item)=> {

                let id = String(item.id),
                    nameEn = item['name-en'],
                    nameCn = item['name-cn'];

                if (-1 != id.indexOf(search) || -1 != nameEn.indexOf(search) || -1 != nameCn.indexOf(search)) {
                    return true;
                }

                return false;
            });
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

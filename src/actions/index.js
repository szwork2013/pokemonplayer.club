export const SET_POKEDEX_DATA = 'SET_POKEDEX_DATA';
export const SET_POKEDEX_FILTER = 'SET_POKEDEX_FILTER';
export const SORT_POKEDEX_DATA = 'SORT_POKEDEX_DATA';

export function setPokedexData(data) {
    return {type: SET_POKEDEX_DATA, data};
}

export function setPokedexFilter(filterType, filterValue) {
    return {type: SET_POKEDEX_FILTER, filterType, filterValue}
}

export function sortPokedexData(sortType) {
    return {type: SORT_POKEDEX_DATA, sortType}
}

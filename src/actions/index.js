export const SET_POKEDEX_DATA = 'SET_POKEDEX_DATA';
export const SET_EGG_FILTER = 'EGG_FILTER';
export const SORT_POKEDEX_DATA = 'SORT_POKEDEX_DATA';

export function setPokedexData(data) {
    return {type: SET_POKEDEX_DATA, data};
}

export function setPokedexEggFilter(filter) {
    return {type: SET_EGG_FILTER, filter}
}

export function sortPokedexData(sortType) {
    return {type: SORT_POKEDEX_DATA, sortType}
}

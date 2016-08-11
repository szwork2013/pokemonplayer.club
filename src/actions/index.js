export const SET_POKEDEX_DATA = 'SET_POKEDEX_DATA';
export const SET_POKEDEX_FILTER = 'SET_POKEDEX_FILTER';
export const SORT_POKEDEX_DATA = 'SORT_POKEDEX_DATA';
export const SEARCH_POKEDEX_DATA = 'SEARCH_POKEDEX_DATA';

export function setPokedexData(data) {
    return {type: SET_POKEDEX_DATA, data};
}

export function setPokedexFilter(filterType, filterValue) {
    return {type: SET_POKEDEX_FILTER, filterType, filterValue}
}

export function sortPokedexData(sortType) {
    return {type: SORT_POKEDEX_DATA, sortType}
}

export function searchPokedexData(search) {
    return {type: SEARCH_POKEDEX_DATA, search}
}


export const SET_DONATION_DATA = 'SET_DONATION_DATA';

export function setDonationData(data) {
    return {type: SET_DONATION_DATA, data};
}

// Pokedex
export const SET_POKEDEX_DATA = 'SET_POKEDEX_DATA';
export const RESET_POKEDEX_DATA = 'RESET_POKEDEX_DATA';
export const SET_POKEDEX_FILTER = 'SET_POKEDEX_FILTER';
export const SORT_POKEDEX_DATA = 'SORT_POKEDEX_DATA';
export const SEARCH_POKEDEX_DATA = 'SEARCH_POKEDEX_DATA';

export function setPokedexData(data) {
    return {type: SET_POKEDEX_DATA, data};
}

export function resetPokedexData() {
    return {type: RESET_POKEDEX_DATA};
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

// Donation
export const SET_DONATION_DATA = 'SET_DONATION_DATA';

export function setDonationData(data) {
    return {type: SET_DONATION_DATA, data};
}

// Chat
export const FETCH_ALL_MESSAGE = 'FETCH_ALL_MESSAGE';
export const FETCH_ALL_MESSAGE_ACK = 'FETCH_ALL_MESSAGE_ACK';
export const NEW_MESSAGE = 'NEW_MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const REFRESH_MESSAGE = 'REFRESH_MESSAGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const JOIN_IN_CHATROOM = 'JOIN_IN_CHATROOM';
export const JOIN_IN_CHATROOM_ACK = 'JOIN_IN_CHATROOM_ACK';
export const SET_USERNAME = 'SET_USERNAME';

export function fetchAllMessage(socket) {
    return {type: FETCH_ALL_MESSAGE, socket}
}

export function fetchAllMessageAck(socket, data) {
    return {type: FETCH_ALL_MESSAGE_ACK, socket, data}
}

export function newMessage(socket, data) {
    return {type: NEW_MESSAGE, socket, data}
}

export function sendMessage(socket, data) {
    return {type: SEND_MESSAGE, socket, data}
}

export function refreshMessage(socket, data) {
    return {type: REFRESH_MESSAGE, socket, data}
}

export function receiveMessage(socket) {
    return {type: RECEIVE_MESSAGE, socket}
}

export function joinInChatroom(socket, username) {
    return {type: JOIN_IN_CHATROOM, socket, username}
}

export function joinInChatroomAck(socket, username, users) {
    return {type: JOIN_IN_CHATROOM_ACK, socket, username, users}
}

export function setUsername(username) {
    return {type: SET_USERNAME, username}
}
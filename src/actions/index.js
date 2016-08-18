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
export const NEW_MESSAGE = 'NEW_MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const FETCH_ALL_MESSAGE = 'FETCH_ALL_MESSAGE';
export const FETCH_ALL_MESSAGE_ACK = 'FETCH_ALL_MESSAGE_ACK';
export const JOIN_IN_CHATROOM = 'JOIN_IN_CHATROOM';
export const JOIN_IN_CHATROOM_ACK = 'JOIN_IN_CHATROOM_ACK';
export const LEAVE_CHATROOM = 'LEAVE_CHATROOM';
export const NEW_USER = 'NEW_USER';

export function newMessage(socket, message) {
    return {type: NEW_MESSAGE, socket, message}
}

export function sendMessage(socket, message, to) {
    return {type: SEND_MESSAGE, socket, message, to}
}

export function fetchAllMessage(socket) {
    return {type: FETCH_ALL_MESSAGE, socket}
}

export function fetchAllMessageAck(socket, messages) {
    return {type: FETCH_ALL_MESSAGE_ACK, socket, messages}
}

export function joinInChatroom(socket, username) {
    return {type: JOIN_IN_CHATROOM, socket, username}
}

export function joinInChatroomAck(socket, username, users) {
    return {type: JOIN_IN_CHATROOM_ACK, socket, username, users}
}

export function leaveChatroom(socket, username, users) {
    return {type: LEAVE_CHATROOM, socket, username, users}
}

export function newUser(socket, username) {
    return {type: NEW_USER, socket, username}
}

// Pokeserver
export const POKE_SERVER_STATUS = 'POKE_SERVER_STATUS';
export const REFRESH_POKE_SERVER_STATUS = 'REFRESH_POKE_SERVER_STATUS';
export const SEARCH_SERVER_STATUS = 'SEARCH_SERVER_STATUS';

export function refreshPokeserverStatus(status) {
    return {type: REFRESH_POKE_SERVER_STATUS, status}
}

export function searchServerStatus(search) {
    return {type: SEARCH_SERVER_STATUS, search}
}

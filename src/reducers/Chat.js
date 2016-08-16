import {
    NEW_MESSAGE,
    SEND_MESSAGE,
    REFRESH_MESSAGE,
    FETCH_ALL_MESSAGE,
    FETCH_ALL_MESSAGE_ACK,
    JOIN_IN_CHATROOM,
    JOIN_IN_CHATROOM_ACK
} from '../actions'

let initialState = {
    username: '',
    users: [],
    messages: []
};

export function Chat(state = initialState, action) {

    switch (action.type) {
        case JOIN_IN_CHATROOM: {
            action.socket.emit(JOIN_IN_CHATROOM, action.username);
            return state;
        }
        case JOIN_IN_CHATROOM_ACK: {
            state.username = action.username;
            state.users = action.users;
            return state;
        }
        case FETCH_ALL_MESSAGE: {
            action.socket.emit(FETCH_ALL_MESSAGE, action.data);
            return state;
        }
        case SEND_MESSAGE: {
            action.socket.emit(SEND_MESSAGE, action.data);
            return state;
        }
        case REFRESH_MESSAGE: {
            return state;
        }
        case NEW_MESSAGE: {
            return [...state, action.data];
        }
        case FETCH_ALL_MESSAGE_ACK: {
            return action.data;
        }
        default: {
            return state;
        }
    }
}

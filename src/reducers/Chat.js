import {NEW_MESSAGE, SEND_MESSAGE, REFRESH_MESSAGE, FETCH_ALL_MESSAGE, FETCH_ALL_MESSAGE_ACK} from '../actions'

export function Chat(state = [], action) {

    switch (action.type) {
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

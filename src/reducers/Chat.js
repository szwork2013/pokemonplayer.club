import {
    NEW_MESSAGE,
    SEND_MESSAGE,
    FETCH_ALL_MESSAGE,
    FETCH_ALL_MESSAGE_ACK,
    JOIN_IN_CHATROOM,
    JOIN_IN_CHATROOM_ACK,
    LEAVE_CHATROOM,
    NEW_USER
} from '../actions'

let initialState = {
    username: '',
    users: [],
    messages: []
};

export function Chat(state = initialState, action) {

    switch (action.type) {
        case NEW_MESSAGE: {
            state.messages.push(action.message);
            return Object.assign({}, state, {
                messages: state.messages
            });
        }
        case SEND_MESSAGE: {
            action.socket.emit(SEND_MESSAGE, {
                message: action.message
            });
            return state;
        }
        case FETCH_ALL_MESSAGE: {
            action.socket.emit(FETCH_ALL_MESSAGE);
            return state;
        }
        case FETCH_ALL_MESSAGE_ACK: {
            return Object.assign({}, state, {
                messages: action.messages
            })
        }
        case JOIN_IN_CHATROOM: {
            action.socket.emit(JOIN_IN_CHATROOM, {
                username: action.username
            });
            return state;
        }
        case JOIN_IN_CHATROOM_ACK: {
            return Object.assign({}, state, {
                username: action.username,
                users: action.users
            })
        }
        case LEAVE_CHATROOM: {
            return Object.assign({}, state, {
                users: action.users
            })
        }
        case NEW_USER: {
            state.users.push(action.username);
            return Object.assign({}, state, {
                users: state.users
            });
        }
        default: {
            return state;
        }
    }
}

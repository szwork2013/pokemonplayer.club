import {SEND_MESSAGE} from '../actions'

var messages = [];
var socket = socketClient('http://127.0.0.1:2334');
socket.on('message', function (data) {
    messages.push({
        id: messages.length - 1,
        data
    });
});

export function Chat(state = messages, action) {

    switch (action.type) {
        case SEND_MESSAGE: {
            socket.emit('message', action.data);
            return messages;
        }
        default: {
            return state
        }
    }
}

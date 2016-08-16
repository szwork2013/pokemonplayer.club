import './Chatroom.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    NEW_MESSAGE,
    SEND_MESSAGE,
    FETCH_ALL_MESSAGE,
    FETCH_ALL_MESSAGE_ACK,
    JOIN_IN_CHATROOM,
    JOIN_IN_CHATROOM_ACK,
    LEAVE_CHATROOM,
    NEW_USER
} from '../../actions'

import {
    newMessage,
    sendMessage,
    fetchAllMessage,
    fetchAllMessageAck,
    joinInChatroom,
    joinInChatroomAck,
    leaveChatroom,
    newUser
} from '../../actions'

import {Nav} from '../../components'

let socket = socketClient('/chatroom');

class Chatroom extends Component {

    constructor(props) {
        super(props);

        this.initial();
    }

    componentWillUnmount() {
        socket.removeAllListeners();
    }

    initial() {
        const {dispatch} = this.props;

        socket.on(NEW_MESSAGE, (data) => {
            dispatch(newMessage(socket, data));
            this.scrollToBottom(this.chatBodyBox);
        });

        dispatch(fetchAllMessage(socket));
        socket.on(FETCH_ALL_MESSAGE_ACK, (messages) => {
            dispatch(fetchAllMessageAck(socket, messages));
            this.scrollToBottom(this.chatBodyBox);
        });

        // success, username, users
        socket.on(JOIN_IN_CHATROOM_ACK, (data) => {
            const {success, error, username, users} = data;
            if (success) {
                dispatch(joinInChatroomAck(socket, username, users));
            } else {
                console.log(error);
                alert(error);
            }
        });

        socket.on(LEAVE_CHATROOM, (data) => {
            const {username, users} = data;
            dispatch(leaveChatroom(socket, username, users));
        });

        socket.on(NEW_USER, (data)=> {
            const {username} = data;
            dispatch(newUser(socket, username));
        });
    }

    scrollToBottom(el) {
        el.scrollTop = el.scrollHeight;
    }

    onKeyDownChatTextinput(event) {
        if (13 !== event.keyCode) { // KEY_ENTER = 13
            return;
        }

        this.sendMessage(event.target.value);
        event.target.value = '';
    }

    onClickSendMessage() {
        this.sendMessage(this.chatTextinput.value);
        this.chatTextinput.value = '';
    }

    sendMessage(value) {
        const {dispatch} = this.props;
        let message = value;
        dispatch(sendMessage(socket, message));

        setTimeout(()=> {
            this.scrollToBottom(this.chatBodyBox);
        }, 50);
    }

    onKeyDownUsernameTextinput(event) {
        if (13 !== event.keyCode) { // KEY_ENTER = 13
            return;
        }
        this.joinInChatroom(this.usernameTextinput.value.trim());
    }

    onClickJoinButton() {
        this.joinInChatroom(this.usernameTextinput.value.trim());
    }

    joinInChatroom(username) {

        if (!username) {
            return;
        }

        const {dispatch} = this.props;
        dispatch(joinInChatroom(socket, username));
    }

    joinInChatroomModal() {

        return (
            <div className="chatroom-modal">
                <div className="modal-backdrop in"></div>

                <div className="modal modal-open">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">设置聊天室昵称</h5>
                            </div>
                            <div className="modal-body">
                                <div className="textinput-box">
                                    <input id="username-textinput" className="username-textinput"
                                           placeholder="设置昵称（8个字符以内）" type="text"
                                           onKeyDown={this.onKeyDownUsernameTextinput.bind(this)}
                                           ref={(ref) => this.usernameTextinput = ref}/>
                                </div>
                                <a className="btn btn-block join" onClick={this.onClickJoinButton.bind(this)}>进入</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const {Chat} = this.props;
        const {messages, username} = Chat;

        return (
            <div className="container">
                <div className="chatroom-view">
                    <Nav/>

                    {!username && this.joinInChatroomModal()}

                    <div id='chat-body-box' className="chat-body-box" ref={(ref) => this.chatBodyBox = ref}>
                        {
                            messages.map((item, index) => {
                                return (<div key={index++}>{`${item.username}: ${item.message}`}</div>);
                            })
                        }
                    </div>

                    <div className="chat-textinput-box">
                        <input className="chat-textinput"
                               placeholder="发送消息" type="text"
                               ref={(ref) => this.chatTextinput = ref}
                               onKeyDown={this.onKeyDownChatTextinput.bind(this)}/>
                        <a className="btn btn-block" onClick={this.onClickSendMessage.bind(this)}>发送</a>
                    </div>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        Chat: state.Chat
    }
}

export default connect(mapStateToProps)(Chatroom)

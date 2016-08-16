import './Chatroom.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    FETCH_ALL_MESSAGE_ACK,
    REFRESH_MESSAGE,
    NEW_MESSAGE,
    RECEIVE_MESSAGE,
    JOIN_IN_CHATROOM,
    JOIN_IN_CHATROOM_ACK
} from '../../actions'
import {
    fetchAllMessage,
    fetchAllMessageAck,
    newMessage,
    sendMessage,
    refreshMessage,
    receiveMessage,
    joinInChatroom,
    joinInChatroomAck
} from '../../actions'
import {Nav} from '../../components'

let socket = socketClient();

class Chatroom extends Component {

    constructor(props) {
        super(props);

        this.initial();
    }

    componentDidMount() {
        this.$chatBodyBox = document.getElementById("chat-body-box");
    }

    initial() {
        const {dispatch} = this.props;

        // dispatch(fetchAllMessage(socket));
        // socket.on(FETCH_ALL_MESSAGE_ACK, (data) => {
        //     dispatch(fetchAllMessageAck(socket, data));
        //     this.scrollToBottom(this.$chatBodyBox);
        // });
        //
        // socket.on(NEW_MESSAGE, (data) => {
        //     dispatch(newMessage(socket, data));
        //     this.scrollToBottom(this.$chatBodyBox);
        // });
        //
        // socket.on(REFRESH_MESSAGE, (data) => {
        //     dispatch(refreshMessage(socket, data));
        // });

        socket.on(JOIN_IN_CHATROOM, (data) => {
            // dispatch(refreshMessage(socket, data));
        });

        // success, username, users
        socket.on(JOIN_IN_CHATROOM_ACK, (data) => {
            const {success, error, username, users} = data;
            if (success) {
                dispatch(joinInChatroomAck(socket, data));
            } else {
                alert(error);
            }
        });
    }

    scrollToBottom(el) {
        el.scrollTop = el.scrollHeight;
    }

    joinChatroomModal() {

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
                                    <input id="username-textinput"
                                           className="username-textinput"
                                           placeholder="设置昵称（8个字符以内）" type="text"/>
                                </div>
                                <a className="btn btn-block join" onClick={this.joinInChatroom.bind(this)}>进入</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    joinInChatroom(event) {

        let username = document.getElementById('username-textinput').value.trim();
        console.log(username);
        if (!username || username.length > 8) {
            return;
        }

        const {dispatch} = this.props;
        dispatch(joinInChatroom(socket, username));
    }

    onKeyDown(event) {

        // KEY_ENTER = 13
        if (13 !== event.keyCode) {
            return;
        }

        const {dispatch} = this.props;
        dispatch(sendMessage(socket, event.target.value));
        event.target.value = '';

        setTimeout(()=> {
            this.scrollToBottom(this.$chatBodyBox);
        }, 50);
    }

    sendMessage(event) {

    }

    render() {
        const {Chat} = this.props;
        const {messages, username} = Chat;

        console.log('RENDER...');
        console.log(username);
        console.log(messages);
        console.log('RENDER...');

        return (
            <div className="container">
                <div className="chatroom-view">
                    <Nav/>

                    {!username && this.joinChatroomModal()}

                    <div id='chat-body-box' className="chat-body-box">
                        {
                            messages.map((item, index) => {
                                return (<div key={index++}>{item}</div>);
                            })
                        }
                    </div>

                    <div className="chat-textinput-box">
                        <input className="chat-textinput"
                               placeholder="发送消息" type="text"
                               onKeyDown={this.onKeyDown.bind(this)}/>
                        <a className="btn btn-block" onClick={this.sendMessage.bind(this)}>发送</a>
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

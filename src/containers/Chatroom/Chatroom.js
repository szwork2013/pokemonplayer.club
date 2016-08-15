import './Chatroom.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {FETCH_ALL_MESSAGE_ACK, REFRESH_MESSAGE, NEW_MESSAGE, RECEIVE_MESSAGE} from '../../actions'
import {
    fetchAllMessage,
    fetchAllMessageAck,
    newMessage,
    sendMessage,
    refreshMessage,
    receiveMessage
} from '../../actions'
import {Nav} from '../../components'

let socket = socketClient('http://127.0.0.1:2334');

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

        dispatch(fetchAllMessage(socket));
        socket.on(FETCH_ALL_MESSAGE_ACK, (data) => {
            dispatch(fetchAllMessageAck(socket, data));
            this.scrollToBottom(this.$chatBodyBox);
        });

        socket.on(NEW_MESSAGE, (data) => {
            dispatch(newMessage(socket, data));
            this.scrollToBottom(this.$chatBodyBox);
        });

        socket.on(REFRESH_MESSAGE, (data) => {
            dispatch(refreshMessage(socket, data));
        });
    }

    scrollToBottom(el) {
        el.scrollTop = el.scrollHeight;
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

        return (
            <div className="container">
                <div className="chatroom-view">
                    <Nav/>

                    <div id='chat-body-box' className="chat-body-box">
                        {
                            Chat.map((item, index) => {
                                return (<div key={index++}>{item}</div>);
                            })
                        }
                    </div>

                    <div className="chat-textinput-box">
                        <input className="chat-textinput" placeholder="发送消息" type="text"
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

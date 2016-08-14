import './Chatroom.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {sendMessage} from '../../actions'
import {Nav} from '../../components'

class Chatroom extends Component {

    constructor(props) {
        super(props);
    }

    onKeyDown(event) {

        // KEY_ENTER = 13
        if (13 !== event.keyCode) {
            return;
        }

        const {dispatch} = this.props;
        dispatch(sendMessage(event.target.value));
    }

    render() {

        const {Chat} = this.props;

        return (
            <div className="container">
                <div className="chatroom-view">
                    <Nav/>

                    <div className="chat-body">
                        {
                            Chat.map((item) => {
                                return (<div key={item.id}>{item.data}</div>);
                            })
                        }
                    </div>

                    <div className="chat-textinput">
                        <input type="text" onKeyDown={this.onKeyDown.bind(this)}/>
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

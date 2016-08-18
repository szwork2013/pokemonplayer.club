import './Status.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {POKE_SERVER_STATUS, refreshPokeserverStatus} from '../../actions'
import {Nav} from '../../components'
import emojione from 'emojione'

import socketClient from 'socket.io-client'
let socket = socketClient('/pokeserver');

class Status extends Component {

    constructor(props) {
        super(props);

        this.initial();
    }

    initial() {
        const {dispatch} = this.props;

        socket.on(POKE_SERVER_STATUS, (status)=> {
            dispatch(refreshPokeserverStatus(status));
        });
    }

    componentWillUnmount() {
        socket.removeAllListeners();
    }

    render() {

        const {Status} = this.props;
        const GROUP_NUMBER = 5;
        let size = Status.length / GROUP_NUMBER;

        let StatusSlice = [];

        for (let index = 0; index < GROUP_NUMBER; index++) {
            StatusSlice[index] = Status.slice(size * index, size * (index + 1));
        }

        function createEmojiHtml(value) {
            return {__html: emojione.toImage(value)};
        }

        console.log(Status.length);
        console.log(StatusSlice);

        return (
            <div className="container">
                <div className="status-view">
                    <Nav/>
                    {
                        Status.map((item, index) => {
                            return (
                                <div key={index} className="status-item">
                                    <span className="name"
                                          dangerouslySetInnerHTML={createEmojiHtml(item.name)}/>
                                    <span className="time">{item.time ? `${item.time}` : "?"}</span>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        Status: state.Status
    }
}

export default connect(mapStateToProps)(Status)

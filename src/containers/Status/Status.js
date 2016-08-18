import './Status.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {POKE_SERVER_STATUS, refreshPokeserverStatus} from '../../actions'
import {Nav, Search} from '../../components'
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
        // const GROUP_NUMBER = 5;
        // let size = Status.length / GROUP_NUMBER;
        //
        // let StatusSlice = [];
        //
        // for (let index = 0; index < GROUP_NUMBER; index++) {
        //     StatusSlice[index] = Status.slice(size * index, size * (index + 1));
        // }

        function emojify(value) {
            // return (emojione.toImage(value));
            return {__html: emojione.toImage(value)};
        }

        return (
            <div className="container">
                <div className="status-view">
                    <Nav/>
                    <Search DataType="serverstatus"/>
                    <div className="status-box">
                        {
                            Status.map((item, index) => {
                                item.ping = item.ping ? item.ping : "?";

                                return (
                                    <div key={index} className="status-item">
                                        <div className="name-box">
                                            <div className="emoji"
                                                 dangerouslySetInnerHTML={emojify(item.emoji)}/>
                                            <div className="name">{item.name}</div>
                                        </div>
                                        <div className="ping">{item.ping}</div>
                                    </div>
                                );
                            })
                        }
                    </div>
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

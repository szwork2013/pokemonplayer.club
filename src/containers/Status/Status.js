import './Status.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {POKE_SERVER_STATUS, refreshPokeserverStatus} from '../../actions'
import {Nav} from '../../components'

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

        let size = Status.length / 5;

        let StatusSlice = [];

        for (let index = 0; index < 5; index++) {
            StatusSlice[index] = Status.slice(size * index, size * (index + 1));
        }

        console.log(Status.length);
        console.log(StatusSlice);

        return (
            <div className="container">
                <div className="status-view">
                    <Nav/>
                    {
                        StatusSlice.map((status, index) => {
                            return (
                                <ul key={index} className="status-list">
                                    {
                                        status.map((item, index) => {
                                            return (
                                                <li key={index} className="item">
                                                    <span className="name">{item.name}</span>
                                                    {/*<span className="time">{item.time ? `${item.time}` : "?"}</span>*/}
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
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

import './Chatroom.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Nav} from '../../components'

class Chatroom extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="chatroom-view">
                    <Nav/>
                </div>
            </div>
        );
    }

}

export default connect()(Chatroom)

import './Message.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Nav} from '../../components'

class Message extends Component {

    constructor(props) {
        super(props);


    }

    render() {
        return (
            <div className="container">
                <div className="message-view">
                    <Nav/>
                </div>
            </div>
        );
    }

}

export default connect()(Message)

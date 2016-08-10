import './Chatroom.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';

class Chatroom extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="chatroom-view">
                <iframe className="map" src="http://jp1.sunchaoran.com"></iframe>
            </div>
        );
    }

}

export default connect()(Chatroom)

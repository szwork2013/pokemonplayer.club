import './Location.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';

class Location extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="location-view">
            </div>
        );
    }

}

export default connect()(Location)

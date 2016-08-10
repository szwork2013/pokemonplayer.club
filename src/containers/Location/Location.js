import './Location.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Nav} from '../../components'

class Location extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="location-view">
                    <Nav/>
                </div>
            </div>
        );
    }

}

export default connect()(Location)

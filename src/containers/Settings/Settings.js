import './Settings.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Nav} from '../../components'

class Settings extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="settings-view">
                    <Nav/>
                </div>
            </div>
        );
    }

}

export default connect()(Settings)

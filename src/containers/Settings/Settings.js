import './Settings.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';

class Settings extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="settings-view">
            </div>
        );
    }

}

export default connect()(Settings)

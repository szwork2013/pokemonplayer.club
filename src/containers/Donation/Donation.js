import './Donation.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';

class Donation extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="donation-view">
            </div>
        );
    }

}

export default connect()(Donation)

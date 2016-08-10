import './Guide.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';

class Guide extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="guide-view">
            </div>
        );
    }

}

export default connect()(Guide)

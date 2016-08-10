import './Calculator.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';

class Calculator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="calculator-view">
            </div>
        );
    }

}

export default connect()(Calculator)

import './Calculator.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Nav} from '../../components'

class Calculator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="calculator-view">
                    <Nav/>
                </div>
            </div>
        );
    }

}

export default connect()(Calculator)

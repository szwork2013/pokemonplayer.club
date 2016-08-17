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
                    <div className="modal-backdrop in"></div>
                    <div className="modal modal-open">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">开发中</h5>
                                </div>
                                <div className="modal-body">
                                    <p>开发中...</p>
                                </div>
                                <div className="modal-footer">
                                    <a className="btn btn-block" href="/">返回</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default connect()(Calculator)

import './Guide.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Nav} from '../../components'

class Guide extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div className="container">
                <div className="guide-view">
                    <Nav/>
                </div>
            </div>
        );
    }

}

export default connect()(Guide)

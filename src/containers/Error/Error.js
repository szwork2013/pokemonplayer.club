import './Error.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';

class Error extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Error!!!!!
            </div>
        );
    }

}

export default connect()(Error)

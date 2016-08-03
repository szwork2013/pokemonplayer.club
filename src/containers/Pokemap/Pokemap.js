import './Pokemap.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';

class Pokemap extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="pokemap-view">
                <iframe className="map" src="http://jp1.sunchaoran.com"></iframe>
            </div>
        );
    }

}

export default connect()(Pokemap)

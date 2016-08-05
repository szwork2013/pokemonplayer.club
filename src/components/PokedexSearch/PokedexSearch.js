import './PokedexSearch.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';

class PokedexSearch extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="component-pokedex-search">
                <div className="header">搜索</div>
                <div className="search-box">
                    <input type="textinput"/>
                </div>
            </div>
        );
    }
}

export default connect()(PokedexSearch)

import './Search.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {searchPokedexData, searchServerStatus} from '../../actions'

class Search extends Component {

    constructor(props) {
        super(props);
    }

    onChangeInput(event) {
        const {dispatch, DataType} = this.props;
        let value = event.target.value;
        if ('pokedex' === DataType) {
            dispatch(searchPokedexData(value));
        } else if ('serverstatus' === DataType) {
            dispatch(searchServerStatus(value));
        }
    }

    render() {

        return (
            <div className="component-search">
                <div className="header">搜索</div>
                <div className="search-box">
                    <input type="text"
                           id="component-search"
                           placeholder={this.props.Placeholder}
                           onChange={this.onChangeInput.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default connect()(Search)

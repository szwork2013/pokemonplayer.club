import './PokedexSearch.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {searchPokedexData} from '../../actions'
// import {debounce} from '../../utils/CommonUtils'

class PokedexSearch extends Component {

    constructor(props) {
        super(props);

        // this.onChangeInput = debounce(this.onChangeInput, 500);
    }

    onChangeInput(event) {
        const {dispatch} = this.props;
        dispatch(searchPokedexData(event.target.value));
    }

    render() {
        return (
            <div className="component-pokedex-search">
                <div className="header">搜索</div>
                <div className="search-box">
                    <input type="textinput"
                           placeholder="ID/中文/英文"
                           onChange={this.onChangeInput.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

export default connect()(PokedexSearch)

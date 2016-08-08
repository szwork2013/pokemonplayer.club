import './PokedexReset.scss'

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {setPokedexFilter} from '../../actions'

class PokedexReset extends Component {

    constructor(props) {
        super(props);
    }

    onClickButton(event) {
        const {dispatch} = this.props;
        dispatch(setPokedexFilter('ALL', 'ALL'));
        var ele = document.getElementsByName("component-pokedex-filter");
        for (var i = 0; i < ele.length; i++) {
            ele[i].checked = false;
        }
    }

    render() {
        let {title} = this.props;

        return (
            <div className="component-pokedex-reset">
                <div className="header">
                    <div className="title">{title}</div>
                </div>
                <div className="button-box">
                    <input type="button"
                           className="button"
                           value="显示所有"
                           onClick={this.onClickButton.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        Pokedex: state.Pokedex
    }
}

export default connect(mapStateToProps)(PokedexReset)

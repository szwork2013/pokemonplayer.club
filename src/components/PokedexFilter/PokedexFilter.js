import './PokedexFilter.scss'

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {setPokedexFilter} from '../../actions'

class PokedexFilter extends Component {

    constructor(props) {
        super(props);
    }

    onChangeEgg(event) {
        const {dispatch, type} = this.props;
        let filterValue = event.currentTarget.getAttribute('value');
        let filterType = filterValue.toUpperCase() === 'ALL' ? 'ALL' : type;
        dispatch(setPokedexFilter(filterType, filterValue));
    }

    render() {
        let {type, data, title} = this.props;

        return (
            <div className="component-pokedex-filter">
                <div className="header">{title}</div>
                {data.map((item, index) => {
                    return (
                        <div key={index} className="radio">
                            <input type="radio"
                                   id={`${type}${item}`}
                                   name={`${type}-filter`}
                                   value={item}
                                   onChange={this.onChangeEgg.bind(this)}
                            />
                            <label htmlFor={`${type}${item}`}>{item.toUpperCase()}</label>
                        </div>
                    )
                })}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        Pokedex: state.Pokedex
    }
}

export default connect(mapStateToProps)(PokedexFilter)

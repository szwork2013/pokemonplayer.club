import './PokedexFilter.scss'

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {Switch} from '../../components'
import {setPokedexFilter} from '../../actions'

class PokedexFilter extends Component {

    constructor(props) {
        super(props);
    }

    onChangeRadio(event) {
        const {dispatch, type} = this.props;
        let filterValue = event.currentTarget.getAttribute('value');
        let filterType = filterValue.toUpperCase() === 'ALL' ? 'ALL' : type;
        dispatch(setPokedexFilter(filterType, filterValue));
    }

    render() {
        let {type, data, title} = this.props;

        return (
            <div className="component-pokedex-filter">
                <div className="header">
                    {/*<Switch/>*/}
                    <div className="title">{title}</div>
                </div>
                {
                    data.map((item, index) => {
                        return (
                            <div key={index} className="radio">
                                <input type="radio"
                                       id={`component-pokedex-filter-${item}`}
                                       name={`component-pokedex-filter`}
                                       value={item}
                                       onChange={this.onChangeRadio.bind(this)}
                                />
                                <label htmlFor={`component-pokedex-filter-${item}`}>{item.toUpperCase()}</label>
                            </div>
                        )
                    })
                }
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

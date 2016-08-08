import './PokedexEggFilter.scss'

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {setPokedexEggFilter} from '../../actions'

class PokedexEggFilter extends Component {

    constructor(props) {
        super(props);
    }

    onChangeEgg(event) {
        const {dispatch} = this.props;
        let value = event.currentTarget.getAttribute('value');
        dispatch(setPokedexEggFilter(value));
    }

    render() {
        let eggs = ['all', '2km', '5km', '10km'];
        let candy = ['12', '25', '50', '100', '400'];

        return (
            <div className="component-pokedex-egg-filter">
                <div className="header">孵蛋器</div>
                {eggs.map((item, index) => {
                    return (
                        <div key={index} className="radio">
                            <input type="radio"
                                   id={`egg${item}`}
                                   name="egg-filter"
                                   value={item}
                                   onChange={this.onChangeEgg.bind(this)}
                            />
                            <label htmlFor={`egg${item}`}>{item.toUpperCase()}</label>
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

export default connect(mapStateToProps)(PokedexEggFilter)

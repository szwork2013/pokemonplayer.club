import './PokedexEggFilter.scss'

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {EGG_FILTER_ALL, EGG_FILTER_2KM, EGG_FILTER_5KM, EGG_FILTER_10KM} from '../../actions/actions'

class PokedexEggFilter extends Component {

    constructor(props) {
        super(props);

        console.log('************');
        console.log(props.pokedexData);
        console.log('************');
    }

    onChangeEgg(event) {
        let value = event.currentTarget.getAttribute('value');
        let type = EGG_FILTER_ALL;
        const {dispatch} = this.props;

        if ('2km' == value) {
            type = EGG_FILTER_2KM;
        } else if ('5km' == value) {
            type = EGG_FILTER_5KM;
        } else if ('10km' == value) {
            type = EGG_FILTER_10KM;
        } else if ('all' == value) {
            type = EGG_FILTER_ALL;
        }

        console.log('************');
        console.log(this.props.pokedexData);
        console.log('************');

        dispatch({
            type: type,
            pokedexData: this.props.pokedexData
        });
    }

    render() {
        let eggs = ['all', '2km', '5km', '10km'];

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

PokedexEggFilter.propTypes = {
    pokedexData: React.PropTypes.array
};

function PokedexEggFilterData(state) {

    console.log('****!!!********');
    console.log(state.pokedexData);
    console.log('*******!!!*****');

    return {
        pokedexData: state.pokedexData
    }
}

export default connect(PokedexEggFilterData)(PokedexEggFilter)

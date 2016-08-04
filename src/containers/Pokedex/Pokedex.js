import './Pokedex.scss'

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {Nav, PokedexTable, PokedexTypeFilter, PokedexEggFilter} from '../../components'

import Ajax from '../../utils/AjaxUtil'

class Pokedex extends Component {

    constructor(props) {
        super(props);

        Ajax.GET('/data/pokedex', (err, data) => {
            let generationOne = data['generation-one'];
            const {dispatch} = this.props;

            dispatch({
                type: 'TEST',
                pokedexData: generationOne
            });
        });
    }

    render() {
        const {dispatch, pokedexData} = this.props;

        return (
            <div className="container">
                <div className="pokedex-view">

                    <Nav/>
                    <PokedexTypeFilter />
                    <PokedexEggFilter />
                    <PokedexTable pokedexData={pokedexData}/>
                </div>
            </div>
        );
    }
}

function PokedexData(state) {
    return {
        pokedexData: state.pokedexData
    }
}

export default connect(PokedexData)(Pokedex)

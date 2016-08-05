import './Pokedex.scss'

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {Nav, PokedexTable, PokedexTypeFilter, PokedexEggFilter} from '../../components'
import {setPokedexData} from '../../actions'

import Ajax from '../../utils/AjaxUtil'

class Pokedex extends Component {

    constructor(props) {
        super(props);
        const {dispatch} = this.props;

        Ajax.GET('/data/pokedex', (err, data) => {
            let generationOne = data['generation-one'];
            dispatch(setPokedexData(generationOne));
        });
    }

    render() {

        const {Pokedex} = this.props;

        return (
            <div className="container">
                <div className="pokedex-view">
                    <Nav/>
                    <PokedexTypeFilter/>
                    <PokedexEggFilter/>
                    <PokedexTable Pokedex={Pokedex}/>
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

export default connect(mapStateToProps)(Pokedex)

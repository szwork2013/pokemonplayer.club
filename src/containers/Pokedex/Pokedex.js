import './Pokedex.scss'

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {Nav, PokedexTable, PokedexSearch, PokedexTypeFilter, PokedexFilter} from '../../components'
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
                    <div className="group-box">
                        <PokedexFilter type="egg"
                                       title="孵蛋距离"
                                       data={['all', '2km', '5km', '10km']}/>
                        <PokedexFilter type="candy"
                                       title="进化糖果"
                                       data={['12', '25', '50', '100', '400']}/>
                        <PokedexSearch/>
                    </div>
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

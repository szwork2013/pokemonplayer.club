import './Pokedex.scss'

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {Nav, PokedexTable, PokedexSearch, PokedexTypeFilter, PokedexFilter, PokedexReset} from '../../components'
import {setPokedexData, resetPokedexData} from '../../actions'

import Ajax from '../../utils/AjaxUtil'

class Pokedex extends Component {

    constructor(props) {
        super(props);
        this.fetchData();
    }

    fetchData() {
        const {dispatch, Pokedex} = this.props;

        if (0 === Pokedex.length) {
            Ajax.GET('/data/pokedex', (err, data) => {
                let generationOne = data['generation-one'];
                dispatch(setPokedexData(generationOne));
            });
        } else {
            dispatch(resetPokedexData());
        }
    }

    render() {

        const {Pokedex} = this.props;

        return (
            <div className="container">
                <div className="pokedex-view">
                    <Nav/>
                    {/*<PokedexTypeFilter/>*/}
                    <div className="group-box">
                        <PokedexReset type="reset"
                                      title="重置"/>
                        <PokedexFilter type="egg"
                                       title="孵蛋距离"
                                       data={['2km', '5km', '10km']}/>
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

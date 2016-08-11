import './PokedexTable.scss'

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {sortPokedexData} from '../../actions'

import {PokedexModal} from '../../components'

class PokedexTable extends Component {

    constructor(props) {
        super(props);
    }

    clickHeader(event) {
        let type = event.currentTarget.getAttribute('value');
        this.sortData(type);
    }

    sortData(sortType) {
        const {dispatch} = this.props;
        dispatch(sortPokedexData(sortType));
        this.forceUpdate();
    }

    showDetails(item) {
        console.log(item);
    }

    render() {
        const {Pokedex} = this.props;

        return (
            <div>
                <PokedexModal base-attack="123"/>
                <table className="responsive-table component-pokedex-table">
                    <thead>
                    <tr>
                        <th className="id" value='id' onClick={this.clickHeader.bind(this)}>ID</th>
                        <th className="image">图鉴</th>
                        <th className="name-cn">中文</th>
                        <th className="name-jp">日文</th>
                        <th className="name-en" value='name-en' onClick={this.clickHeader.bind(this)}>英文</th>
                        <th className="evolution">进化</th>
                        <th className="egg">孵蛋</th>
                        <th className="max-cp" value='max-cp' onClick={this.clickHeader.bind(this)}>MAX-CP</th>
                        <th className="rating" value='rating' onClick={this.clickHeader.bind(this)}>评分</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        Pokedex.map((item) => {

                            let candyToEvolve = item['evolution-requirements']['candy-to-evolve'],
                                eggDistanceToHatch = item['evolution-requirements']['egg-distance-to-hatch'];

                            return (
                                <tr key={item.id} onClick={this.showDetails.bind(this, item)}>
                                    <td>{item.id}</td>
                                    <td className="pokedex-pic">
                                        <img src={require('../../icons/' + item.icon)} width={50}/>
                                    </td>
                                    <td>{item['name-cn']}</td>
                                    <td>{item['name-jp']}</td>
                                    <td>{item['name-en']}</td>
                                    <td>{candyToEvolve ? candyToEvolve : '-'}</td>
                                    <td>{eggDistanceToHatch ? eggDistanceToHatch : '-'}</td>
                                    <td>{item['max-cp']}</td>
                                    <td>{item['rating']} / 10</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        Pokedex: state.Pokedex
    }
}

export default connect(mapStateToProps)(PokedexTable)

import './PokedexTable.scss'

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {sortPokedexData} from '../../actions'

import {PokedexModal} from '../../components'

class PokedexTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
            pokemonModal: null
        }
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
        this.setState({
            isOpenModal: true,
            pokemonModal: item
        })
    }

    closeModal(event) {
        this.setState({
            isOpenModal: false,
        })
    }

    render() {
        const {Pokedex} = this.props;

        return (
            <div>
                {/*<PokedexModal onOpen={this.state.isOpenModal} onClose={this.closeModal.bind(this)}*/}
                              {/*pokemon={this.state.pokemonModal}/>*/}
                <table className="responsive-table component-pokedex-table">
                    <thead>
                    <tr>
                        <th className="id" value='id' onClick={this.clickHeader.bind(this)}>ID</th>
                        <th className="image">图鉴</th>
                        <th className="name-cn">中文</th>
                        <th className="name" value='name-en' onClick={this.clickHeader.bind(this)}>英文/日文</th>
                        <th className="evolution">进化</th>
                        <th className="egg">孵蛋</th>
                        <th className="max-cp" value='max-cp' onClick={this.clickHeader.bind(this)}>MAX-CP</th>
                        <th className="rating" value='rating' onClick={this.clickHeader.bind(this)}>
                            <i className="fa fa-star"></i>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        Pokedex.map((item) => {

                            let candyToEvolve = item['evolution-requirements']['candy-to-evolve'],
                                eggDistanceToHatch = item['evolution-requirements']['egg-distance-to-hatch'];

                            function setClassNameIfNull(item, className) {
                                if (!item) {
                                    return className;
                                } else {
                                    return '';
                                }
                            }

                            return (
                                <tr key={item.id} onClick={this.showDetails.bind(this, item)}>
                                    <td>#{item.id}</td>
                                    <td className="pokedex-pic">
                                        <img src={require('../../icons/' + item.icon)} width={50}/>
                                    </td>
                                    <td>{item['name-cn']} </td>
                                    <td>{item['name-en']} / {item['name-jp']}</td>
                                    <td className={setClassNameIfNull(candyToEvolve, 'hidden-lg-phone-down')}>{candyToEvolve ? candyToEvolve : '-'}</td>
                                    <td className={setClassNameIfNull(eggDistanceToHatch, 'hidden-lg-phone-down')}>{eggDistanceToHatch ? eggDistanceToHatch : '-'}</td>
                                    <td><i className="fa fa-bolt fa-fw hidden-pad-up"></i>{item['max-cp']}</td>
                                    <td><i className="fa fa-star fa-fw hidden-pad-up"></i>{item['rating']}</td>
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

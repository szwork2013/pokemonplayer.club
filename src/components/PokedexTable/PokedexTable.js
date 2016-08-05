import './PokedexTable.scss'

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {sortPokedexData} from '../../actions'

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

    render() {
        const {Pokedex} = this.props;

        return (
            <table className="responsive-table component-pokedex-table">
                <thead>
                <tr>
                    <th className="id" value='id' onClick={this.clickHeader.bind(this)}>ID</th>
                    <th>图鉴</th>
                    <th>中文</th>
                    <th>日文</th>
                    <th className="name-en" value='name-en' onClick={this.clickHeader.bind(this)}>英文</th>
                    <th className="max-cp" value='max-cp' onClick={this.clickHeader.bind(this)}>MAX-CP</th>
                    <th className="rating" value='rating' onClick={this.clickHeader.bind(this)}>评分</th>
                </tr>
                </thead>
                <tbody>
                {
                    Pokedex.map((item) => {

                        if (item.display) {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td className="pokedex-pic">
                                        <img src={require('../../icons/' + item.icon)} width={50}/>
                                    </td>
                                    <td>{item['name-cn']}</td>
                                    <td>{item['name-jp']}</td>
                                    <td>{item['name-en']}</td>
                                    <td>{item['max-cp']}</td>
                                    <td>{item['rating']} / 10</td>
                                </tr>
                            )
                        }
                    })
                }
                </tbody>
            </table>
        );
    }
}

function mapStateToProps(state) {
    return {
        Pokedex: state.Pokedex
    }
}

export default connect(mapStateToProps)(PokedexTable)

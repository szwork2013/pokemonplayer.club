import './PokedexTable.scss'

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

class PokedexTable extends Component {

    constructor(props) {
        super(props);
    }

    clickHeader(event) {
        let type = event.currentTarget.getAttribute('value');
        this.sortData(type);
    }

    sortData(type) {
        let data = this.state.pokedexData;

        data.sort((a, b) => {

            if (this.state.isSorted) {
                let temp = a;
                a = b;
                b = temp;
            }

            if (a[type] < b[type]) {
                return 1;
            } else if (a[type] > b[type]) {
                return -1;
            } else {
                return 0;
            }
        });

        this.setState({
            isSorted: !this.state.isSorted
        });
    }

    render() {
        // const {getState, dispatch, pokedexData} = this.props;
        // console.log(111);
        // console.log(pokedexData);
        // let pokedexData = this.state['pokedexData'];

        return (
            <table className="responsive-table pokedex-table">
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
                    this.props.pokedexData && this.props.pokedexData.map((item) => {
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

function PokedexData(state) {
    return {
        pokedexData: state.pokedexData
    }
}

export default connect(PokedexData)(PokedexTable)

import './Pokedex.scss'

import React, {Component} from 'react';

import {Link, Route, IndexRoute, browserHistory} from 'react-router'

import {Image} from '../../components/Image/Image'

import Ajax from '../../utils/AjaxUtil'

export class Pokedex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            generationOne: {},
            pokedexTableBody: ''
        };

        Ajax.GET('/data/pokedex', (err, data) => {
            this.setState({
                generationOne: data['generation-one']
            });
            this.generateRows();
        });
    }

    generateRows() {
        let data = this.state.generationOne;

        this.setState({
            pokedexTableBody: data.map((item) => {
                return (
                    <tr key={item.id}>
                        <td > {item.id} </td>
                        <td className="pokedex-pic">
                            {/*<Image src={require('../../images/pikachu.gif')} width={50} height={300} mode='fit'/>*/}
                            <img src={require('../../icons/' + item.icon)} width={50}/>
                        </td>
                        <td> {item['name-cn']} </td>
                        <td> {item['name-jp']} </td>
                        <td> {item['name-en']} </td>
                        <td>暂无</td>
                        <th>0 / 10</th>
                    </tr>
                )
            })
        });
    }

    render() {
        return (
            <div className="container">
                <div className="pokedex-view">
                    <table className="pokedex-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>图鉴</th>
                            <th>中文名</th>
                            <th>日文名</th>
                            <th>英文名</th>
                            <th>MAX-CP</th>
                            <th>评分</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.pokedexTableBody}
                        </tbody>
                    </table>

                    <button>
                        <Link to="/">返回</Link>
                    </button>
                </div>
            </div>
        );
    }
}

import './Pokedex.scss'

import React, {Component} from 'react';

import {Link} from 'react-router'

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
                        <td>{item.id}</td>
                        <td className="pokedex-pic">
                            <img src={require('../../icons/' + item.icon)} width={50}/>
                        </td>
                        <td className="hidden-lg-down">{item['name-cn']}</td>
                        <td className="hidden-lg-down">{item['name-jp']}</td>
                        <td>{item['name-en']}</td>
                        <td>{item['max-cp']}</td>
                        <th className="hidden-sm-down">{item['rating']} / 10</th>
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
                            <th className="hidden-lg-down">中文名</th>
                            <th className="hidden-lg-down">日文名</th>
                            <th>英文名</th>
                            <th>MAX-CP</th>
                            <th className="hidden-sm-down">评分</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.pokedexTableBody}
                        </tbody>
                    </table>

                    <Link to="/" className="back">返回</Link>
                </div>
            </div>
        );
    }
}

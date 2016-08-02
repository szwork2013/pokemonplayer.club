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
                        <td>{item['name-cn']}</td>
                        <td>{item['name-jp']}</td>
                        <td>{item['name-en']}</td>
                        <td>{item['max-cp']}</td>
                        <th>{item['rating']} / 10</th>
                    </tr>
                )
            })
        });
    }

    render() {
        return (
            <div className="container">
                <div className="pokedex-view">
                    <Link to="/" className="back">返回</Link>

                    <table className="responsive-table">
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
                </div>
            </div>
        );
    }
}

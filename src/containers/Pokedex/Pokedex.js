import './Pokedex.scss'

import React, {Component} from 'react';
import {Link} from 'react-router'
import {Nav} from '../../components'

import Ajax from '../../utils/AjaxUtil'

export class Pokedex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            generationOne: {},
            pokedexTableBody: '',
            isSorted: false
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
                        <td>{item['rating']} / 10</td>
                    </tr>
                )
            })
        });
    }

    sortDataByID() {
        this.sortData('id');
    }

    sortDataByName() {
        this.sortData('name-en');
    }

    sortDataByCP() {
        this.sortData('max-cp');
    }

    sortDataByRating() {
        this.sortData('rating');
    }

    sortData(type) {
        let data = this.state.generationOne;

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

        this.generateRows();
    }

    render() {
        return (
            <div className="container">
                <div className="pokedex-view">

                    {/* Top-Nav*/}
                    <Nav/>

                    <div className="type-filter">
                        <div className="filter-item">
                            <label className="tag bug-tag">BUG</label>
                        </div>
                        <div className="filter-item">
                            <label className="tag dark-tag">DARK</label>
                        </div>
                        <div className="filter-item">
                            <label className="tag dragon-tag">DRAGON</label>
                        </div>
                        <div className="filter-item">
                            <label className="tag electr-tag">ELECTR</label>
                        </div>
                        <div className="filter-item">
                            <label className="tag fairy-tag">FAIRY</label>
                        </div>
                        <div className="filter-item">
                            <label className="tag fight-tag">FIGHT</label>
                        </div>
                        <div className="filter-item">
                            <label className="tag fire-tag">FIRE</label>
                        </div>
                        <div className="filter-item">
                            <label className="tag flying-tag">FLYING</label>
                        </div>
                        <div className="filter-item">
                            <label className="tag ghost-tag">GHOST</label>
                        </div>
                        <div className="filter-item">
                            <label className="tag grass-tag">GRASS</label>
                        </div>
                        <div className="filter-item">
                            <label className="tag ground-tag">GROUND</label>
                        </div>
                        <div className="filter-item">
                            <label className="tag ice-tag">ICE</label>
                        </div>
                        <div className="filter-item">
                            <label className="tag normal-tag">NORMAL</label>
                        </div>
                        <div className="filter-item">
                            <label className="tag poison-tag">POISON</label>
                        </div>
                        <div className="filter-item">
                            <label className="tag psychc-tag">PSYCHC</label>
                        </div>
                        <div className="filter-item">
                            <label className="tag rock-tag">ROCK</label>
                        </div>
                        <div className="filter-item">
                            <label className="tag steel-tag">STEEL</label>
                        </div>
                        <div className="filter-item">
                            <label className="tag water-tag">WATER</label>
                        </div>
                    </div>

                    <table className="responsive-table">
                        <thead>
                        <tr>
                            <th className="sort-th" onClick={this.sortDataByID.bind(this)}>ID</th>
                            <th className="sort-th">图鉴</th>
                            <th>中文</th>
                            <th>日文</th>
                            <th className="sort-th" onClick={this.sortDataByName.bind(this)}>英文</th>
                            <th className="sort-th" onClick={this.sortDataByCP.bind(this)}>MAX-CP</th>
                            <th className="sort-th" onClick={this.sortDataByRating.bind(this)}>评分</th>
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

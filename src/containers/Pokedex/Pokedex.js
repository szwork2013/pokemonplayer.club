import './Pokedex.scss'

import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router'

import {Nav, PokeTypeFilter, PokeEggFilter} from '../../components'
import Ajax from '../../utils/AjaxUtil'

class Pokedex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            pokedexTableBody: '',
            isSorted: false
        };

        Ajax.GET('/data/pokedex', (err, data) => {
            this.setState({
                data: data['generation-one']
            });
            this.generateRows();
        });
    }

    generateRows() {
        let data = this.state.data;

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
        let data = this.state.data;

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

                    <Nav/>
                    <PokeTypeFilter/>
                    <PokeEggFilter/>

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

export default connect()(Pokedex)

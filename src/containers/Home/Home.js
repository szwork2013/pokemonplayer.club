import './Home.scss'

import React, {Component} from 'react';

import {Link, Route, IndexRoute, browserHistory} from 'react-router'

export class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="home-view">
                    <div className="title">Pokémon 玩家俱乐部</div>
                    <div className="pikachu"></div>
                    <div className="info">网站正在筹备中,敬请期待...</div>

                    <button>
                        <Link to="pokedex">图鉴</Link>
                    </button>
                </div>

                <div className="version">v0.1.0 dev</div>
            </div>
        );
    }
}

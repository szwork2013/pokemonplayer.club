import './Home.scss'

import React, {Component} from 'react';

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
                </div>

                <div className="version">v0.1.0 dev</div>
            </div>
        );
    }
}

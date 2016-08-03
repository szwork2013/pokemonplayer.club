import './Home.scss'

import React, {Component} from 'react';

import {Link, Route, IndexRoute, browserHistory} from 'react-router'

import {AppBlock} from '../../components'

export class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="website-title">Pokémon 玩家俱乐部</div>

                <div className="pikachu"></div>

                <div className="home-view">
                    <AppBlock path="pokedex" name="Pokédex" icon={require('../../images/podex-icon.png')}/>
                    <AppBlock path="pokemap" name="Pokémap" icon=""/>
                    <AppBlock path="pokemap" name="属性计算器" icon=""/>
                    <AppBlock path="pokemap" name="攻略" icon=""/>
                    <AppBlock path="donate" name="捐赠" icon=""/>
                </div>

                <div className="version">
                    <div>WeChat: ezsun724</div>
                    <div>Version: v0.1.0 dev</div>
                </div>
            </div>
        );
    }
}

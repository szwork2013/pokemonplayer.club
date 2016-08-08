import './Home.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {AppBlock} from '../../components'

class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="website-title">Pokémon 玩家俱乐部</div>

                <div className="pikachu"></div>

                <div className="home-view">
                    <AppBlock path="pokedex" name="图鉴" icon={require('../../images/podex-icon.png')}/>
                    <AppBlock path="pokemap" name="地图(暂时失效)" icon=""/>
                    <AppBlock path="calculator" name="属性计算器(开发中)" icon=""/>
                    <AppBlock path="guide" name="攻略(开发中)" icon=""/>
                    {/*<AppBlock path="donation" name="捐赠(开发中)" icon=""/>*/}
                </div>

                <div className="version">
                    <div>微信: ezsun724</div>
                    <div>{process.env.VERSION} {process.env.NODE_ENV}</div>
                </div>
            </div>
        );
    }
}

export default connect()(Home)

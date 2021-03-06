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
                    <AppBlock path="pokedex" name="图鉴" icon={require('../../images/icon-pokedex.png')}/>
                    <AppBlock path="pokemap" name="地图(关)" icon={require('../../images/icon-pokemap.png')}/>
                    <AppBlock path="calculator" name="属性计算器(开发中)" icon={require('../../images/icon-calculator.png')}/>
                    {/*<AppBlock path="location" name="稀有宝贝地点(开发中)" />*/}
                    {/*<AppBlock path="guide" name="攻略" icon={require('../../images/podex-icon.png')}/>*/}
                    <AppBlock path="chatroom" name="聊天室 Beta" />
                    <AppBlock path="status" name="状态" />
                    <AppBlock path="donation" name="捐助" />
                    {/*<AppBlock path="settings" name="设置" icon={require('../../images/podex-icon.png')}/>*/}
                </div>

                <div className="version">
                    {/*<div>微信: ezsun724</div>*/}
                    <div>{process.env.VERSION}</div>
                </div>
            </div>
        );
    }
}

export default connect()(Home)

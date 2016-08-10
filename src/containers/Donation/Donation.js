import './Donation.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Nav} from '../../components'

class Donation extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="donation-view">
                    <Nav/>
                    <div className="info">
                        <p>如果您喜欢这个网站，并且它真的对您有所帮助，您可以用 支付宝 或 微信 捐助的方式来支持我</p>
                        <p>（每次24小时我会更新一次捐助名单）</p>
                    </div>
                    <div className="qrcode-box">
                        <img src={require('../../images/donate-wechat-qrcode.png')}/>
                        <img src={require('../../images/donate-zhifubao-qrcode.png')}/>
                    </div>

                    <div className="table-box">
                        <table className="responsive-table">
                            <thead>
                            <tr>
                                <th>捐赠人</th>
                                <th>数额</th>
                            </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>

                    <div className="wechat">微信: ezsun724</div>
                </div>
            </div>
        );
    }

}

export default connect()(Donation)

import './Donation.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Nav} from '../../components'
import {setDonationData} from '../../actions'

import Ajax from '../../utils/AjaxUtil'

class Donation extends Component {

    constructor(props) {
        super(props);

        const {dispatch} = this.props;

        Ajax.GET('/data/donation', (err, data) => {
            let {donation} = data;
            dispatch(setDonationData(donation));
        });
    }

    render() {

        const {Donation} = this.props;

        return (
            <div className="container">
                <div className="donation-view">
                    <Nav/>
                    <div className="info">
                        <p>如果您喜欢这个网站，并且它真的对您有所帮助，您可以用 支付宝 或 微信 捐助的方式来支持我</p>
                        <p>（每次24小时我会更新一次捐助名单）</p>
                    </div>
                    <div className="qrcode-box">
                        <div>
                            <img src={require('../../images/donate-wechat-qrcode.png')}/>
                            <div className="type">微信</div>
                        </div>
                        <div>
                            <img src={require('../../images/donate-zhifubao-qrcode.png')}/>
                            <div className="type">支付宝</div>
                        </div>
                    </div>

                    <div className="table-box">
                        <table className="normal-table">
                            <thead>
                            <tr>
                                <th>捐赠人</th>
                                <th>金额</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                Donation.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.money} 元</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>

                    <div className="wechat">微信: ezsun724</div>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        Donation: state.Donation
    }
}

export default connect(mapStateToProps)(Donation)

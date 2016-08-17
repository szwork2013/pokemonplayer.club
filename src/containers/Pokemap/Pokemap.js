import './Pokemap.scss'

import {Nav} from '../../components'

import React, {Component} from 'react';
import {connect} from 'react-redux';


class Pokemap extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="pokemap-view">
                <Nav/>
                {/*<iframe className="map" src="http://jp1.sunchaoran.com"></iframe>*/}
                <div className="modal-backdrop in"></div>
                <div className="modal modal-open">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">抱歉</h5>
                            </div>
                            <div className="modal-body">
                                <p style={{margin: "30px"}}>由于 Niantic 禁掉了我所有的负责扫描地图的帐号, 在有更好的机制和方法之前,决定先关停地图功能。</p>
                            </div>
                            <div className="modal-footer">
                                <a className="btn btn-block" href="/">返回</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default connect()(Pokemap)

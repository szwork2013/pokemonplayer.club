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
                    <div className="pikachu"></div>
                    <div className="info">网站正在筹备中,敬请期待...</div>
                </div>
            </div>
        );
    }
}

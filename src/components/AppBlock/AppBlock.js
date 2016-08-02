import './AppBlock.scss'

import React, {Component} from 'react';

import {Link} from 'react-router'

export class AppBlock extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let {icon, path, name} = this.props;

        let background = {
            backgroundImage: `url("${icon}")`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
        };

        return (
            <div className="component-app-block">
                <Link to={path} style={background}></Link>
                <div className="name">{name}</div>
            </div>
        )
    }
}

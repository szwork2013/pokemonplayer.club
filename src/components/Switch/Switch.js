import './Switch.scss'

import React, {Component} from 'react';

export class Switch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.open ? props.open : false,
            sizeStyle: ''
        }
    }

    toggle(event) {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    _onMouseDown(event) {

        this.setState({
            _mouseDownTimer: setTimeout(() => {
                this.setState({
                    sizeStyle: 'bigger'
                });
            }, 150)
        });
    }

    _onMouseUp(event) {
        clearTimeout(this.state._mouseDownTimer);
        this.setState({
            sizeStyle: ''
        });
    }

    switchStyle() {
        return this.state.isOpen ? 'open' : 'close';
    }

    render() {
        return (
            <div className={`component-switch ${this.switchStyle()}`}
                 onMouseDown={this._onMouseDown.bind(this)}
                 onMouseUp={this._onMouseUp.bind(this)}
                 onClick={this.toggle.bind(this)}
                 style={{width: this.props.width}}>
                <div className={`switch-toggler ${this.state.sizeStyle}`}></div>
            </div>
        );
    }
}

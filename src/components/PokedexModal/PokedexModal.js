import './PokedexModal.scss'

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

class PokedexModal extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {
            type,
            ["base-attack"]: baseAttack,
            ["base-defense"]: baseDefense,
            ["base-tamina"]: baseStamina,
            ["weakness-resistance"]: weaknessResistance
        } = this.props;

        return (
            <div className="component-pokedex-modal">
                <div className="modal">
                    {type}
                    {baseAttack}
                    {baseDefense}
                    {baseStamina}
                </div>
            </div>
        );
    }
}

export default connect()(PokedexModal)

import './PokedexModal.scss'

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {Image} from '../../components'

class PokedexModal extends Component {

    constructor(props) {
        super(props);

        let {onOpen} = this.props;

        this.state = {
            isOpen: onOpen
        }
    }

    close(event) {
        this.props.onClose();
    }

    render() {

        let {onOpen} = this.props;

        if (!onOpen) {
            return (<div></div>);
        }

        // base
        let {
            id, type, icon, "max-cp": maxCp, "name-cn":nameCn, "name-jp":nameJp, "name-en":nameEn
        } = this.props.pokemon;

        // stats
        let {
            "max-theoretical-cp": maxTheoreticalCp,
            "base-attack": baseAttack, "base-defense": baseDefense, "base-stamina": baseStamina,
            "capture-rate": captureRate, "flee-rate": fleeRate
        } = this.props.pokemon.stats;

        // evolution-requirements
        let {
            "candy-to-evolve": candyToEvolve, "egg-distance-to-hatch": eggDistanceToHatch
        } = this.props.pokemon['evolution-requirements'];

        //weakness-resistance
        let {
            bug, dark, dragon, electr, fairy, fight, fire, flying,
            ghost, grass, ground, ice, normal, posion, psychc, rock, steel, water
        } = this.props.pokemon['weakness-resistance'];

        return (
            <div id="component-pokedex-modal"
                 className="component-pokedex-modal">

                <div className="modal-backdrop in"></div>

                <div className="modal modal-open">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="close" onClick={this.close.bind(this)}>
                                    <i className="fa fa-close fa-2x"></i>
                                </div>

                                <h4 className="modal-title">{nameCn} / {nameJp} / {nameEn}</h4>
                                <h5 className="modal-title">NO. {id}</h5>
                            </div>
                            <div className="modal-body">

                                <div className="image">
                                    <Image src={require('../../icons/' + icon)} width={100}/>
                                </div>

                                <div className="base-states">
                                    <div>
                                        <div>xxx</div>
                                        <div>类型</div>
                                    </div>
                                    <div>
                                        <div>xxx</div>
                                        <div>体重</div>
                                    </div>
                                    <div>
                                        <div>xxx</div>
                                        <div>身高</div>
                                    </div>
                                </div>
                                {/*Pokemon Stats*/}
                                <table className="stats">
                                    <tbody>
                                    <tr>
                                        <td>最大CP</td>
                                        <td>{maxCp}</td>
                                    </tr>
                                    <tr>
                                        <td>攻击</td>
                                        <td>{baseAttack}</td>
                                    </tr>
                                    <tr>
                                        <td>防御</td>
                                        <td>{baseDefense}</td>
                                    </tr>
                                    <tr>
                                        <td>耐力</td>
                                        <td>{baseStamina}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                {/*Pokemon Weakness/Resistance Chart*/}
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(PokedexModal)

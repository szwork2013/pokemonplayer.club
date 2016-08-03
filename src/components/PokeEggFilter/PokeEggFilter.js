import './PokeEggFilter.scss'

import React, {Component} from 'react';

export class PokeEggFilter extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="component-egg-filter">
                <div className="header">孵蛋器</div>
                <div className="radio">
                    <input type="radio" id="eggAll" name="egg-filter" value='all'/>
                    <label htmlFor="eggAll">ALL</label>
                </div>
                <div className="radio">
                    <input type="radio" id="egg2km" name="egg-filter" value='2km'/>
                    <label htmlFor="egg2km">2km</label>
                </div>
                <div className="radio">
                    <input type="radio" id="egg5km" name="egg-filter" value='5km'/>
                    <label htmlFor="egg5km">5km</label>
                </div>
                <div className="radio">
                    <input type="radio" id="egg10km" name="egg-filter" value='10km'/>
                    <label htmlFor="egg10km">10km</label>
                </div>
            </div>
        );
    }
}

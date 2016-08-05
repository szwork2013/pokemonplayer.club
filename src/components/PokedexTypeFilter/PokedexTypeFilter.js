import './PokedexTypeFilter.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';

class PokedexTypeFilter extends Component {

    constructor(props) {
        super(props);
    }

    generateTags() {
        let tags = ['bug', 'dark', 'dragon', 'electr', 'fairy', 'fight',
            'fire', 'flying', 'ghost', 'grass', 'ground', 'ice',
            'normal', 'poison', 'psychc', 'rock', 'steel', 'water'];

        return tags.map((tag) => {
            return (
                <div key={tag} className="item">
                    <label className={"tag " + tag + "-tag"}>{tag.toUpperCase()}</label>
                </div>
            )
        })
    }

    render() {
        let tags = ['bug', 'dark', 'dragon', 'electr', 'fairy', 'fight',
            'fire', 'flying', 'ghost', 'grass', 'ground', 'ice',
            'normal', 'poison', 'psychc', 'rock', 'steel', 'water'];

        return (
            <div className="component-pokedex-type-filter">
                <div className="header">类型过滤器</div>
                <div className="tags">
                    {
                        tags.map((tag) => {
                            return (
                                <div key={tag} className="item">
                                    <label className={"tag " + tag + "-tag"}>{tag.toUpperCase()}</label>
                                </div>
                            )
                        })}
                </div>
            </div>
        );
    }
}

export default connect()(PokedexTypeFilter)

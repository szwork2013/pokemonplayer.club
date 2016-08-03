import './PokeTypeFilter.scss'

import React, {Component} from 'react';

export class PokeTypeFilter extends Component {

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
        let tagsComponent = this.generateTags();

        return (
            <div className="component-type-filter">
                <div className="header">类型过滤器</div>
                <div className="tags">
                    {tagsComponent}
                </div>
            </div>
        );
    }
}

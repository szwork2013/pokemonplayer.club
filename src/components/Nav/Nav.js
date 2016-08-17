import './Nav.scss'

import React, {Component} from 'react';
import {Link} from 'react-router'

export class Nav extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="component-navbar">
                {/*<Link to='/' className="brand">Pokémon 玩家俱乐部</Link>*/}

                <ul className="nav">
                    <li className="item">
                        <Link to='/' className="link">返回</Link>
                    </li>
                    {/*<li className="item">*/}
                        {/*<Link to='/pokedex' className="link">Pokédex</Link>*/}
                    {/*</li>*/}
                    {/*<li className="item">*/}
                        {/*<Link to='/' className="link">Pokémap</Link>*/}
                    {/*</li>*/}
                    {/*<li className="item">*/}
                        {/*<Link to='/' className="link"></Link>*/}
                    {/*</li>*/}
                </ul>
            </nav>
        )
    }
}

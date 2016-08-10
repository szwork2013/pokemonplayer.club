import './Message.scss'

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Nav, PokedexTable, PokedexSearch, PokedexTypeFilter, PokedexFilter, PokedexReset} from '../../components'

class Message extends Component {

    constructor(props) {
        super(props);


    }

    duoshuo() {
        global.duoshuoQuery = {short_name: "pokemonplayer"};
        (function () {
            var ds = document.createElement('script');
            ds.type = 'text/javascript';
            ds.async = true;
            ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
            ds.charset = 'UTF-8';
            (document.getElementsByTagName('head')[0]
            || document.getElementsByTagName('body')[0]).appendChild(ds);
        })();
    }

    render() {
        return (
            <div className="container">

                <div className="message-view">
                    <Nav/>
                    <div className="ds-thread"
                         data-thread-key="message"
                         data-title="message"
                         data-url="message"></div>
                    <script type="text/javascript">
                        {this.duoshuo()}
                    </script>
                </div>
            </div>
        );
    }

}

export default connect()(Message)

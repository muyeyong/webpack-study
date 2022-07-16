'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './search.css'

class Search extends React.Component {

    render() {
        return <div className="search">
            搜索文字的内容
        </div>;
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
);
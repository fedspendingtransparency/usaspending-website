/**
 * SearchOption.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';

export default class SearchOption extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="search-option">
                {this.props.name}
            </div>
        );
    }
}

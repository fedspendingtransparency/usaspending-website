/**
 * SearchOption.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';
import SearchBox from '../sharedComponents/SearchBox.jsx';

export default class SearchOption extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="search-option">
                {this.props.name == 'Keywords' ? <SearchBox /> : <label>{this.props.name}</label>}
            </div>
        );
    }
}

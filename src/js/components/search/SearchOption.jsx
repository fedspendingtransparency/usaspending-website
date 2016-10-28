/**
 * SearchOption.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';
import SearchBox from '../sharedComponents/SearchBox';

const propTypes = {
    name: React.PropTypes.string
};

export default class SearchOption extends React.Component {
    render() {
        return (
            <div className="search-option">
                {this.props.name === 'Keywords' ? <SearchBox /> : <label>{this.props.name}</label>}
            </div>
        );
    }
}

SearchOption.propTypes = propTypes;

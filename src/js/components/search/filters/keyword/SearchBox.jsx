/**
 * SearchBox.jsx
 * Created by Emily Gullo 10/18/2016
 **/

import React from 'react';

const propTypes = {
    showFilter: React.PropTypes.bool
};

export default class SearchBox extends React.Component {

    render() {
        if (this.props.showFilter === false) {
            return false;
        }
        return (
            <div className="keyword-filter search-filter">
                <div>
                    <input id="search" type="text" className="" />
                </div>
            </div>
        );
    }
}
SearchBox.propTypes = propTypes;

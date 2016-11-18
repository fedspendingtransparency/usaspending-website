/**
 * SearchBox.jsx
 * Created by Emily Gullo 10/18/2016
 **/

import React from 'react';
import FilterExpandButton from '../../FilterExpandButton';

const propTypes = {
    toggleFilter: React.PropTypes.func,
    hideArrow: React.PropTypes.bool,
    arrowState: React.PropTypes.string,
    showFilter: React.PropTypes.bool
};

export default class SearchBox extends React.Component {

    render() {
        let searchContents = null;
        if (this.props.showFilter === true) {
            searchContents = (<div>
                <input id="search" type="text" className="" />
            </div>);
        }
        return (
            <div className="award-type-filter search-filter">
                <FilterExpandButton
                    hidden={this.props.hideArrow}
                    toggleFilter={this.props.toggleFilter}
                    arrowState={this.props.arrowState} />
                <h6 className="filter-header">Search</h6>
                {searchContents}
            </div>
        );
    }
}
SearchBox.propTypes = propTypes;

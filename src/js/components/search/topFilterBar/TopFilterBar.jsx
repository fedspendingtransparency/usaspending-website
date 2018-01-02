/**
  * TopFilterBar.jsx
  * Created by Kevin Li 12/13/16
  *
  * TopFilterBar is a React component that creates the sticky filter bar at the top of the search
  * results page. It receives parsed filter groups from its parent Redux container.
  *
  * @extends React.Component
  **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    filters: PropTypes.array,
    filterCount: PropTypes.number,
    groupGenerator: PropTypes.func
};

const TopFilterBar = (props) => {
    const filters = props.filters.map((filter) =>
        props.groupGenerator({
            filter,
            redux: props
        }));

    let filterBarHeader = `${props.filterCount} Active Filter`;
    if (props.filterCount !== 1) {
        filterBarHeader += 's';
    }
    filterBarHeader += ':';

    return (
        <div>
            <div className="search-top-filter-bar">
                <div className="search-top-filter-header">
                    <div className="header-title">
                        {filterBarHeader}
                    </div>
                </div>
                <div className="search-top-filters">
                    <div className="search-top-filters-content">
                        {filters}
                    </div>
                </div>
            </div>
        </div>
    );
};

TopFilterBar.propTypes = propTypes;

export default TopFilterBar;

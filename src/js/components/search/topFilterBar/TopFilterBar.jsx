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
            <div
                className="search-top-filter-bar"
                role="complementary"
                aria-label="Currently applied search filters">
                <div className="search-top-filter-header">
                    <h2
                        className="header-title"
                        id="top-filter-bar-title">
                        {filterBarHeader}
                    </h2>
                </div>
                <div className="search-top-filters">
                    <div
                        className="search-top-filters-content"
                        role="list">
                        {filters}
                    </div>
                </div>
            </div>
        </div>
    );
};

TopFilterBar.propTypes = propTypes;

export default TopFilterBar;

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

import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    filters: PropTypes.array,
    filterCount: PropTypes.number,
    clearAllFilters: PropTypes.func,
    groupGenerator: PropTypes.func
};

export default class TopFilterBar extends React.Component {
    constructor(props) {
        super(props);

        this.pressedClearAll = this.pressedClearAll.bind(this);
    }


    pressedClearAll() {
        this.props.clearAllFilters();
    }

    render() {
        const filters = this.props.filters.map((filter) =>
            this.props.groupGenerator({
                filter,
                redux: this.props
            }));

        let filterBarHeader = `${this.props.filterCount} Current Filter`;
        if (this.props.filterCount !== 1) {
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
                        <div className="search-clear-wrapper">
                            <button
                                className="search-clear-button"
                                aria-label="Clear all filters"
                                title="Clear all filters"
                                onClick={this.pressedClearAll}>
                                <span className="button-label">
                                    Clear all filters
                                </span>
                                <span className="close-icon">
                                    <Icons.Close alt="Clear all filters" />
                                </span>
                            </button>
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
    }
}

TopFilterBar.propTypes = propTypes;

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

import * as Icons from 'components/sharedComponents/icons/Icons';

import { topFilterGroupGenerator } from './filterGroups/TopFilterGroupGenerator';

const propTypes = {
    filters: React.PropTypes.array,
    clearAllFilters: React.PropTypes.func,
    removeFilter: React.PropTypes.func,
    overwriteFilter: React.PropTypes.func,
    clearFilterGroup: React.PropTypes.func
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
        let filterCount = 0;

        const filters = this.props.filters.map((filter) => {
            if (filter.values instanceof Array) {
                filterCount += filter.values.length;
            }
            else {
                filterCount += Object.keys(filter.values).length;
            }

            return topFilterGroupGenerator({
                filter,
                removeFilter: this.props.removeFilter,
                overwriteFilter: this.props.overwriteFilter,
                clearFilterGroup: this.props.clearFilterGroup
            });
        });

        let filterBarHeader = `${filterCount} Current Filter`;
        if (filterCount !== 1) {
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

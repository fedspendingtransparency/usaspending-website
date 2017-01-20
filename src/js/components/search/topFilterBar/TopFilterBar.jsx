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
import _ from 'lodash';

import * as Icons from 'components/sharedComponents/icons/Icons';
import TopFilterGroup from './TopFilterGroup';

const propTypes = {
    filters: React.PropTypes.array,
    clearAllFilters: React.PropTypes.func,
    removeFilter: React.PropTypes.func
};

export default class TopFilterBar extends React.Component {
    constructor(props) {
        super(props);

        this.headerBar = null;

        this.pressedClearAll = this.pressedClearAll.bind(this);
        this.handleWindowResize = _.throttle(this.handleWindowResize.bind(this), 50);
    }

    componentDidMount() {
        // grab a reference to the search header bar DOM element
        this.headerBar = document.querySelector('#search-header-wrapper');

        // observe resize events to keep the filter bar's width in sync when stickied
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        // stop observing resize events
        window.addEventListener('resize', this.handleWindowResize);
    }

    pressedClearAll() {
        this.props.clearAllFilters();
    }


    render() {

        const filters = this.props.filters.map((filter) => (
            <TopFilterGroup
                key={`top-group-${filter.code}`}
                name={filter.name}
                data={filter}
                removeFilter={this.props.removeFilter} />
            ));

        return (
            <div>
                <div
                    className="search-top-filter-bar"
                    ref={(div) => {
                        this.filterDiv = div;
                    }}>
                    <div className="search-top-filters">
                        <div className="search-top-filters-content">
                            {filters}
                        </div>
                    </div>
                    <div className="search-clear-container">
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
            </div>
        );
    }
}

TopFilterBar.propTypes = propTypes;

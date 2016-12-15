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
import TopFilterGroup from './TopFilterGroup';

const propTypes = {
    filters: React.PropTypes.array,
    clearAllFilters: React.PropTypes.func,
    isSticky: React.PropTypes.bool
};

export default class TopFilterBar extends React.Component {
    constructor(props) {
        super(props);

        this.pressedClearAll = this.pressedClearAll.bind(this);
    }

    componentDidMount() {
        if (this.props.isSticky) {
            this.setInitialStickiness();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isSticky !== this.props.isSticky) {
            this.setSticky();
        }
    }

    setInitialStickiness() {
        // handle an edge case where the filter bar is mounted while the user has already scrolled
        // to a sticky position
        this.filterDiv.style.width = `${this.placeholder.offsetWidth}px`;
    }

    setSticky() {
        if (this.props.isSticky) {
            // make the bar sticky and set up the placeholder div
            // determine what the original width of the filter div was based on the placeholder div
            this.filterDiv.style.width = `${this.placeholder.offsetWidth}px`;
            // resize the placeholder div
            this.placeholder.style.visibility = 'visible';
            this.placeholder.style.height = `${this.filterDiv.offsetHeight}px`;
        }
        else {
            // unstick the bar
            this.placeholder.style.visibility = 'hidden';
            this.placeholder.style.height = '0px';
            this.filterDiv.style.width = '100%';
        }
    }

    pressedClearAll() {
        this.props.clearAllFilters();
    }

    render() {
        let stickyClass = '';
        if (this.props.isSticky) {
            stickyClass = ' sticky';
        }

        const filters = this.props.filters.map((filter) => (
            <TopFilterGroup
                key={`top-group-${filter.code}`}
                name={filter.name}
                data={filter} />
            ));

        return (
            <div>
                <div
                    className={`search-top-filter-bar-placeholder${stickyClass}`}
                    id="search-top-filter-bar-placeholder"
                    ref={(div) => {
                        this.placeholder = div;
                    }} />
                <div
                    className={`search-top-filter-bar${stickyClass}`}
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
                                <Icons.Times alt="Clear all filters" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

TopFilterBar.propTypes = propTypes;

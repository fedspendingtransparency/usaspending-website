/**
  * TopBar.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';

import * as Icons from 'components/sharedComponents/icons/Icons';
import TopFilterGroup from './TopFilterGroup';

const propTypes = {
    clearAllFilters: React.PropTypes.func,
    isSticky: React.PropTypes.bool
};

export default class TopFilterBar extends React.Component {
    constructor(props) {
        super(props);

        this.pressedClearAll = this.pressedClearAll.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.isSticky !== this.props.isSticky) {
            this.setSticky();
        }
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
                            <TopFilterGroup />
                            <TopFilterGroup />
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

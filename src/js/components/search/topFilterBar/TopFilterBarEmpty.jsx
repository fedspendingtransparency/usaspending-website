/**
  * TopFilterBarEmpty.jsx
  * Created by Kevin Li 12/13/16
  *
  * TopFilterBarEmpty is a React component that creates empty divs in place of an actual top filter
  * bar. This is used when the top filter bar should not be shown (no filters are selected), but
  * creates the DOM elements so the parent SearchPage scroll handlers can still operate without
  * needing to touch filter logic.
  *
  * @extends React.Component
  **/

import React from 'react';

const propTypes = {
    isSticky: React.PropTypes.bool
};

export default class TopFilterBarEmpty extends React.Component {
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

    render() {
        let stickyClass = '';
        if (this.props.isSticky) {
            stickyClass = ' sticky';
        }

        return (
            <div>
                <div
                    className={`search-top-filter-bar-placeholder empty${stickyClass}`}
                    id="search-top-filter-bar-placeholder"
                    ref={(div) => {
                        this.placeholder = div;
                    }} />
                <div
                    className={`search-top-filter-bar empty${stickyClass}`}
                    ref={(div) => {
                        this.filterDiv = div;
                    }} />
            </div>
        );
    }
}

TopFilterBarEmpty.propTypes = propTypes;

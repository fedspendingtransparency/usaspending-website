/**
 * SearchSidebarSubmit.jsx
 * Created by Kevin Li 12/19/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    stagedFiltersAreEmpty: PropTypes.bool,
    requestsComplete: PropTypes.bool,
    filtersChanged: PropTypes.bool,
    applyStagedFilters: PropTypes.func,
    resetFilters: PropTypes.func
};

const SearchSidebarSubmit = (props) => {
    let disabled = false;
    let title = 'Click to submit your search.';
    if (props.stagedFiltersAreEmpty) {
        title = 'Add or update a filter to submit.';
        disabled = true;
    }
    else if (!props.requestsComplete || !props.filtersChanged) {
        title = 'Add or update a filter to submit.';
        disabled = true;
    }

    return (
        <div
            className="sidebar-submit"
            role="region"
            aria-label="Submit search">
            <button
                className="submit-button"
                title={title}
                aria-label={title}
                disabled={disabled}
                onClick={props.applyStagedFilters}>
                Submit Search
            </button>
            <button
                className="reset-button"
                aria-label="Reset search"
                disabled={!props.requestsComplete}
                onClick={props.resetFilters}>
                Reset search
            </button>
        </div>
    );
};

SearchSidebarSubmit.propTypes = propTypes;

export default SearchSidebarSubmit;

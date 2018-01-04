/**
 * SearchSidebarSubmit.jsx
 * Created by Kevin Li 12/19/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    requestsComplete: PropTypes.bool,
    filtersChanged: PropTypes.bool,
    applyStagedFilters: PropTypes.func,
    resetStagedFilters: PropTypes.func
};

const SearchSidebarSubmit = (props) => {
    let disabled = false;
    let title = 'Click to submit your search.';
    if (!props.requestsComplete || !props.filtersChanged) {
        title = 'Add or update a filter to submit.';
        disabled = true;
    }

    return (
        <div className="sidebar-submit">
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
                aria-label="Reset filters"
                disabled={!props.requestsComplete}
                onClick={props.resetStagedFilters}>
                Reset filters
            </button>
        </div>
    );
};

SearchSidebarSubmit.propTypes = propTypes;

export default SearchSidebarSubmit;

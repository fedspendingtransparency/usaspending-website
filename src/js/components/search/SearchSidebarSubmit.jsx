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

const SearchSidebarSubmit = (props) => (
    <div className="sidebar-submit">
        <button
            className="submit-button"
            title="Add or update a filter to submit."
            aria-label="Add or update a filter to submit."
            disabled={!props.requestsComplete || !props.filtersChanged}
            onClick={props.applyStagedFilters}>
            Submit Search
        </button>
        <button
            className="reset-button"
            disabled={!props.requestsComplete}
            onClick={props.resetStagedFilters}>
            Reset filters
        </button>
    </div>
);

SearchSidebarSubmit.propTypes = propTypes;

export default SearchSidebarSubmit;

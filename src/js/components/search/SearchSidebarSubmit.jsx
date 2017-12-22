/**
 * SearchSidebarSubmit.jsx
 * Created by Kevin Li 12/19/17
 */

import React from 'react';

const SearchSidebarSubmit = (props) => {
    return (
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
};

export default SearchSidebarSubmit;

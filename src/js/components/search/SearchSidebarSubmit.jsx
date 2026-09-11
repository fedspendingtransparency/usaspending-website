/**
 * SearchSidebarSubmit.jsx
 * Created by Kevin Li 12/19/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'data-transparency-ui';
import useFireQueryEvent from "../../hooks/useFireQueryEvent";

const propTypes = {
    stagedFiltersAreEmpty: PropTypes.bool,
    requestsComplete: PropTypes.bool,
    filtersChanged: PropTypes.bool,
    applyStagedFilters: PropTypes.func,
    resetFilters: PropTypes.func,
    setShowMobileFilters: PropTypes.func
};


const SearchSidebarSubmit = ({
    stagedFiltersAreEmpty,
    requestsComplete,
    filtersChanged,
    setShowMobileFilters,
    applyStagedFilters,
    resetFilters
}) => {
    const fireQueryEvent = useFireQueryEvent();
    let disabled = false;
    let title = 'Click to submit your search.';

    if (stagedFiltersAreEmpty || !filtersChanged) {
        title = 'Add or update a filter to submit.';
        disabled = true;
    }
    else if (!requestsComplete ) {
        title = 'Add or update a filter to submit.';
        disabled = true;
    }

    return (
        <div
            className="sidebar-submit"
            role="region"
            aria-label="Submit">
            <Button
                additionalClassnames="submit-button"
                copy="Submit"
                buttonTitle={title}
                buttonSize="md"
                buttonType="primary"
                backgroundColor="light"
                disabled={disabled}
                onClick={() => {
                    if (setShowMobileFilters) {
                        setShowMobileFilters();
                    }
                    fireQueryEvent();
                    applyStagedFilters();
                }} />
            <Button
                additionalClassnames="reset-button"
                copy="Reset filters"
                buttonTitle="Reset filters"
                buttonSize="md"
                buttonType="text"
                backgroundColor="light"
                disabled={!requestsComplete}
                onClick={resetFilters} />
        </div>
    );
};

SearchSidebarSubmit.propTypes = propTypes;

export default SearchSidebarSubmit;

/**
 * SearchSidebarSubmit.jsx
 * Created by Kevin Li 12/19/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'data-transparency-ui';

const propTypes = {
    stagedFiltersAreEmpty: PropTypes.bool,
    requestsComplete: PropTypes.bool,
    filtersChanged: PropTypes.bool,
    applyStagedFilters: PropTypes.func,
    resetFilters: PropTypes.func,
    setShowMobileFilters: PropTypes.func
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
                    if (props?.setShowMobileFilters) {
                        props?.setShowMobileFilters();
                    }
                    props.applyStagedFilters();
                }} />
            <Button
                additionalClassnames="reset-button"
                copy="Reset filters"
                buttonTitle="Reset filters"
                buttonSize="md"
                buttonType="text"
                backgroundColor="light"
                disabled={!props.requestsComplete}
                onClick={props.resetFilters} />
        </div>
    );
};

SearchSidebarSubmit.propTypes = propTypes;

export default SearchSidebarSubmit;

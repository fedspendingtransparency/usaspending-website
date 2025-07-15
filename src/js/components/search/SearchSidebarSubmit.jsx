/**
 * SearchSidebarSubmit.jsx
 * Created by Kevin Li 12/19/17
 */

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'data-transparency-ui';
import * as SearchHelper from 'helpers/searchHelper';
import Analytics from '../../helpers/analytics/Analytics';

const propTypes = {
    stagedFiltersAreEmpty: PropTypes.bool,
    requestsComplete: PropTypes.bool,
    filtersChanged: PropTypes.bool,
    applyStagedFilters: PropTypes.func,
    resetFilters: PropTypes.func,
    setShowMobileFilters: PropTypes.func,
    timerRef: PropTypes.object
};

const SearchSidebarSubmit = ({
    stagedFiltersAreEmpty,
    requestsComplete,
    filtersChanged,
    setShowMobileFilters,
    applyStagedFilters,
    resetFilters,
    timerRef
}) => {
    let disabled = false;
    let title = 'Click to submit your search.';
    const { hash: urlHash } = SearchHelper.getObjFromQueryParams(useLocation().search);

    if (stagedFiltersAreEmpty) {
        title = 'Add or update a filter to submit.';
        disabled = true;
    }
    else if (!requestsComplete || !filtersChanged) {
        title = 'Add or update a filter to submit.';
        disabled = true;
    }

    const fireSearchEvent = () => {
        if (!urlHash && !timerRef.current?.hasFired) {
            const now = new Date().getTime() - timerRef.current.time;
            // eslint-disable-next-line no-param-reassign
            timerRef.current.hasFired = true;
            Analytics.event({
                event: 'search_timer_event',
                category: 'Advanced Search - Filter - Time',
                action: 'filter submit',
                label: `first time to query took ${Math.floor(now / 1000)} seconds`
            });
        }
    };

    useEffect(() => {
        if (urlHash) {
            // eslint-disable-next-line no-param-reassign
            timerRef.current.hasFired = true;
            // if hash user has already searched once.  no need to capture event
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    fireSearchEvent();
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

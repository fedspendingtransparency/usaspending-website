/**
 * SearchSidebarSubmit.jsx
 * Created by Kevin Li 12/19/17
 */

import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { Button } from 'data-transparency-ui';
import Cookies from 'js-cookie';
import * as SearchHelper from 'helpers/searchHelper';
import Analytics from '../../helpers/analytics/Analytics';

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
        if (!urlHash) {
            const now = new Date().getTime();
            if (
                Cookies.get("advanced_search_to_query_time") &&
                !Cookies.get('has_logged_query_timer')
            ) {
                const timer = now - Cookies.get("advanced_search_to_query_time");
                const timerInSeconds = Math.floor(timer / 1000);

                if (timerInSeconds < 3600) {
                    Analytics.event({
                        category: 'Advanced Search - Time to First Query',
                        action: 'query_submit',
                        label: `${timerInSeconds} seconds`,
                        time_to_query: timerInSeconds
                    });
                }

                // clean up
                Cookies.remove("advanced_search_to_query_time");
            }

            if (Cookies.get("homepage_to_query_time") && !Cookies.get('has_logged_query_timer')) {
                const timerHomePage = now - Cookies.get("homepage_to_query_time");
                const timerHomePageInSeconds = Math.floor(timerHomePage / 1000);

                if (timerHomePageInSeconds < 3600) {
                    Analytics.event({
                        category: 'Homepage - Time to First Query',
                        action: 'homepage_query_submit',
                        label: `${timerHomePageInSeconds} seconds`,
                        time_to_query: timerHomePageInSeconds
                    });
                }
                // Cleanup
                Cookies.remove("homepage_to_query_time");
            }
        }

        // Sanity check
        Cookies.set("has_logged_query_timer", true, { expires: 14 });
    };

    useEffect(() => {
        // ok to rewrite with each page reload
        // may need to check if timer already logged.
        Cookies.set('advanced_search_to_query_time', new Date().getTime(), { expires: 14 });
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

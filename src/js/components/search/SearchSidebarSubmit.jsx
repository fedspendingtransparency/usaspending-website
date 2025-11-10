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
// import Analytics from '../../helpers/analytics/Analytics';
import { generateCookieSessionId, setSessionCookie } from '../../helpers/analytics/sessionCookieHelper';

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
        console.log('Firing search submit analytics event');
        if (!urlHash) {
            const now = new Date().getTime();
            if (Cookies.get("advanced_search_to_query_time")) {
                const timer = now - Cookies.get("advanced_search_to_query_time");
                const timerInSeconds = Math.floor(timer / 1000);

                if (timerInSeconds < 3600) {
                    const event = {
                        category: 'Advanced Search - Time to First Query',
                        action: 'query_submit',
                        label: `${timerInSeconds} seconds`,
                        time_to_query: timerInSeconds,
                        sessionId: Cookies.get("session_id") || generateCookieSessionId()
                    };

                    console.log('Firing advanced search to query timer analytics event', event);
                    // Analytics.event({
                    //     category: 'Advanced Search - Time to First Query',
                    //     action: 'query_submit',
                    //     label: `${timerInSeconds} seconds`,
                    //     time_to_query: timerInSeconds,
                    //     sessionId: Cookies.get("session_id") || generateCookieSessionId()
                    // });
                }

                // clean up
                Cookies.remove("advanced_search_to_query_time");
            }

            if (Cookies.get("homepage_to_query_time")) {
                const timerHomePage = now - Cookies.get("homepage_to_query_time");
                const timerHomePageInSeconds = Math.floor(timerHomePage / 1000);

                if (timerHomePageInSeconds < 3600) {
                    const timerEvent = {
                        category: 'Homepage - Time to First Query',
                        action: 'homepage_query_submit',
                        label: `${timerHomePageInSeconds} seconds`,
                        time_to_query: timerHomePageInSeconds,
                        sessionId: Cookies.get("session_id") || generateCookieSessionId()
                    };
                    console.log('Firing homepage to query timer analytics event', timerEvent);
                    // Analytics.event({
                    //     category: 'Homepage - Time to First Query',
                    //     action: 'homepage_query_submit',
                    //     label: `${timerHomePageInSeconds} seconds`,
                    //     time_to_query: timerHomePageInSeconds,
                    //     sessionId: Cookies.get("session_id") || generateCookieSessionId()
                    // });
                }
                // Cleanup
                Cookies.remove("homepage_to_query_time");
            }
        }
    };

    useEffect(() => {
        // ok to rewrite with each page reload
        // may need to check if timer already logged.
        setSessionCookie("advanced_search_to_query_time", "timestamp", 14);
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

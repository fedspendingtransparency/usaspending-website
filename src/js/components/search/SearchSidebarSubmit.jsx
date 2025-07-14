/**
 * SearchSidebarSubmit.jsx
 * Created by Kevin Li 12/19/17
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'data-transparency-ui';
import Analytics from '../../helpers/analytics/Analytics';

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
    const [timer, setTimer] = useState(null);

    if (props.stagedFiltersAreEmpty) {
        title = 'Add or update a filter to submit.';
        disabled = true;
    }
    else if (!props.requestsComplete || !props.filtersChanged) {
        title = 'Add or update a filter to submit.';
        disabled = true;
    }

    useEffect(() => {
        setTimer(new Date().getTime()); // set initial timer in state.
    }, []);

    const fireSearchEvent = () => {
        const now = new Date().getTime() - timer;
        // console.log(`this time: ${Math.floor(now / 1000)} would be sent to GA`);
        console.log(`this time: ${now} would be sent to GA`);

        Analytics.event({
            event: 'search_timer_event',
            category: 'Advanced Search - Filter - Time',
            action: 'filter submit',
            value: `${now} - milliseconds`
        });
    };

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
                    fireSearchEvent();
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

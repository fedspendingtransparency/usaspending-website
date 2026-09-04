/**
 * ResultsView.jsx
 * Created by Andrea Blackwell
 **/

import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import TopFilterBarContainer from "containers/search/topFilterBar/TopFilterBarContainer";
import useResultsCount from "containers/search/resultsView/useResultsCount";
import NoDataScreen from "./NoDataScreen";
import SectionsContent from "./SectionsContent";
import SearchLanding from "./SearchLanding";
import LoadingSpinner from '../../sharedComponents/LoadingSpinner';

require("pages/search/searchPage.scss");

const propTypes = {
    showMobileFilters: PropTypes.bool,
    isMobile: PropTypes.bool,
    noFiltersApplied: PropTypes.bool,
    hash: PropTypes.string,
    setFilterCount: PropTypes.func
};

// eslint-disable-next-line prefer-arrow-callback
const ResultsView = React.memo(function ResultsView({
    showMobileFilters,
    isMobile,
    noFiltersApplied,
    hash,
    setFilterCount
}) {
    const filters = useSelector((state) => state.appliedFilters.filters);
    const spendingLevel = useSelector((state) => state.searchView.spendingLevel);
    const { data, error, isLoading } = useResultsCount(filters, spendingLevel, hash);

    let content = null;

    if (isLoading) {
        content = (
            <div className="search-results-loading">
                <div className="search-results__loading-message">
                    <LoadingSpinner />
                    <div className="loading-text">
                        Please wait while we load your results
                    </div>
                </div>
            </div>
        );
    }
    else if(!error && data) {
        /* eslint-disable camelcase */
        const {
            contracts, direct_payments, grants, idvs, loans, other, subgrants, subcontracts
        } = data.data.results;
        let resCount = contracts + direct_payments + grants + idvs + loans + other;

        if (spendingLevel === 'subawards') {
            resCount = subgrants + subcontracts;
        }

        const hasResults = resCount > 0;
        /* eslint-enable camelcase */

        if (!hash && noFiltersApplied) {
            return <SearchLanding />;
        }

        if (!noFiltersApplied) {
            if (hasResults) {
                content = (
                    <SectionsContent
                        tabData={data.data}
                        hash={hash}
                        spendingLevel={spendingLevel} />
                );
            }
            else {
                content = <NoDataScreen />;
            }
        }
    }

    return (
        <div className="search-results-view-container">
            <div className="search-results-wrapper">
                <TopFilterBarContainer
                    resultsView
                    filters={filters}
                    setFilterCount={setFilterCount} />
                <div className={`search-results ${
                    showMobileFilters && isMobile ? 'behind-filters' : ''
                }`}>
                    {content}
                </div>
            </div>
        </div>
    );
});

ResultsView.propTypes = propTypes;
export default ResultsView;

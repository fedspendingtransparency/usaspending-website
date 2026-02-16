/**
 * ResultsView.jsx
 * Created by Andrea Blackwell
 **/

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { isCancel } from "axios";
import { useSelector } from "react-redux";

import TopFilterBarContainer from "containers/search/topFilterBar/TopFilterBarContainer";
import SearchAwardsOperation from "models/v1/search/SearchAwardsOperation";
import { performSpendingByAwardTabCountSearch, areFiltersEqual } from "helpers/searchHelper";
import { performTabCountSearch } from "helpers/keywordHelper";
import NewSearchScreen from "./NewSearchScreen";
import NoDataScreen from "./NoDataScreen";
import SectionsContent from "./SectionsContent";

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
    const [hasResults, setHasResults] = useState(false);
    const [resultContent, setResultContent] = useState(null);
    const [tabData, setTabData] = useState();
    const [inFlight, setInFlight] = useState(false);
    const [error, setError] = useState(false);

    let mobileFilters = '';
    const filters = useSelector((state) => state.appliedFilters.filters);
    const spendingLevel = useSelector((state) => state.searchView.spendingLevel);

    let countRequest;

    const checkForData = () => {
        if (countRequest) {
            countRequest.cancel();
        }

        const searchParamsTemp = new SearchAwardsOperation();
        searchParamsTemp.fromState(filters);

        setInFlight(true);
        setError(false);

        if (spendingLevel === 'transactions') {
            countRequest = performTabCountSearch({
                filters: searchParamsTemp.toParams(),
                spending_level: spendingLevel,
                auditTrail: 'Results View - Tab Counts'
            });
        }
        else {
            // if subawards is true, newAwardsOnly cannot be true, so we remove dateType
            if (spendingLevel === 'subawards') {
                delete searchParamsTemp.dateType;
            }

            countRequest = performSpendingByAwardTabCountSearch({
                filters: searchParamsTemp.toParams(),
                spending_level: spendingLevel,
                auditTrail: 'Results View - Tab Counts'
            });
        }

        countRequest.promise
            .then((res) => {
                /* eslint-disable camelcase */
                setTabData(res.data);
                const {
                    contracts, direct_payments, grants, idvs, loans, other, subgrants, subcontracts
                } = res.data.results;
                let resCount = contracts + direct_payments + grants + idvs + loans + other;

                if (spendingLevel === 'subawards') {
                    resCount = subgrants + subcontracts;
                }
                /* eslint-enable camelcase */

                if (resCount > 0) {
                    setHasResults(true);
                }
                else {
                    setHasResults(false);
                }

                setInFlight(false);
                setError(false);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    setInFlight(false);
                    setError(true);
                    console.log(err);
                }
            });
    };

    useEffect(() => {
        if (!areFiltersEqual(filters) || !hash) {
            checkForData();
        }

        return () => {
            countRequest?.cancel();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, spendingLevel]);


    useEffect(() => {
        if (showMobileFilters && isMobile) {
            mobileFilters = 'behind-filters';
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showMobileFilters, isMobile]);

    useEffect(() => {
        let content = null;

        if (!inFlight && !error) {
            if (!hash && noFiltersApplied) {
                content = <NewSearchScreen />;
            }

            if (!noFiltersApplied) {
                if (hasResults) {
                    content = (
                        <SectionsContent
                            tabData={tabData}
                            hash={hash}
                            spendingLevel={spendingLevel} />
                    );
                }
                else {
                    content = <NoDataScreen />;
                }
            }
        }

        setResultContent(content);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noFiltersApplied, hasResults, inFlight, error, hash]);

    return (
        <div className="search-results-view-container">
            <div className="search-results-wrapper">
                <TopFilterBarContainer filters={filters} setFilterCount={setFilterCount} />
                <div className={`search-results ${mobileFilters}`}>
                    {resultContent}
                </div>
            </div>
        </div>
    );
});

ResultsView.propTypes = propTypes;
export default ResultsView;

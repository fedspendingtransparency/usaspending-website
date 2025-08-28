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
import NewSearchScreen from "./NewSearchScreen";
import NoDataScreen from "./NoDataScreen";
import SectionsContent from "./SectionsContent";
import { performTabCountSearch } from "../../../helpers/keywordHelper";

require("pages/search/searchPage.scss");

const propTypes = {
    showMobileFilters: PropTypes.bool,
    isMobile: PropTypes.bool,
    noFiltersApplied: PropTypes.bool,
    hash: PropTypes.string,
    searchV2: PropTypes.bool
};

const ResultsView = React.memo((props) => {
    const [hasResults, setHasResults] = useState(false);
    const [resultContent, setResultContent] = useState(null);
    const [tabData, setTabData] = useState();
    const [inFlight, setInFlight] = useState(false);
    const [error, setError] = useState(false);

    let mobileFilters = '';
    const filters = useSelector((state) => state.appliedFilters.filters);
    const subaward = useSelector((state) => state.searchView.subaward);
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
        if (!areFiltersEqual(filters) || !props.hash) {
            checkForData();
        }

        return () => {
            countRequest?.cancel();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, subaward, spendingLevel]);


    useEffect(() => {
        if (props.showMobileFilters && props.isMobile) {
            mobileFilters = 'behind-filters';
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.showMobileFilters, props.isMobile]);

    useEffect(() => {
        let content = null;

        if (!inFlight && !error) {
            if (!props.hash && props.noFiltersApplied) {
                content = <NewSearchScreen />;
            }

            if (!props.noFiltersApplied) {
                if (hasResults) {
                    content = (
                        <SectionsContent
                            tabData={tabData}
                            subaward={subaward}
                            hash={props.hash}
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
    }, [props.noFiltersApplied, hasResults, subaward, inFlight, error, props.hash]);

    return (
        <div className="search-results-wrapper">
            { !props.searchV2 && <TopFilterBarContainer {...props} /> }
            <div className={`search-results ${mobileFilters}`}>
                {resultContent}
            </div>
        </div>
    );
});

ResultsView.propTypes = propTypes;
export default ResultsView;

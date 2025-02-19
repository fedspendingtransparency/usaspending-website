/**
 * ResultsView.jsx
 * Created by Andrea Blackwell
 **/

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { isCancel } from "axios";
import { throttle } from 'lodash';
import { useSelector } from "react-redux";
import TopFilterBarContainer from "containers/search/topFilterBar/TopFilterBarContainer";
import SearchAwardsOperation from "models/v1/search/SearchAwardsOperation";
import { performSpendingByAwardTabCountSearch } from "helpers/searchHelper";
import NewSearchScreen from "./NewSearchScreen";
import NoDataScreen from "./NoDataScreen";
import SectionsContent from "./SectionsContent";

require("pages/search/searchPage.scss");

const propTypes = {
    showMobileFilters: PropTypes.bool,
    isMobile: PropTypes.bool,
    noFiltersApplied: PropTypes.bool,
    hash: PropTypes.string
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

    let countRequest;

    const checkForData = () => {
        if (countRequest) {
            countRequest.cancel();
        }

        const searchParamsTemp = new SearchAwardsOperation();
        searchParamsTemp.fromState(filters);

        setInFlight(true);
        setError(false);

        countRequest = performSpendingByAwardTabCountSearch({
            filters: searchParamsTemp.toParams(),
            subawards: subaward,
            auditTrail: 'Results View - Tab Counts'
        });

        countRequest.promise
            .then((res) => {
                /* eslint-disable camelcase */
                setTabData(res.data);
                const {
                    contracts, direct_payments, grants, idvs, loans, other, subgrants, subcontracts
                } = res.data.results;
                let resCount = contracts + direct_payments + grants + idvs + loans + other;

                if (subaward) {
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

    useEffect(throttle(() => {
        checkForData();

        return () => {
            countRequest.cancel();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 400), [filters, subaward]);


    useEffect(() => {
        if (props.showMobileFilters && props.isMobile) {
            mobileFilters = 'behind-filters';
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.showMobileFilters, props.isMobile]);

    useEffect(() => {
        let content = null;

        if (!inFlight && !error) {
            if (props.noFiltersApplied) {
                content = <NewSearchScreen />;
            }

            if (!props.noFiltersApplied) {
                if (hasResults) {
                    content = <SectionsContent tabData={tabData} subaward={subaward} hash={props.hash} />;
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
            <TopFilterBarContainer {...props} />
            <div className={`search-results ${mobileFilters}`}>
                {resultContent}
            </div>
        </div>
    );
});

ResultsView.propTypes = propTypes;
export default ResultsView;

/**
 * ResultsView.jsx
 **/

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import TopFilterBarContainer from "containers/search/topFilterBar/TopFilterBarContainer";
import SearchAwardsOperation from "models/v1/search/SearchAwardsOperation";
import { performSpendingByAwardTabCountSearch } from "helpers/searchHelper";
import PageFeatureFlag from "../../sharedComponents/PageFeatureFlag";
import NewSearchScreen from "./NewSearchScreen";
import NoDataScreen from "./NoDataScreen";
import SectionsContent from "./SectionsContent";

require("pages/search/searchPage.scss");

const propTypes = {
    showMobileFilters: PropTypes.bool,
    isMobile: PropTypes.bool
};

const ResultsView = (props) => {
    const [hasResults, setHasResults] = useState(false);
    const [resultContent, setResultContent] = useState(null);

    const filters = useSelector((state) => state.appliedFilters.filters);
    const subaward = useSelector((state) => state.searchView.subaward);

    const checkForData = () => {
        const searchParamsTemp = new SearchAwardsOperation();
        searchParamsTemp.fromState(filters);
        const countRequest = performSpendingByAwardTabCountSearch({
            filters: searchParamsTemp.toParams(),
            subawards: subaward
        });
        countRequest.promise
            .then((res) => {
                /* eslint-disable camelcase */
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
            })
            .catch((err) => {
                console.log("err: ", err);
            });
    };

    useEffect(() => {
        checkForData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, subaward]);

    let mobileFilters = '';
    if (props.showMobileFilters && props.isMobile) {
        mobileFilters = 'behind-filters';
    }

    useEffect(() => {
        let content = (
            <NewSearchScreen />
        );

        if (!props.noFiltersApplied && hasResults) {
            content = <SectionsContent subaward={subaward} />;
        }
        else if (!props.noFiltersApplied && !hasResults) {
            content = <NoDataScreen />;
        }
        setResultContent(content);

    }, [props.noFiltersApplied && hasResults]);

    return (
        <PageFeatureFlag>
            <div className="search-results-wrapper">
                <TopFilterBarContainer {...props} />
                <div className={`search-results ${mobileFilters}`}>
                    {resultContent}
                </div>
            </div>
        </PageFeatureFlag>
    );
};

ResultsView.propTypes = propTypes;
export default ResultsView;

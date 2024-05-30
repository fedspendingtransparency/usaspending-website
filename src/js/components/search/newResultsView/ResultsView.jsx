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
import TableSection from "./table/TableSection";
import CategoriesSection from "./categories/CategoriesSection";
import TimeSection from "./time/TimeSection";
import MapSection from "./map/MapSection";
import NewSearchScreen from "./NewSearchScreen";
import NoDataScreen from "./NoDataScreen";

require("pages/search/searchPage.scss");

const propTypes = {
    showMobileFilters: PropTypes.bool,
    isMobile: PropTypes.bool
};

const ResultsView = (props) => {
    const [observerSupported, setObserverSupported] = useState(false);
    const [awardTableHasLoaded, setAwardTableHasLoaded] = useState(false);
    const [spendingHasLoaded, setSpendingHasLoaded] = useState(false);
    const [mapHasLoaded, setMapHasLoaded] = useState(false);
    const [categoriesHasLoaded, setCategoriesHasLoaded] = useState(false);
    const [hasResults, setHasResults] = useState(false);
    const [selectedDropdown, setSelectedDropdown] = useState('awarding_agency');

    const observerOptions = {
        threshold: 0.1
    };

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

    const callbackFunction = (entries) => {
        entries.forEach((entry) => {
            const section = entry.target.className;
            if (entry.isIntersecting) {
                // setIsVisible(section);
                if (section === 'award') {
                    setAwardTableHasLoaded(true);
                }
                else if (section === 'spending') {
                    setSpendingHasLoaded(true);
                }
                else if (section === 'map') {
                    setMapHasLoaded(true);
                }
                else if (section === 'categories') {
                    setCategoriesHasLoaded(true);
                }
            }
        });
    };

    useEffect(() => {
        setObserverSupported('IntersectionObserver' in window);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (observerSupported && hasResults) {
            const target = '#search-page-component';
            const targets = document.querySelectorAll(target);

            // eslint-disable-next-line no-undef
            const observer = new IntersectionObserver(callbackFunction, observerOptions);

            targets.forEach((i) => {
                if (i.className) {
                    observer.observe(i);
                }
            });

            return () => observer.disconnect();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [observerSupported, hasResults]);

    useEffect(() => {
        checkForData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, subaward]);

    let mobileFilters = '';
    if (props.showMobileFilters && props.isMobile) {
        mobileFilters = 'behind-filters';
    }

    let content = (
        <NewSearchScreen
            observerSupported={observerSupported}
            setObserverSupported={setObserverSupported} />
    );
    if (!props.noFiltersApplied && hasResults) {
        content = (<>
            <MapSection subaward={subaward} mapHasLoaded={mapHasLoaded} />
            <CategoriesSection subaward={subaward} categoriesHasLoaded={categoriesHasLoaded} setSelectedDropdown={setSelectedDropdown} selectedDropdown={selectedDropdown} />
            <TimeSection subaward={subaward} spendingHasLoaded={spendingHasLoaded} />
            <TableSection subaward={subaward} awardTableHasLoaded={awardTableHasLoaded} />
        </>);
    }
    else if (!props.noFiltersApplied && !hasResults) {
        content = <NoDataScreen />;
    }

    return (
        <PageFeatureFlag>
            <div className="search-results-wrapper">
                <TopFilterBarContainer {...props} />
                <div className={`search-results ${mobileFilters}`}>
                    {content}
                </div>
            </div>
        </PageFeatureFlag>
    );
};

ResultsView.propTypes = propTypes;
export default ResultsView;

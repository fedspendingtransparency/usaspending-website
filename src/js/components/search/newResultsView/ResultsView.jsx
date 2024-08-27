/**
 * ResultsView.jsx
 * Created by Andrea Blackwell
 **/

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TopFilterBarContainer from "containers/search/topFilterBar/TopFilterBarContainer";
import SearchAwardsOperation from "models/v1/search/SearchAwardsOperation";
import { performSpendingByAwardTabCountSearch } from "helpers/searchHelper";
import { useQueryParams, combineQueryParams, getQueryParamString } from 'helpers/queryParams';

import NewSearchScreen from "./NewSearchScreen";
import NoDataScreen from "./NoDataScreen";
import SectionsContent from "./SectionsContent";

require("pages/search/searchPage.scss");

const propTypes = {
    showMobileFilters: PropTypes.bool,
    isMobile: PropTypes.bool,
    noFiltersApplied: PropTypes.bool
};

const ResultsView = (props) => {
    const [hasResults, setHasResults] = useState(false);
    const [resultContent, setResultContent] = useState(null);
    const [waitForCheckForData, setWaitForCheckForData] = useState(true);

    const [timeLoaded, setTimeLoaded] = useState(false);
    const [categoriesLoaded, setCategoriesLoaded] = useState(false);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [tableLoaded, setTableLoaded] = useState(false);

    const filters = useSelector((state) => state.appliedFilters.filters);
    const subaward = useSelector((state) => state.searchView.subaward);
    const query = useQueryParams();
    const history = useHistory();

    const jumpToSection = (section) => {
        const sections = ['map', 'time', 'categories', 'awards'];
        // we've been provided a section to jump to
        // check if it's a valid section
        console.debug("in jump to section: ", section);
        const matchedSection = sections.find((sec) => sec === section);
        console.debug("matched section: ", matchedSection);
        if (!matchedSection) {
            // no matching section
            return;
        }

        console.debug("making it to this?");
        // add section to url
        if (!window.location.href.includes(`section=${section}`)) {
            const newQueryParams = combineQueryParams(query, { section: `${section}` });
            history.replace({
                pathname: ``,
                search: getQueryParamString(newQueryParams)
            });
        }

        let rectTopOffset = 0;
        if (matchedSection === 'categories') {
            if (props.isMobile) {
                rectTopOffset = 850;
            } else {
                rectTopOffset = 1100;
            }
        }
        else if (matchedSection === 'time') {
            if (props.isMobile) {
                rectTopOffset = 1500;
            } else {
                rectTopOffset = 1838;
            }
        }
        else if (matchedSection === 'map') {
            if (props.isMobile) {
                rectTopOffset = 2240;
            } else {
                rectTopOffset = 2440;
            }
        }

        window.scrollTo({
            top: rectTopOffset,
            behavior: 'smooth'
        });
    };

    const parseSection = () => {
        const params = history.location.search.split("&");
        params.shift();

        if ((params.length === 1 || params.length === 2) && params[0].substring(0, 8) === "section=") {
            console.debug("in parse section", query.section, params);
            jumpToSection(query.section);
        }
    };

    useEffect(() => {
        parseSection();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeLoaded, mapLoaded, categoriesLoaded]);
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

                setWaitForCheckForData(false);
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
        let content = null;

        if (props.noFiltersApplied && !waitForCheckForData) {
            content = <NewSearchScreen />;
            setMapLoaded(false);
            setCategoriesLoaded(false);
            setTimeLoaded(false);
            setTableLoaded(false);
        }

        if (!props.noFiltersApplied && !waitForCheckForData) {
            if (hasResults) {
                content = (<SectionsContent
                    subaward={subaward}
                    setMapLoaded={setMapLoaded}
                    setCategoriesLoaded={setCategoriesLoaded}
                    setTimeLoaded={setTimeLoaded}
                    setTableLoaded={setTableLoaded} />);
            }
            else {
                content = <NoDataScreen />;
                setMapLoaded(false);
                setCategoriesLoaded(false);
                setTimeLoaded(false);
                setTableLoaded(false);
            }
        }

        setResultContent(content);
    }, [props.noFiltersApplied, hasResults, subaward, waitForCheckForData]);

    console.debug("is loaded: ", timeLoaded, categoriesLoaded, mapLoaded, tableLoaded);

    return (
        <div className="search-results-wrapper">
            <TopFilterBarContainer {...props} />
            <div className={`search-results ${mobileFilters}`}>
                {resultContent}
            </div>
        </div>
    );
};

ResultsView.propTypes = propTypes;
export default ResultsView;

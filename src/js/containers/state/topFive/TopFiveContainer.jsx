/**
 * TopFiveContainer.jsx
 * Created by Kevin Li 5/15/18
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import { getTrailingTwelveMonths, convertFYToDateRange } from 'helpers/fiscalYearHelper';
import * as SearchHelper from 'helpers/searchHelper';
import BaseStateCategoryResult from 'models/v2/state/BaseStateCategoryResult';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import TopFive from 'components/state/topFive/TopFive';
import { REQUEST_VERSION } from "../../../GlobalConstants";
import { generateUrlHash } from "../../../helpers/searchHelper";

const propTypes = {
    code: PropTypes.string,
    total: PropTypes.number,
    category: PropTypes.string,
    fy: PropTypes.string,
    type: PropTypes.string
};

const TopFiveContainer = (props) => {
    const [categoryState, setCategoryState] = useState({ loading: true, error: false, results: [] });

    // eslint-disable-next-line react/sort-comp
    const dataParams = () => {
        let timePeriod = null;
        if (props.fy === 'latest') {
            const trailing = getTrailingTwelveMonths();
            timePeriod = {
                start_date: trailing[0],
                end_date: trailing[1]
            };
        }
        else if (props.fy !== 'all' && props.fy) {
            const range = convertFYToDateRange(parseInt(props.fy, 10));
            timePeriod = {
                start_date: range[0],
                end_date: range[1]
            };
        }

        const filters = {
            place_of_performance_scope: 'domestic',
            place_of_performance_locations: [
                {
                    country: 'USA',
                    state: props.code
                }
            ]
        };

        if (timePeriod) {
            filters.time_period = [timePeriod];
        }

        // Tab selection
        if (props.type !== 'all' && awardTypeGroups[props.type]) {
            filters.award_type_codes = awardTypeGroups[props.type];
        }

        return {
            filters,
            category: props.category,
            limit: 5,
            page: 1
        };
    };

    const getSelectedSection = (resultObj, name) => {
        const params = dataParams();

        let categoryFilter;

        if (params.category === 'awarding_agency') {
            categoryFilter = { agencies: [{ type: "awarding", tier: "toptier", name }] };
        }
        else if (params.category === 'awarding_subagency') {
            categoryFilter = { recipient_search_text: name };
        }
        else if (params.category === 'recipient') {
            categoryFilter = { recipient_search_text: name };
        }
        else if (params.category === 'county') {
            // categoryFilter = { recipient_search_text: item };
        }
        else if (params.category === 'district') {
            // categoryFilter = { recipient_search_text: item };
        }
        else if (params.category === 'cfda') {
            categoryFilter = { program_numbers: [name] };
        }
        else if (params.category === 'psc') {
            // categoryFilter = { psc_codes: [item] };
        }
        else if (params.category === 'naics') {
            categoryFilter = { naics_codes: [name] };
        }

        const filterValue = {
            filters: {
                ...params.filters
            },
            version: REQUEST_VERSION
        };

        console.log("filter value", filterValue);
        let tempHash = generateUrlHash(filterValue);
        tempHash.promise
            .then((results) => {
                const hashData = results.data;
                const searchUrl = `/search?hash=${hashData.hash}`;
                console.log("search url", searchUrl);
                return searchUrl;
            })
            .catch((error) => {
                console.log(error);
                if (isCancel(error)) {
                    // Got cancelled
                }
                else if (error.response) {
                    // Errored out but got response, toggle noAward flag
                    tempHash = null;
                }
                else {
                    // Request failed
                    tempHash = null;
                    console.log(error);
                }
            });
        return '';
    };


    const parseResults = (data, type) => {
        const resultsUrls = [];
        const parsed = data?.map((item, index) => {
            const result = Object.create(BaseStateCategoryResult);
            result.populate(item, index + 1);

            if (type === 'awarding_agency' || type === 'awarding_subagency') {
                result.nameTemplate = (code, name) => {
                    if (code) {
                        return `${name} (${code})`;
                    }
                    return name;
                };

                resultsUrls.push({ [result.nameTemplate]: "blah" });
                console.log("results url", getSelectedSection(result.nameTemplate));
            }
            else if (type === 'recipient') {
                result.nameTemplate = (code, name) => name;
            }
            else if (type === 'county' || type === 'district') {
                result.nameTemplate = (code, name) => (name);
            }

            // append the filter here
            // for the filter need - the state code (props.code), table category (props.category), time period(?), and tab selection (props.type)
            // console.log("filters", props.fy, dataParams());


            return result;
        });

        console.log("parsed", parsed, resultsUrls);

        setCategoryState({ loading: false, error: false, results: parsed });
    };

    const loadCategory = () => {
        let request;

        if (!props.code) {
            setCategoryState({ loading: false, error: true });
        }

        if (request) {
            request.cancel();
        }

        setCategoryState({ loading: true, error: false });


        // generate a link with these dataParams
        request = SearchHelper.performSpendingByCategorySearch(dataParams());
        request.promise
            .then((res) => {
                console.log("category data", res.data);
                parseResults(res.data.results, res.data.category);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    setCategoryState({ loading: false, error: true });
                }
            });
    };


    useEffect(() => {
        loadCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.code, props.fy, props.type]);

    return (
        <TopFive
            category={props.category}
            total={props.total}
            {...categoryState} />
    );
};

TopFiveContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        code: state.stateProfile.overview.code,
        total: state.stateProfile.overview._totalAmount,
        fy: state.stateProfile.fy
    })
)(TopFiveContainer);

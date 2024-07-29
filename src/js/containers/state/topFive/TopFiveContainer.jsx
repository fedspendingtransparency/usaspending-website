/**
 * TopFiveContainer.jsx
 * Created by Kevin Li 5/15/18
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { initialState as defaultFilters } from 'redux/reducers/search/searchFiltersReducer';
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

    const getSelectedLink = (e, data) => {
        e.preventDefault();
        console.log("in get selected link", e, data);
        const params = dataParams();

        let categoryFilter;
        // categoryFilter = { agencies: [{ type: "awarding", tier: "toptier", name: "Department of the Treasury" }] };

        if (params.category === 'awarding_agency') {
        //     categoryFilter = { agencies: [{ type: "awarding", tier: "toptier", name: "Department of the Treasury" }] };
        }
        // else if (params.category === 'awarding_subagency') {
        //     categoryFilter = { recipient_search_text: name };
        // }
        else if (params.category === 'recipient') {
            categoryFilter = { selectedRecipients: [data._name] };
        }
        // else if (params.category === 'county') {
        //     categoryFilter = {
        //         selectedLocations: {
        //             "USA_AL_001": {
        //                 "identifier": "USA_AL_001",
        //                 "filter": {
        //                     "country": "USA",
        //                     "state": "AL",
        //                     "county": "001"
        //                 },
        //                 "display": {
        //                     "entity": "County",
        //                     "standalone": "Autauga County, AL",
        //                     "title": "Autauga County"
        //                 }
        //             }
        //         };
        //     }
        // }
        // else if (params.category === 'district') {
        //     // categoryFilter = { recipient_search_text: item };
        // }
        else if (params.category === 'cfda') {
            categoryFilter = {
                selectedCFDA:
                    {
                        [data._code]: {
                            program_number: data._code,
                            program_title: data._name,
                            identifier: data._code
                        }
                    }
            };
        }
        // else if (params.category === 'psc') {
        //     // categoryFilter = { psc_codes: [item] };
        // }
        else if (params.category === 'naics') {

            categoryFilter = {
                naicsCodes: {
                    require: [data._code],
                    exclude: [],
                    counts: [
                        {
                            label: data._name,
                            value: data._code,
                            count: 1
                        }
                    ]
                }
            }
        }

        console.log("filter value", categoryFilter, params.category);

        const filterValue = {
            filters: {
                ...defaultFilters,
                ...categoryFilter
            },
            version: REQUEST_VERSION
        };

        console.log("filter value", filterValue);
        let tempHash = generateUrlHash(filterValue);
        tempHash.promise
            .then((results) => {
                const hashData = results.data;
                window.open(`/search?hash=${hashData.hash}`, '_blank').focus();
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
    };


    const parseResults = (data, type) => {
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
            }
            else if (type === 'recipient') {
                result.nameTemplate = (code, name) => name;
            }
            else if (type === 'county' || type === 'district') {
                result.nameTemplate = (code, name) => (name);
            }

            return result;
        });

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
                parseResults(res.data.results, res.data.category);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    setCategoryState({ loading: false, error: true });
                }
            });
    };


    // useEffect(() => {
    //     console.log("here!", categoryState);
    //     getSelectedLink("test");
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [categoryState.results]);

    useEffect(() => {
        loadCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.code, props.fy, props.type]);

    return (
        <TopFive
            category={props.category}
            getSelectedLink={getSelectedLink}
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

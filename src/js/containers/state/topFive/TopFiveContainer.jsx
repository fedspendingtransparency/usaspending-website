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
import { useAgencySlugs } from 'containers/agency/WithAgencySlugs';

import { REQUEST_VERSION } from "../../../GlobalConstants";
import { generateUrlHash } from "../../../helpers/searchHelper";
import { stateFIPSByAbbreviation, stateNameByFipsId } from "../../../dataMapping/state/stateNames";
// eslint-disable-next-line import/extensions

const propTypes = {
    code: PropTypes.string,
    total: PropTypes.number,
    category: PropTypes.string,
    fy: PropTypes.string,
    type: PropTypes.string
};

const TopFiveContainer = (props) => {
    const [categoryState, setCategoryState] = useState({ loading: true, error: false, results: [] });
    const [agencySlugs, , , slugsLoading, slugsError] = useAgencySlugs();
    const [linkData, setLinkData] = useState();


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
        setLinkData(data);
    };

    const createLink = () => {
        const params = dataParams();
        const location = params.filters.place_of_performance_locations[0];
        const fips = stateFIPSByAbbreviation[location.state];
        const stateName = stateNameByFipsId[fips];

        let categoryFilter;
        let locationFilter;

        locationFilter = {
            selectedLocations: {
                [`${location.country}_${location.state}`]: {
                    identifier: `${location.country}_${location.state}`,
                    filter: {
                        country: location.country,
                        state: location.state
                    },
                    display: {
                        entity: "State",
                        standalone: stateName,
                        title: stateName
                    }
                }
            }
        };

        if (params.category === 'awarding_agency') {
            categoryFilter = {
                selectedAwardingAgencies: {
                    [`${linkData.id}_toptier`]: {
                        id: linkData.id,
                        toptier_flag: true,
                        toptier_agency: {
                            toptier_code: agencySlugs[linkData.slug],
                            abbreviation: linkData._code,
                            name: linkData._name
                        },
                        subtier_agency: {
                            abbreviation: linkData._code,
                            name: linkData._name
                        },
                        agencyType: "toptier"
                    }
                }
            };
        }
        else if (params.category === 'awarding_subagency') {
            // TODO awaiting backend changes in DEV-10991

            // categoryFilter = {
            //     selectedAwardingAgencies: {
            //         [`${linkData.id}_subtier`]: {
            //             id: linkData.id,
            //             toptier_flag: false,
            //             toptier_agency: {
            //                 toptier_code: agencySlugs[linkData.slug],
            //                 abbreviation: linkData._code,
            //                 name: linkData._name
            //             },
            //             subtier_agency: {
            //                 abbreviation: linkData._code,
            //                 name: linkData._name
            //             },
            //             agencyType: "subtier"
            //         }
            //     }
            // };

            // {
            //     "1188_subtier": {
            //     "id": 1188,
            //         "toptier_flag": false,
            //         "toptier_agency": {
            //         "toptier_code": "097",
            //             "abbreviation": "DOD",
            //             "name": "Department of Defense"
            //     },
            //     "subtier_agency": {
            //         "abbreviation": "USA",
            //             "name": "Department of the Army"
            //     },
            //     "agencyType": "subtier"
            // }
            // }
        }
        else if (params.category === 'recipient') {
            categoryFilter = { selectedRecipients: [linkData._name] };
        }
        else if (params.category === 'county') {
            locationFilter = {
                selectedLocations: {
                    [`${location.country}_${location.state}_${linkData._code}`]: {
                        identifier: `${location.country}_${location.state}_${linkData._code}`,
                        filter: {
                            country: location.country,
                            state: location.state,
                            county: linkData._code
                        },
                        display: {
                            entity: "County",
                            standalone: `${linkData._name}, ${location.state}`,
                            title: linkData._name
                        }
                    }
                }
            };
        }
        else if (params.category === 'district') {
            locationFilter = {
                selectedLocations: {
                    [`${location.country}_${location.state}_${linkData._code}`]: {
                        identifier: `${location.country}_${location.state}_${linkData._code}`,
                        filter: {
                            country: location.country,
                            state: location.state,
                            district_current: linkData._code
                        },
                        display: {
                            entity: "Current congressional district",
                            standalone: `${linkData._name}, ${location.state}`,
                            title: linkData._name
                        }
                    }
                }
            };
        }
        else if (params.category === 'cfda') {
            categoryFilter = {
                selectedCFDA:
                    {
                        [linkData._code]: {
                            program_number: linkData._code,
                            program_title: linkData._name,
                            identifier: linkData._code
                        }
                    }
            };
        }
        else if (params.category === 'naics') {
            categoryFilter = {
                naicsCodes: {
                    require: [linkData._code],
                    exclude: [],
                    counts: [
                        {
                            label: linkData._name,
                            value: linkData._code,
                            count: 1
                        }
                    ]
                }
            };
        }

        let awardTypeFilter;

        if (params.filters.award_type_codes?.length > 0) {
            awardTypeFilter = {
                awardType: params.filters.award_type_codes
            };
        }

        const timePeriodFilter = {
            timePeriodStart: params.filters.time_period[0].start_date,
            timePeriodEnd: params.filters.time_period[0].end_date,
            timePeriodType: 'dr'
        };

        const filterValue = {
            filters: {
                ...defaultFilters,
                ...categoryFilter,
                ...locationFilter,
                ...timePeriodFilter,
                ...awardTypeFilter
            },
            version: REQUEST_VERSION
        };

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

    useEffect(() => {
        if (agencySlugs && linkData) {
            createLink();
        }
    }, [agencySlugs, linkData, slugsLoading, slugsError, createLink]);

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

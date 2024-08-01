/**
 * TopFiveRow.jsx
 * Created by Kevin Li 5/16/18
 */

import React, { useEffect, useState } from 'react';
import { isCancel } from "axios";
import PropTypes from 'prop-types';
import { initialState as defaultFilters } from 'redux/reducers/search/searchFiltersReducer';
import { useAgencySlugs } from 'containers/agency/WithAgencySlugs';

import FeatureFlag from "../../sharedComponents/FeatureFlag";
import {stateFIPSByAbbreviation, stateNameByFipsId} from "../../../dataMapping/state/stateNames";
import {REQUEST_VERSION} from "../../../GlobalConstants";
import { generateUrlHash } from "../../../helpers/searchHelper";

const propTypes = {
    data: PropTypes.object,
    total: PropTypes.number,
    dataParams: PropTypes.object
};

const TopFiveRow = (props) => {
    const percentValue = (props.data._amount / props.total) * 100;
    const percent = isNaN(percentValue) ? '--' : `${Math.round(percentValue * 100) / 100}%`;
    const [linkData, setLinkData] = useState();
    const [agencySlugs, , , slugsLoading, slugsError] = useAgencySlugs();

    const getSelectedLink = (e, data) => {
        e.preventDefault();
        e.stopPropagation();
        setLinkData(data);
    };

    const createLink = () => {
        const params = props.dataParams;
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
            // example filter
            // categoryFilter = {
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
                window.open(`/search?hash=${hashData.hash}`, '_blank');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [agencySlugs, linkData, slugsLoading, slugsError]);

    return (
        <tr
            className="category-table__table-row">
            <td
                className="category-table__table-cell"
                title={props.data.name}>
                {props.data._slug ?
                    props.data.linkedName
                    : props.data.name}
            </td>
            <td
                className="category-table__table-cell category-table__table-cell_centered"
                title={props.data.amount}>
                {props.data.amount}
            </td>
            <td
                className="category-table__table-cell category-table__table-cell_centered"
                title={percent}>
                {percent}
            </td>
            <FeatureFlag>
                <td
                    className="category-table__table-cell category-table__table-cell_centered view_awards"
                    title="View awards">
                    <a
                        role="button"
                        tabIndex={0}
                        aria-label="View awards"
                        onKeyDown={(e) => { if (e.key === "Enter") getSelectedLink(e, props.data.name); }}
                        onClick={(e) => getSelectedLink(e, props.data)}>
                        View Awards
                    </a>
                </td>
            </FeatureFlag>
        </tr>
    );
};

TopFiveRow.propTypes = propTypes;

export default TopFiveRow;

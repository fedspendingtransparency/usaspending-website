/**
 * TopFive.jsx
 * Created by Kevin Li 5/15/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from 'data-transparency-ui';
import { categoryTitles } from 'dataMapping/state/topCategories';
import { CondensedCDTooltip } from '../../../components/award/shared/InfoTooltipContent';

import TopFiveRow from './TopFiveRow';
import FeatureFlag from "../../sharedComponents/FeatureFlag";
import { stateFIPSByAbbreviation, stateNameByFipsId } from "../../../dataMapping/state/stateNames";
import { REQUEST_VERSION } from "../../../GlobalConstants";
import { generateUrlHash } from "../../../helpers/searchHelper";
import { isCancel } from "axios";

const propTypes = {
    category: PropTypes.string,
    results: PropTypes.array,
    total: PropTypes.number,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    dataParams: PropTypes.object
};

const TopFive = (props) => {
    const rows = props?.results?.map((result, index) => (
        <TopFiveRow
            key={index}
            data={result}
            total={props.total}
            dataParams={props.dataParams} />
    ));

    const hideBody = props.loading || props.error ? `category-table__table-body_hide` : '';

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

    let message = null;
    if (props.error) {
        message = (
            <div className="category-table__message">
                An error occurred while loading this table.
            </div>
        );
    }
    else if (props.loading) {
        message = (
            <div className="category-table__message">
                Loading...
            </div>
        );
    }
    return (
        <div className="category-table">
            <div className="category-table__title">
                <img
                    className="category-table__title-icon"
                    src={`img/state-categories/${props.category}.png`}
                    aria-hidden="true"
                    alt="" />
                <div className="category-table__title-name">
                    {props.category === "district" ?
                        <>{categoryTitles[props.category]}
                            <TooltipWrapper
                                className="congressional-district__tt"
                                icon="info"
                                tooltipPosition="bottom"
                                styles={{
                                    position: 'relative'
                                }}
                                tooltipComponent={<CondensedCDTooltip title="Congressional Districts" />} />
                        </> : categoryTitles[props.category]}
                </div>
            </div>
            <table className="category-table__table">
                <thead
                    className="category-table__table-head">
                    <tr
                        className="category-table__table-head-row">
                        <th className="category-table__table-head-cell">
                            Name
                        </th>
                        <th className="category-table__table-head-cell category-table__table-head-cell_centered">
                            Awarded Amount
                        </th>
                        <th className="category-table__table-head-cell category-table__table-head-cell_centered">
                            % of Total
                        </th>
                        <FeatureFlag>
                            <th className="category-table__table-head-cell category-table__table-head-cell_centered">
                                View in Award Search
                            </th>
                        </FeatureFlag>
                    </tr>
                </thead>
                <tbody
                    className={`category-table__table-body ${hideBody}`}>
                    {rows}
                </tbody>
            </table>
            {message}
        </div>
    );
};

TopFive.propTypes = propTypes;

export default TopFive;

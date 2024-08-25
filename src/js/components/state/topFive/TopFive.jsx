/**
 * TopFive.jsx
 * Created by Kevin Li 5/15/18
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, TooltipWrapper } from 'data-transparency-ui';
import { categoryTitles } from 'dataMapping/state/topCategories';
import { useAgencySlugs } from 'containers/agency/WithAgencySlugs';
import { initialState as defaultFilters } from 'redux/reducers/search/searchFiltersReducer';
import { isCancel } from "axios";

import { CondensedCDTooltip } from '../../../components/award/shared/InfoTooltipContent';
import { stateFIPSByAbbreviation, stateNameByFipsId } from "../../../dataMapping/state/stateNames";
import { REQUEST_VERSION } from "../../../GlobalConstants";
import { generateUrlHash } from "../../../helpers/searchHelper";

const propTypes = {
    category: PropTypes.string,
    results: PropTypes.array,
    total: PropTypes.number,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    dataParams: PropTypes.object
};

const TopFive = (props) => {
    const [linkData, setLinkData] = useState();
    const [agencySlugs, , , slugsLoading, slugsError] = useAgencySlugs();

    const columns = [
        {
            title: 'name',
            displayName: 'Name'
        },
        {
            title: 'amount',
            displayName: ["Obligations"]

        },
        {
            title: 'percent',
            displayName: ["% of Total"]
        },
        {
            title: 'link',
            displayName: ['View in Award Search']
        }
    ];

    const getSelectedLink = (e, data) => {
        e.preventDefault();
        e.stopPropagation();
        setLinkData(data);
    };

    const tableRows = props.results?.map((result) => {
        const percentValue = (result._amount / props.total) * 100;
        const percent = isNaN(percentValue) ? '--' : `${Math.round(percentValue * 100) / 100}%`;
        const linkText = props.category === "awards" ? "View this Award" : "View Awards";
        return [result._slug ? result.linkedName : result.name, result.amount, percent,
            <a
                role="button"
                tabIndex={0}
                aria-label="View awards"
                onKeyDown={(e) => {
                    if (e.key === "Enter") getSelectedLink(e, result.name);
                }}
                onClick={(e) => getSelectedLink(e, result)}>
                {linkText}
            </a>];
    });

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
        else if (params.category === "defc") {
            // TODO awaiting backend changes
            // categoryFilter = {
            //     defCodes: {
            //         require: [linkData._code],
            //         exclude: [],
            //         counts: [
            //             {
            //                 label: linkData._name,
            //                 value: linkData._code,
            //                 count: 1
            //             }
            //         ]
            //     }
            // };
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
        else if (params.category === "awards") {
            categoryFilter = {
                selectedAwardIDs: {
                    [linkData._name]: linkData._name
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
            <Table
                classNames={['topfive-table__table']}
                columns={columns}
                rows={tableRows}
                loading={props.loading}
                error={props.error} />
        </div>
    );
};

TopFive.propTypes = propTypes;

export default TopFive;

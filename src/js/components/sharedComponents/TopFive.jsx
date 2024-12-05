/**
 * TopFive.jsx
 * Created by Kevin Li 5/15/18
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, TooltipWrapper } from 'data-transparency-ui';
import { categoryTitles } from 'dataMapping/topCategories';
import { useAgencySlugs } from 'containers/agency/WithAgencySlugs';
import { initialState as defaultFilters } from 'redux/reducers/search/searchFiltersReducer';
import { isCancel } from "axios";

import { CondensedCDTooltip } from '../award/shared/InfoTooltipContent';
import { stateFIPSByAbbreviation, stateNameByFipsId } from "../../dataMapping/state/stateNames";
import { REQUEST_VERSION } from "../../GlobalConstants";
import { generateUrlHash } from "../../helpers/searchHelper";

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
            displayName: [<span>View in <span style={{ whiteSpace: "nowrap" }}>Award Search</span></span>]
        }
    ];

    // TODO: remove once award links get added to Recipient Page
    if (props.dataParams.filters?.recipient_id) {
        columns.pop();
    }

    const getSelectedLink = (e, data) => {
        e.preventDefault();
        e.stopPropagation();
        setLinkData(data);
    };

    const tableRows = props.results?.map((result) => {
        const percentValue = (result._amount / props.total) * 100;
        const percent = (!isNaN(percentValue) && isFinite(percentValue)) ? `${Math.round(percentValue * 100) / 100}%` : '--';
        const linkText = props.category === "awards" ? "View this award" : "View awards";

        // return [result._slug ? result.linkedName : result.name, result.amount, percent,
        const rowArray = [
            result._slug ? result.linkedName : result.name,
            result.amount,
            percent,
            <a
                role="button"
                tabIndex={0}
                aria-label="View awards"
                onKeyDown={(e) => {
                    if (e.key === "Enter") getSelectedLink(e, result.name);
                }}
                onClick={(e) => getSelectedLink(e, result)}>
                {linkText}
            </a>
        ];

        // TODO: remove once award links get added to Recipient Page
        if (props.dataParams.filters?.recipient_id) {
            rowArray.pop();
        }

        return rowArray;
    });

    const createLink = () => {
        const params = props.dataParams;
        // set filter to either be pop locations for state page, or recipient_id for recipient page
        const filter = params.filters?.place_of_performance_locations ? params.filters?.place_of_performance_locations[0] : params.filters?.recipient_id;

        let fips;
        let stateName;
        let categoryFilter;
        let locationFilter;

        // only set initial location filter if state page and not recipient page
        if (params.filters?.place_of_performance_locations) {
            fips = stateFIPSByAbbreviation[filter.state];
            stateName = stateNameByFipsId[fips];

            locationFilter = {
                selectedLocations: {
                    [`${filter.country}_${filter.state}`]: {
                        identifier: `${filter.country}_${filter.state}`,
                        filter: {
                            country: filter.country,
                            state: filter.state
                        },
                        display: {
                            entity: "State",
                            standalone: stateName,
                            title: stateName
                        }
                    }
                }
            };
        }

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
            categoryFilter = {
                selectedAwardingAgencies: {
                    [`${linkData.id}_toptier`]: {
                        id: linkData.id,
                        toptier_flag: false,
                        toptier_agency: {
                            toptier_code: agencySlugs[linkData.agency_slug],
                            abbreviation: linkData.agency_abbreviation,
                            name: linkData.agency_name
                        },
                        subtier_agency: {
                            abbreviation: linkData._code,
                            name: linkData._name
                        },
                        agencyType: "subtier"
                    }
                }
            };
        }
        else if (params.category === "defc") {
            categoryFilter = {
                defCodes: {
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
        else if (params.category === 'recipient') {
            categoryFilter = { selectedRecipients: [linkData._name] };
        }
        else if (params.category === 'county') {
            locationFilter = {
                selectedLocations: {
                    [`${filter.country}_${filter.state}_${linkData._code}`]: {
                        identifier: `${filter.country}_${filter.state}_${linkData._code}`,
                        filter: {
                            country: filter.country,
                            state: filter.state,
                            county: linkData._code
                        },
                        display: {
                            entity: "County",
                            standalone: `${linkData._name}, ${filter.state}`,
                            title: linkData._name
                        }
                    }
                }
            };
        }
        else if (params.category === 'district') {
            locationFilter = {
                selectedLocations: {
                    [`${filter.country}_${filter.state}_${linkData._code}`]: {
                        identifier: `${filter.country}_${filter.state}_${linkData._code}`,
                        filter: {
                            country: filter.country,
                            state: filter.state,
                            district_current: linkData._code
                        },
                        display: {
                            entity: "Current congressional district",
                            standalone: `${linkData._name}, ${filter.state}`,
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
        else if (params.category === 'federal_account') {
            // to be used on recipient page, once design approves links
            // TODO: in future ticket, update to be able to link to TAS advanced search
            categoryFilter = {
                tasCodes: {
                    require: [[linkData._code]],
                    exclude: [],
                    counts: [
                        {
                            label: linkData._name,
                            value: linkData._code,
                            count: 2
                        }
                    ]
                }
            };
        }
        else if (params.category === 'country') {
            // to be used on recipient page, once design approves links
            locationFilter = {
                selectedLocations: {
                    [`${linkData._code}`]: {
                        identifier: `${linkData._code}`,
                        filter: {
                            country: linkData._code
                        },
                        display: {
                            entity: "Country",
                            standalone: `${linkData._name}`,
                            title: linkData._name
                        }
                    }
                }
            };
        }
        else if (params.category === 'state_territory') {
            // to be used on recipient page, once design approves links
            locationFilter = {
                selectedLocations: {
                    [`USA_${linkData._code}`]: {
                        identifier: `USA_${linkData._code}`,
                        filter: {
                            country: 'USA',
                            state: linkData._code
                        },
                        display: {
                            entity: "State or Territory",
                            standalone: `${linkData._name}`,
                            title: linkData._name
                        }
                    }
                }
            };
        }

        let awardTypeFilter;

        if (params.filters.award_type_codes?.length > 0) {
            awardTypeFilter = {
                awardType: params.filters.award_type_codes
            };
        }

        if (params.filters?.recipient_id) {
            categoryFilter = {
                ...categoryFilter,
                selectedRecipients: [params.filters?.recipient_name]

            };
        }

        const timePeriodFilter = [{ start_date: params.filters.time_period[0].start_date, end_date: params.filters.time_period[0].end_date }];

        const filterValue = {
            filters: {
                ...defaultFilters,
                ...categoryFilter,
                ...locationFilter,
                timePeriodType: 'dr',
                time_period: timePeriodFilter,
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
                if (isCancel(error)) {
                    // Got cancelled
                }
                else if (error.response) {
                    // Errored out but got response
                    tempHash = null;
                    console.log(error);
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
                classNames="topfive-table__table"
                columns={columns}
                rows={tableRows}
                loading={props.loading}
                error={props.error} />
        </div>
    );
};

TopFive.propTypes = propTypes;

export default TopFive;

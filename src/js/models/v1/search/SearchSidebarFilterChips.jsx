/**
 * SearchSidebarFilterChips.js
 * Created by Josue Aguilar on 02/03/2025.
 */
import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { recipientTypes } from 'dataMapping/search/recipientType';
import SearchAwardsOperation from "./SearchAwardsOperation";
import ShownValue from "../../../components/search/filters/otherFilters/ShownValue";
import * as searchFilterActions from "../../../redux/actions/search/searchFilterActions";
import { removeStagedTasFilter } from "../../../helpers/tasHelper";
import { formatAwardAmountRange } from "../../../helpers/awardAmountHelper";
import { awardTypeCodes } from "../../../dataMapping/search/awardType";
import {
    extentCompetedDefinitions,
    pricingTypeDefinitions,
    setAsideDefinitions
} from "../../../dataMapping/search/contractFields";

const propTypes = {
    filters: PropTypes.object,
    category: PropTypes.string,
    tasCounts: PropTypes.array,
    tasNodes: PropTypes.array,
    tasChecked: PropTypes.array,
    naicsCounts: PropTypes.array,
    pscCounts: PropTypes.array
};

const SearchSidebarFilterChips = ({
    filters, category, tasCounts, tasNodes, tasChecked, naicsCounts, pscCounts, ...props
}) => {
    let filtersData;
    const chips = [];

    const dataFromState = () => {
        filtersData = new SearchAwardsOperation();
        filtersData.fromState(filters);
        filtersData.covidDefCode = filters.covidDefCode.toArray();
        filtersData.infraDefCode = filters.infraDefCode.toArray();
    };

    const getLocationChips = () => {
        // Add Locations
        if (filtersData.selectedLocations?.length > 0) {
            filtersData.selectedLocations.forEach((location) => {
                const removeFilter = (e) => {
                    e.stopPropagation();
                    const newValue = filters.selectedLocations.delete(location.identifier);
                    props.updateGenericFilter({
                        type: 'selectedLocations',
                        value: newValue
                    });
                };

                chips.push(
                    <ShownValue
                        label={location.display.title}
                        removeValue={removeFilter} />);
            });
        }

        if (filtersData.selectedRecipientLocations?.length > 0) {
            filtersData.selectedRecipientLocations.forEach((location) => {
                const removeFilter = (e) => {
                    e.stopPropagation();
                    const newValue = filters.selectedRecipientLocations.delete(location.identifier);
                    props.updateGenericFilter({
                        type: 'selectedRecipientLocations',
                        value: newValue
                    });
                };

                chips.push(
                    <ShownValue
                        label={location.display.title}
                        removeValue={removeFilter} />);
            });
        }
    };

    const getTimePeriodChips = () => {
        if (filtersData.timePeriodFY?.length > 0 || filtersData.time_period?.length > 0) {
            if (filtersData.timePeriodType === 'dr' && filtersData.time_period?.length > 0) {
                const timePeriodArray = [];

                filtersData.time_period.forEach((timePeriod, index) => {
                    const removeDateRange = (e) => {
                        e.stopPropagation();
                        props.updateTimePeriodArray({
                            dateType: 'dr',
                            startDate: null,
                            endDate: null,
                            event: e,
                            removeFilter: true
                        });
                    };

                    timePeriodArray.push((
                        <button
                            key={index}
                            className="shown-filter-button"
                            title="Click to remove filter."
                            data-index={index}
                            aria-label={`Applied date range: ${timePeriod.start_date} to ${timePeriod.end_date}`}
                            onClick={removeDateRange}>
                            {timePeriod.start_date} to {timePeriod.end_date}
                            <span className="close">
                                <FontAwesomeIcon icon="times" data-index={index} />
                            </span>
                        </button>
                    ));
                });

                chips.push((
                    <div
                        className="selected-filters"
                        id="selected-date-range"
                        role="status">
                        {timePeriodArray}
                    </div>
                ));
            }
            else if (filtersData.timePeriodType === 'fy' && filtersData.timePeriodFY?.length > 0) {
                filtersData.timePeriodFY.forEach((fy) => {
                    const removeFY = (e) => {
                        e.stopPropagation();
                        const newFilters = filters.timePeriodFY.delete(fy);
                        props.updateTimePeriod({ fy: newFilters, dateType: 'fy' });
                    };

                    chips.push(
                        <ShownValue
                            label={fy}
                            removeValue={removeFY} />
                    );
                });
            }
        }
    };

    const getCharacteristicsChips = () => {
        if (filtersData.awardDescription) {
            const removeAwardsDescription = (e) => {
                e.stopPropagation();
                props.updateGenericFilter({
                    type: 'awardDescription',
                    value: ''
                });
            };

            chips.push(
                <ShownValue
                    label={filtersData.awardDescription}
                    removeValue={removeAwardsDescription} />
            );
        }

        if (filtersData.selectedAwardIDs?.length > 0) {
            filtersData.selectedAwardIDs.forEach((id) => {
                const removeAwardID = (e) => {
                    e.stopPropagation();
                    const awardId = filters.selectedAwardIDs.delete(id);

                    props.updateGenericFilter({
                        type: 'selectedAwardIDs',
                        value: awardId
                    });
                };

                chips.push(
                    <ShownValue
                        label={`${id} | Award ID`}
                        removeValue={removeAwardID} />
                );
            });
        }

        if (filtersData.awardAmounts?.length > 0 && filtersData.awardAmounts?.[0].length > 0) {
            const firstValue = filtersData.awardAmounts[0][0];
            const secondValue = filtersData.awardAmounts[0][1];
            let key;

            if (firstValue === null && secondValue === 1000000) {
                key = 'range-0';
            }
            else if (firstValue === 1000000 && secondValue === 25000000) {
                key = 'range-1';
            }
            else if (firstValue === 25000000 && secondValue === 100000000) {
                key = 'range-2';
            }
            else if (firstValue === 100000000 && secondValue === 500000000) {
                key = 'range-3';
            }
            else if (firstValue === 500000000 && secondValue === null) {
                key = 'range-4';
            }
            else {
                key = 'specific';
            }

            const removeAwardAmount = (e) => {
                e.stopPropagation();
                const newValue = filters.awardAmounts.delete(key);
                props.updateGenericFilter({
                    type: 'awardAmounts',
                    value: newValue
                });
            };

            chips.push(
                <ShownValue
                    label={formatAwardAmountRange(filtersData.awardAmounts[0], 2)}
                    removeValue={removeAwardAmount} />
            );
        }

        if (filtersData.awardType?.length > 0) {
            filtersData.awardType.forEach((type) => {
                const removeAwardType = (e) => {
                    e.stopPropagation();
                    const newValue = filters.awardType.delete(type);
                    props.updateGenericFilter({
                        type: 'awardType',
                        value: newValue
                    });
                };

                chips.push(
                    <ShownValue
                        label={`Contract Award Type: ${awardTypeCodes[type]}`}
                        removeValue={removeAwardType} />
                );
            });
        }

        if (filtersData.naicsCodes.require?.length > 0) {
            naicsCounts.forEach(({ value, label, count }) => {
                const removeNaics = (e) => {
                    e.stopPropagation();
                    console.log('naics:', `${value} - ${label} (${count})`);
                    // TODO: This doesn't work yet. Fix.
                    // removeStagedTasFilter(tasNodes, tasChecked, value);
                };

                chips.push(
                    <ShownValue
                        label={`${value} - ${label} (${count})`}
                        removeValue={removeNaics} />
                );
            });
        }

        if (filtersData.pscCheckbox.require?.length > 0) {
            pscCounts.forEach(({ value, label, count }) => {
                const removePsc = (e) => {
                    e.stopPropagation();
                    console.log('psc:', `${value} - ${label} (${count})`);
                    // TODO: This doesn't work yet. Fix.
                    // removeStagedTasFilter(tasNodes, tasChecked, value);
                };

                chips.push(
                    <ShownValue
                        label={`${value} - ${label} (${count})`}
                        removeValue={removePsc} />
                );
            });
        }

        if (filtersData.pricingType?.length > 0) {
            filtersData.pricingType.forEach((type) => {
                const removePricingType = (e) => {
                    e.stopPropagation();
                    const newValue = filters.pricingType.delete(type);
                    props.updateGenericFilter({
                        type: 'pricingType',
                        value: newValue
                    });
                };

                chips.push(
                    <ShownValue
                        label={`Pricing Type | ${pricingTypeDefinitions[type]}`}
                        removeValue={removePricingType} />
                );
            });
        }

        if (filtersData.setAside?.length > 0) {
            filtersData.setAside.forEach((type) => {
                const removePricingType = (e) => {
                    e.stopPropagation();
                    const newValue = filters.setAside.delete(type);
                    props.updateGenericFilter({
                        type: 'setAside',
                        value: newValue
                    });
                };

                chips.push(
                    <ShownValue
                        label={`Set Aside | ${setAsideDefinitions[type]}`}
                        removeValue={removePricingType} />
                );
            });
        }

        if (filtersData.extentCompeted?.length > 0) {
            filtersData.extentCompeted.forEach((type) => {
                const removePricingType = (e) => {
                    e.stopPropagation();
                    const newValue = filters.extentCompeted.delete(type);
                    props.updateGenericFilter({
                        type: 'extentCompeted',
                        value: newValue
                    });
                };

                chips.push(
                    <ShownValue
                        label={`Extent Competed | ${extentCompetedDefinitions[type]}`}
                        removeValue={removePricingType} />
                );
            });
        }
    };

    const getRecipientChips = () => {
        if (filtersData.selectedRecipients?.length > 0) {
            filters.selectedRecipients.forEach((recipient) => {
                const removeRecipient = (e) => {
                    e.stopPropagation();
                    props.updateSelectedRecipients(recipient);
                };

                chips.push(
                    <ShownValue
                        label={recipient}
                        removeValue={removeRecipient} />
                );
            });
        }

        if (filtersData.recipientType?.length > 0) {
            filtersData.recipientType.forEach((type) => {
                const removeRecipientType = (e) => {
                    e.stopPropagation();
                    const newRecipientTypes = filters.recipientType.delete(type);
                    props.updateGenericFilter({
                        type: 'recipientType',
                        value: newRecipientTypes
                    });
                };

                chips.push(
                    <ShownValue
                        label={recipientTypes[type]}
                        removeValue={removeRecipientType} />
                );
            });
        }
    };

    const getSourcesChips = () => {
        if (filtersData.awardingAgencies?.length > 0) {
            filtersData.awardingAgencies.forEach((agency) => {
                const removeAwardingAgency = (e) => {
                    e.stopPropagation();
                    props.updateSelectedAwardingAgencies({ agency });
                };

                chips.push(
                    <ShownValue
                        label={`Award | ${agency.subtier_agency.name}`}
                        removeValue={removeAwardingAgency} />
                );
            });
        }

        if (filtersData.fundingAgencies?.length > 0) {
            filtersData.fundingAgencies.forEach((agency) => {
                const removeFundingAgencies = (e) => {
                    e.stopPropagation();
                    props.updateSelectedFundingAgencies({ agency });
                };

                chips.push(
                    <ShownValue
                        label={`Fund | ${agency.subtier_agency.name}`}
                        removeValue={removeFundingAgencies} />
                );
            });
        }

        if (filtersData.tasSources?.length > 0 || filtersData.tasCheckbox.require?.length > 0) {
            tasCounts.forEach(({ value, label, count }) => {
                const removeTas = (e) => {
                    e.stopPropagation();
                    console.log('tas:', `${value} - ${label} (${count})`);
                    // TODO: This doesn't work yet. Fix.
                    removeStagedTasFilter(tasNodes, tasChecked, value);
                };

                chips.push(
                    <ShownValue
                        label={`${value} - ${label} (${count})`}
                        removeValue={removeTas} />
                );
            });
        }

        if (filtersData.covidDefCode?.length > 0) {
            filtersData.covidDefCode.forEach((covid) => {
                const removeCovidDefCodes = (e) => {
                    e.stopPropagation();
                    props.toggleCovidDefCode({ value: covid });
                };

                chips.push(
                    <ShownValue
                        label={`COVID-19 Spending (${covid})`}
                        removeValue={removeCovidDefCodes} />
                );
            });
        }

        if (filtersData.infraDefCode?.length > 0) {
            filtersData.infraDefCode.forEach((infra) => {
                const removeInfraDefCodes = (e) => {
                    e.stopPropagation();
                    props.toggleInfraDefCode({ value: infra });
                };

                chips.push(
                    <ShownValue
                        label={`Infrastructure Spending (${infra})`}
                        removeValue={removeInfraDefCodes} />
                );
            });
        }
    };

    dataFromState();

    switch (category) {
        case 'location':
            getLocationChips();
            break;
        case 'timePeriod':
            getTimePeriodChips();
            break;
        case 'characteristics':
            getCharacteristicsChips();
            break;
        case 'recipients':
            getRecipientChips();
            break;
        case 'sources':
            getSourcesChips();
            break;
        default:
            console.log('ERROR: Invalid Category Type');
    }

    return (chips);
};

SearchSidebarFilterChips.propTypes = propTypes;
export default connect(
    (state) => ({
        filters: state.filters,
        tasCounts: state.tas.counts.toJS(),
        tasNodes: state.tas.tas.toJS(),
        tasChecked: state.tas.checked.toJS(),
        naicsCounts: state.naics.counts.toJS(),
        pscCounts: state.psc.counts.toJS()
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(SearchSidebarFilterChips);

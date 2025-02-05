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

const propTypes = {
    filters: PropTypes.object,
    category: PropTypes.string,
    tasCounts: PropTypes.object,
    tasNodes: PropTypes.object,
    tasChecked: PropTypes.object
};

const SearchSidebarFilterChips = ({
    filters, category, tasCounts, tasNodes, tasChecked, ...props
}) => {
    let filtersData;
    const chips = [];

    const dataFromState = () => {
        filtersData = new SearchAwardsOperation();
        filtersData.fromState(filters);
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
            tasCounts.forEach((tas) => {
                const removeTas = (e) => {
                    e.stopPropagation();
                    console.log('tas:', `${tas.value} - ${tas.label} (${tas.count})`);
                    // TODO: This doesn't work yet. Fix.
                    removeStagedTasFilter(tasNodes, tasChecked, tas.value);
                };

                chips.push(
                    <ShownValue
                        label={`${tas.value} - ${tas.label} (${tas.count})`}
                        removeValue={removeTas} />
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
        tasChecked: state.tas.checked.toJS()
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(SearchSidebarFilterChips);

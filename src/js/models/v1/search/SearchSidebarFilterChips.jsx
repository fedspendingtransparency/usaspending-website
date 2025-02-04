/**
 * SearchSidebarFilterChips.js
 * Created by Josue Aguilar on 02/03/2025.
 */
import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import SearchAwardsOperation from "./SearchAwardsOperation";
import ShownValue from "../../../components/search/filters/otherFilters/ShownValue";
import * as searchFilterActions from "../../../redux/actions/search/searchFilterActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    filters: PropTypes.object,
    category: PropTypes.string
};

const SearchSidebarFilterChips = ({ filters, category, ...props }) => {
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
        const timePeriodArray = [];
        if (filtersData.timePeriodFY?.length > 0 || filtersData.time_period?.length > 0) {
            if (filtersData.timePeriodType === 'dr' && filtersData.time_period?.length > 0) {
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
            }
        }

        chips.push((
            <div
                className="selected-filters"
                id="selected-date-range"
                role="status">
                {timePeriodArray}
            </div>
        ));
    };

    dataFromState();

    switch (category) {
        case 'location':
            getLocationChips();
            break;
        case 'timePeriod':
            getTimePeriodChips();
            break;
        default:
            console.log('ERROR: Invalid Category Type');
    }

    return (chips);
};

SearchSidebarFilterChips.propTypes = propTypes;
export default connect((state) => ({ filters: state.filters }), (dispatch) => bindActionCreators(searchFilterActions, dispatch))(SearchSidebarFilterChips);

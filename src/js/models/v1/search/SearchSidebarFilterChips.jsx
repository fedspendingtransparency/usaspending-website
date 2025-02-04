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

const propTypes = {
    filters: PropTypes.object,
    category: PropTypes.string
};

const SearchSidebarFilterChips = ({ filters, category, ...props }) => {
    let filtersData;
    const chipArray = [];

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

                chipArray.push(
                    <ShownValue
                        label={location.display.title}
                        removeValue={removeFilter} />);
            });
        }
    };

    dataFromState();

    switch (category) {
        case 'location':
            getLocationChips();
            break;
        default:
            console.log('ERROR: Invalid Category Type');
    }

    return (chipArray);
};

SearchSidebarFilterChips.propTypes = propTypes;
export default connect((state) => ({ filters: state.filters }), (dispatch) => bindActionCreators(searchFilterActions, dispatch))(SearchSidebarFilterChips);

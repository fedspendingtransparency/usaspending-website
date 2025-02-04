/**
 * SearchSidebarFilterChips.js
 * Created by Josue Aguilar on 02/03/2025.
 */
import React, { useEffect, useRef } from 'react';
import { connect } from "react-redux";
import {
    setAboutTheDataTermFromUrl,
    showAboutTheData
} from "../../../redux/actions/aboutTheDataSidebar/aboutTheDataActions";
import { setLastOpenedSlideout } from "../../../redux/actions/slideouts/slideoutActions";
import SearchAwardsOperation from "./SearchAwardsOperation";
import ShownValue from "../../../components/search/filters/otherFilters/ShownValue";


const SearchSidebarFilterChips = ({ filters, category }) => {
    let filtersData;
    const chipArray = [];

    const dataFromState = () => {
        filtersData = new SearchAwardsOperation();
        filtersData.fromState(filters);
        console.log('filtersData:', filtersData);
    };

    const getLocationChips = () => {
        // Add Locations
        if (filtersData.selectedLocations?.length > 0) {
            filtersData.selectedLocations.forEach((location) => {
                const removeFilter = (e) => {
                    e.stopPropagation();
                    console.log('removeFilter:', location.identifier);
                    const newValue = this.props.selectedLocations.delete(location.identifier);
                    this.props.updateGenericFilter({
                        type: 'selectedRecipientLocations',
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
            console.log('no chips');
    }

    return (chipArray);
};

const mapDispatchToProps = (dispatch) => ({
    openATD: () => dispatch(showAboutTheData()),
    setATDTerm: (term) => dispatch(setAboutTheDataTermFromUrl(term)),
    setSlideout: (str) => dispatch(setLastOpenedSlideout(str))
});

export default connect((state) => ({ filters: state.filters }), mapDispatchToProps)(SearchSidebarFilterChips);

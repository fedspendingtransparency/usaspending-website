/**
 * LocationAutocomplete.jsx
 * Created by Andrea Blackwell 10/2024
 */

import React from "react";
import { Button } from "data-transparency-ui";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import SelectedLocations from "./SelectedLocations";
import Autocomplete from "../../../sharedComponents/autocomplete/Autocomplete";
import AllForgeinLocationButton from "./AllForeignLocationsButton";

const propTypes = {
    activeTab: PropTypes.string,
    locations: PropTypes.arrayOf(PropTypes.object),
    handleTextInput: PropTypes.func,
    selectItem: PropTypes.func,
    clearAutocompleteSuggestions: PropTypes.func,
    noResults: PropTypes.bool,
    readyToStage: PropTypes.bool,
    addLocation: PropTypes.func,
    isLoading: PropTypes.bool,
    setIsForeign: PropTypes.func
};

const LocationAutocomplete = ({
    activeTab,
    locations,
    handleTextInput,
    selectItem,
    clearAutocompleteSuggestions,
    noResults,
    readyToStage,
    addLocation,
    isLoading,
    setIsForeign
}) => {
    const {
        recipientDomesticForeign,
        locationDomesticForeign,
        selectedLocations,
        selectedRecipientLocations
    } = useSelector((state) => state.filters);

    const domesticForeign = activeTab === 'recipient' ?
        recipientDomesticForeign :
        locationDomesticForeign;
    const isForeign = domesticForeign === 'foreign';

    const locationCount = activeTab === 'recipient' ?
        selectedRecipientLocations.count() :
        selectedLocations.count();
    const locationButtonDisabled = locationCount > 0;

    const onClick = (e) => {
        e.preventDefault();
        addLocation();
    };

    return (
        <div id={activeTab}>
            <div className={`location-autocomplete ${activeTab}`}>
                <Autocomplete
                    values={locations}
                    handleTextInput={handleTextInput}
                    onSelect={selectItem}
                    clearAutocompleteSuggestions={clearAutocompleteSuggestions}
                    noResults={noResults}
                    placeholder="Search for a location..."
                    isLoading={isLoading}
                    retainValue
                    disabled={isForeign} />
                <Button
                    additionalClassnames="submit-button"
                    copy="Add"
                    buttonTitle="Add"
                    buttonSize="sm"
                    buttonType="primary"
                    backgroundColor="light"
                    disabled={!readyToStage}
                    onClick={onClick} />
            </div>
            <AllForgeinLocationButton
                filter="location"
                isForeign={isForeign}
                setIsForeign={setIsForeign}
                disabled={locationButtonDisabled} />
            <SelectedLocations
                activeTab={activeTab}
                key={`selected-location-${activeTab}`} />
        </div>
    );
};

LocationAutocomplete.propTypes = propTypes;
export default LocationAutocomplete;

/**
 * LocationAutocomplete.jsx
 * Created by Andrea Blackwell 10/2024
 */

import React, { useState, useEffect } from "react";
import { Button } from "data-transparency-ui";
import PropTypes from "prop-types";
import SelectedLocations from "./SelectedLocations";
import Autocomplete from "../../../sharedComponents/autocomplete/Autocomplete";

const propTypes = {
    activeTab: PropTypes.string,
    locations: PropTypes.arrayOf(PropTypes.object),
    handleTextInput: PropTypes.func,
    selectItem: PropTypes.func,
    clearAutocompleteSuggestions: PropTypes.func,
    noResults: PropTypes.bool,
    readyToStage: PropTypes.bool,
    addLocation: PropTypes.func,
    selectedLocations: PropTypes.object,
    selectedRecipientLocations: PropTypes.object,
    removeLocation: PropTypes.func,
    isLoading: PropTypes.bool
};

const LocationAutocomplete = (props) => {
    const [activeTab, setActiveTab] = useState(props.activeTab);

    useEffect(() => {
        setActiveTab(props.activeTab);
    }, [props.activeTab]);

    const addLocation = (e) => {
        e.preventDefault();
        props.addLocation();
    };

    return (
        <div id={activeTab}>
            <div className={`location-autocomplete ${props.activeTab}`}>
                <Autocomplete
                    {...props}
                    values={props.locations}
                    handleTextInput={props.handleTextInput}
                    onSelect={props.selectItem}
                    clearAutocompleteSuggestions={props.clearAutocompleteSuggestions}
                    noResults={props.noResults}
                    placeholder="Search for a location..."
                    isLoading={props.isLoading}
                    retainValue />
                <Button
                    additionalClassnames="submit-button"
                    copy="Add"
                    buttonTitle="Add"
                    buttonSize="sm"
                    buttonType="primary"
                    backgroundColor="light"
                    disabled={!props.readyToStage}
                    onClick={addLocation} />
            </div>
            <SelectedLocations
                id={activeTab}
                selectedLocations={props.selectedLocations}
                selectedRecipientLocations={props.selectedRecipientLocations}
                removeLocation={props.removeLocation}
                key={`selected-location-${props.activeTab}`} />
        </div>
    );
};

LocationAutocomplete.propTypes = propTypes;
export default LocationAutocomplete;

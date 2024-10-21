import React, { useState, useEffect } from "react";
import { Button } from "data-transparency-ui";
import SelectedLocations from "./SelectedLocations";
import Autocomplete from "../../../sharedComponents/autocomplete/Autocomplete";

const LocationAutocomplete = (props) => {
    const [activeTab, setActiveTab] = useState(props.activeTab);
    const [locationValue, setLocationValue] = useState(props.locations);
    useEffect(() => {
        setActiveTab(props.activeTab);
    }, [props.activeTab]);

    const addLocation = (e) => {
        e.preventDefault();
        props.addLocation();
        setLocationValue("");
    };

    return (
        <div id={activeTab}>
            <div className={`location-autocomplete ${props.activeTab}`}>
                <Autocomplete
                    values={props.locations}
                    handleTextInput={props.handleTextInput}
                    onSelect={props.selectItem}
                    clearAutocompleteSuggestions={props.clearAutocompleteSuggestions}
                    noResults={props.noResults}
                    placeholder="Search for a location..."
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

export default LocationAutocomplete;

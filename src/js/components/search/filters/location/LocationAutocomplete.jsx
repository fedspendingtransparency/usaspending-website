import React, { useState, useEffect } from "react";
import { Button } from "data-transparency-ui";
import SelectedLocations from "./SelectedLocations";
import Autocomplete from "../../../sharedComponents/autocomplete/Autocomplete";

const LocationAutocomplete = (props) => {
    const [activeTab, setActiveTab] = useState(props.activeTab);

    useEffect(() => {
        setActiveTab(props.activeTab);
    }, [props.activeTab]);

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
                    onClick={props.addLocation} />
            </div>
            <SelectedLocations
                id={activeTab}
                selectedLocations={props.selectedLocations}
                removeLocation={props.removeLocation} />
        </div>
    );
};

export default LocationAutocomplete;

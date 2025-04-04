/**
 * SelectedLocations.jsx
 * Created by Emily Gullo 12/08/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';
import GlobalConstants from 'GlobalConstants';
import ShownLocation from './ShownLocation';
import { locationChipLabel } from "../../../../helpers/searchHelper";

const propTypes = {
    selectedLocations: PropTypes.object,
    selectedRecipientLocations: PropTypes.object,
    removeLocation: PropTypes.func,
    id: PropTypes.string
};

const SelectedLocations = ({
    selectedLocations, selectedRecipientLocations, removeLocation, id
}) => {
    const shownLocations = [];
    let selectedLocationsObj = selectedLocations;
    let labelPrefix = 'Place of Performance';

    if (id === "recipient" && GlobalConstants.QAT) {
        selectedLocationsObj = selectedRecipientLocations;
        labelPrefix = 'Recipient Location';
    }

    if (selectedLocationsObj?.size !== 0) {
        selectedLocationsObj?.entrySeq()
            .forEach((entry) => {
                const key = entry[0];
                const location = entry[1];
                const value = (
                    <ShownLocation
                        location={location}
                        label={`${labelPrefix}: ${locationChipLabel(location.display.entity, location)}`}
                        key={key}
                        removeLocation={() => removeLocation(key)} />
                );
                shownLocations.push(value);
            });
    }

    return (
        <div
            id="award-search-selected-locations"
            className="selected-filters"
            role="status">
            {shownLocations}
        </div>
    );
};

SelectedLocations.propTypes = propTypes;
export default SelectedLocations;

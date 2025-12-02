/**
 * SelectedLocations.jsx
 * Created by Emily Gullo 12/08/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

import ShownLocation from './ShownLocation';

const propTypes = {
    activeTab: PropTypes.string
};

const SelectedLocations = ({ activeTab }) => {
    const { selectedLocations, selectedRecipientLocations } = useSelector((state) => state.filters);

    const shownLocations = [];
    const selectedLocationsObj = activeTab === "recipient" ?
        selectedRecipientLocations : selectedLocations;

    if (selectedLocationsObj?.size !== 0) {
        selectedLocationsObj?.entrySeq()
            .forEach((entry) => {
                const key = entry[0];
                const location = entry[1];
                const value = (
                    <ShownLocation
                        id={key}
                        location={location}
                        activeTab={activeTab}
                        key={key} />
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

/**
 * ShownLocation.jsx
 * Created by Emily Gullo 12/08/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import ShownValue from '../otherFilters/ShownValue';
import { updateGenericFilter } from "../../../../redux/actions/search/searchFilterActions";
import { locationChipLabel } from "../../../../helpers/searchHelper";

const propTypes = {
    id: PropTypes.string,
    location: PropTypes.shape({
        display: PropTypes.object,
        filter: PropTypes.object,
        identifier: PropTypes.string
    }),
    activeTab: PropTypes.string
};

const ShownLocation = ({
    id, location, activeTab
}) => {
    const { selectedLocations, selectedRecipientLocations } = useSelector((state) => state.filters);
    const dispatch = useDispatch();

    const labelPrefix = activeTab === "recipient" ? 'Recipient Location' : 'Place of Performance';
    const label = `${labelPrefix}: ${locationChipLabel(location.display.entity, location)}`;
    const removeLocation = () => {
        const newValue = activeTab === 'recipient' ?
            {
                type: 'selectedRecipientLocations',
                value: selectedRecipientLocations.delete(id)
            } :
            {
                type: 'selectedLocations',
                value: selectedLocations.delete(id)
            };

        dispatch(updateGenericFilter(newValue));
    };

    return (
        <ShownValue label={label} removeValue={removeLocation} />
    );
};

ShownLocation.propTypes = propTypes;
export default ShownLocation;

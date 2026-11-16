/**
 * LocationAutocompleteContainer.jsx
 * Created by Josue Aguilar 8/15/2024
 */

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import LocationAutocomplete from
    '../../../../components/search/filters/location/LocationAutocomplete';
import {
    addPOPLocationObject,
    addRecipientLocationObject,
    updateDomesticForeignSelection,
    updateRecipientDomesticForeignSelection
} from '../../../../redux/actions/search/searchFilterActions';
import { createLocationObject } from '../../../../helpers/search/locationAutocompleteHelper';
import { useFipsIdByStateName, useStateFIPSByAbbreviation } from '../../../../hooks/useStateData';
import useFetchAllCountries from '../../resultsView/useFetchAllCountries';
import useFetchLocationAutocomplete from './useFetchLocationAutocomplete';

const propTypes = {
    activeTab: PropTypes.string
};

const LocationAutocompleteContainer = ({
    activeTab
}) => {
    // Call hooks at top level
    const fipsIdByStateName = useFipsIdByStateName();
    const stateFIPSByAbbreviation = useStateFIPSByAbbreviation();

    const [searchText, setSearchText] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [readyToStage, setReadyToStage] = useState(false);
    const [isDebouncing, setIsDebouncing] = useState(false);
    const {
        recipientDomesticForeign, locationDomesticForeign
    } = useSelector((state) => state.filters);
    const dispatch = useDispatch();
    const { countries } = useFetchAllCountries();

    const timeoutRef = useRef(null);

    const { locations, noResults, isLoading } = useFetchLocationAutocomplete(searchText);

    // Swapping to [] while the user types and back when the debounce fires gives Autocomplete
    // a new `values` reference, so the dropdown reopens even when the search text is unchanged.
    const suggestions = useMemo(
        () => (isDebouncing ? [] : locations),
        [isDebouncing, locations]
    );

    const createLocationObjectByType = (location) => {
        if (activeTab === 'recipient') {
            dispatch(addRecipientLocationObject(location));
        }
        else {
            dispatch(addPOPLocationObject(location));
        }
    };

    const clearAutocompleteSuggestions = useCallback(() => {
        window.clearTimeout(timeoutRef.current);
        setIsDebouncing(false);
        setSearchText('');
        setReadyToStage(false);
    }, []);

    const setIsForeign = useCallback(() => {
        clearAutocompleteSuggestions();
        const domesticForeign = activeTab === 'recipient' ?
            recipientDomesticForeign :
            locationDomesticForeign;
        const scope = domesticForeign === 'foreign' ? 'all' : 'foreign';

        if (activeTab === 'recipient') {
            dispatch(updateRecipientDomesticForeignSelection(scope));
        }
        else {
            dispatch(updateDomesticForeignSelection(scope));
        }
    }, [
        clearAutocompleteSuggestions,
        activeTab,
        recipientDomesticForeign,
        locationDomesticForeign,
        dispatch
    ]);

    const addLocation = () => {
        createLocationObject(selectedItem, countries, createLocationObjectByType, fipsIdByStateName, stateFIPSByAbbreviation);
        clearAutocompleteSuggestions();
    };

    const handleTextInput = (locationInput) => {
        const input = locationInput.target.value;
        window.clearTimeout(timeoutRef.current);
        // invalidate any prior selection and hide stale suggestions immediately so the
        // user can't pick or stage an item that no longer matches the input
        setReadyToStage(false);
        setIsDebouncing(true);

        timeoutRef.current = window.setTimeout(() => {
            setIsDebouncing(false);
            setSearchText(input);
        }, 1000);
    };

    const selectItem = (item, valid, obj) => {
        setSelectedItem(obj);
        setReadyToStage(true);
    };

    return (
        <LocationAutocomplete
            activeTab={activeTab}
            locations={suggestions}
            handleTextInput={handleTextInput}
            selectItem={selectItem}
            clearAutocompleteSuggestions={clearAutocompleteSuggestions}
            noResults={noResults}
            readyToStage={readyToStage}
            addLocation={addLocation}
            isLoading={isLoading}
            setIsForeign={setIsForeign} />
    );
};

LocationAutocompleteContainer.propTypes = propTypes;
export default LocationAutocompleteContainer;

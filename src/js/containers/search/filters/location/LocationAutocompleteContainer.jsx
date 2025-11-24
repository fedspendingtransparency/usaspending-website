/**
 * LocationAutocompleteContainer.jsx
 * Created by Josue Aguilar 8/15/2024
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import { isCancel } from "axios";
import PropTypes from "prop-types";

import { fetchLocations } from '../../../../helpers/searchHelper';
import LocationAutocomplete from
    "../../../../components/search/filters/location/LocationAutocomplete";
import { fetchLocationList } from "../../../../helpers/mapHelper";
import {
    addPOPLocationObject,
    addRecipientLocationObject,
    updateDomesticForeignSelection,
    updateRecipientDomesticForeignSelection
} from "../../../../redux/actions/search/searchFilterActions";
import {
    getLocationObject,
    getParsedLocations
} from "../../../../helpers/search/locationAutocompleteHelper";

const propTypes = {
    activeTab: PropTypes.string
};

const LocationAutocompleteContainer = ({
    activeTab
}) => {
    const [locations, setLocations] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [readyToStage, setReadyToStage] = useState(false);
    const [countriesList, setCountriesList] = useState([]);
    const [isForeign, setIsForeign] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const listRequest = useRef(null);
    let timeout;

    const createLocationObjectByType = (location) => {
        if (activeTab === 'recipient') {
            dispatch(addRecipientLocationObject(location));
        }
        else {
            dispatch(addPOPLocationObject(location));
        }
    };

    const loadCountries = () => {
        if (listRequest.current) {
            listRequest.current.cancel();
            setIsLoading(false);
        }

        listRequest.current = fetchLocationList("countries");
        listRequest.current.promise
            .then((res) => {
                listRequest.current = null;
                setCountriesList(res?.data?.countries);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    setIsLoading(false);
                }
            });
    };

    useEffect(() => {
        loadCountries();
    }, []);

    const clearAutocompleteSuggestions = useCallback(() => {
        setLocations([]);
        setReadyToStage(false);
        setIsLoading(false);
    }, []);

    const test = useCallback(() => {
        setIsForeign(!isForeign);
        clearAutocompleteSuggestions();
        const domesticForeign = isForeign ? 'all' : 'foreign';

        if (activeTab === 'recipient') {
            dispatch(updateRecipientDomesticForeignSelection(domesticForeign));
        }
        else {
            dispatch(updateDomesticForeignSelection(domesticForeign));
        }
    }, [isForeign, clearAutocompleteSuggestions, activeTab, dispatch]);

    const addLocation = () => {
        getLocationObject(selectedItem, countriesList, createLocationObjectByType);
        clearAutocompleteSuggestions();
    };

    const parseLocations = ({
        countries,
        states,
        counties,
        cities,
        zip_codes: zipCodes,
        districts_current: districtsCurrent,
        districts_original: districtsOriginal
    }, count) => {
        setNoResults(false);
        clearAutocompleteSuggestions();

        if (count === 0) {
            setNoResults(true);
            setIsLoading(false);
            return;
        }

        const locationsList = getParsedLocations(
            countries,
            states,
            counties,
            cities,
            zipCodes,
            districtsCurrent,
            districtsOriginal
        );

        if (count > 5) {
            setLocations(locationsList.splice(0, 5));
        }
        else {
            setLocations(locationsList);
        }
    };

    const queryAutocompleteLocations = (input) => {
        let locationSearchRequests;
        if (input.length >= 3) {
            const locationSearchParams = {
                search_text: input,
                limit: 5
            };

            locationSearchRequests = fetchLocations(locationSearchParams);
            setIsLoading(true);
            locationSearchRequests.promise
                .then((res) => {
                    parseLocations(res.data.results, res.data.count);
                })
                .catch((err) => {
                    console.log('error: ', err);
                    setIsLoading(false);
                });
        }
        else if (locationSearchRequests) {
            locationSearchRequests.cancel();
            setIsLoading(false);
        }
    };

    const handleTextInput = (locationInput) => {
        const input = locationInput.target.value;
        window.clearTimeout(timeout);

        timeout = window.setTimeout(() => {
            queryAutocompleteLocations(input);
        }, 1000);
    };

    const selectItem = (item, valid, obj) => {
        setSelectedItem(obj);
        setReadyToStage(true);
    };

    return (
        <LocationAutocomplete
            activeTab={activeTab}
            locations={locations}
            handleTextInput={handleTextInput}
            selectItem={selectItem}
            clearAutocompleteSuggestions={clearAutocompleteSuggestions}
            noResults={noResults}
            readyToStage={readyToStage}
            addLocation={addLocation}
            isLoading={isLoading}
            isForeign={isForeign}
            setIsForeign={test} />
    );
};

LocationAutocompleteContainer.propTypes = propTypes;
export default LocationAutocompleteContainer;

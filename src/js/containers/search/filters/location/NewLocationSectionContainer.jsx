/**
 * NewLocationSectionContainer.jsx
 * Created by Josue Aguilar 8/15/2024
 */

import React, { useState } from 'react';
import { fetchLocations } from 'helpers/searchHelper';
import Autocomplete from "../../../../components/sharedComponents/autocomplete/Autocomplete";
import LocationEntity from "../../../../models/v2/search/LocationEntity";

const NewLocationSectionContainer = () => {
    const [locations, setLocations] = useState([]);
    const [noResults, setNoResults] = useState(false);

    let timeout;

    const locationSort = (array, key) => array.sort((a, b) => a[key].localeCompare(b[key]));

    const citySort = (cityArray) => {
        /* eslint-disable camelcase */
        const newCityArray = cityArray.map((city) => {
            if (city.country_name === 'UNITED STATES') {
                return {
                    ...city,
                    city_name_update: `${city.city_name}, ${city.state_name}`
                };
            }

            return {
                ...city,
                city_name_update: `${city.city_name}, ${city.country_name}`
            };
        });
        /* eslint-enable camelcase */
        return locationSort(newCityArray, 'city_name_update');
    };

    const clearAutocompleteSuggestions = () => {
        setLocations([]);
    };

    const parseLocations = ({
        countries,
        states,
        counties,
        cities,
        zip_codes: zipCodes,
        districts_current: districtsCurrent,
        districts_original: districtsOriginal
    },
    count) => {
        const locationsList = [];

        setNoResults(false);
        clearAutocompleteSuggestions();

        if (count === 0) {
            setNoResults(true);
            return;
        }

        if (countries) {
            locationSort(countries, 'country_name');
            countries.map((item) => {
                const locationItem = Object.create(LocationEntity);
                locationItem.populate({
                    ...item,
                    category: 'country'
                });
                return locationsList.push(locationItem);
            });
        }

        if (states) {
            locationSort(states, 'state_name');
            states.map((item) => {
                const locationItem = Object.create(LocationEntity);
                locationItem.populate({
                    ...item,
                    category: 'state'
                });
                return locationsList.push(locationItem);
            });
        }

        if (counties) {
            locationSort(counties, 'county_name');
            counties.map((item) => {
                const locationItem = Object.create(LocationEntity);
                locationItem.populate({
                    ...item,
                    category: 'county'
                });
                return locationsList.push(locationItem);
            });
        }

        if (cities) {
            const sortedCities = citySort(cities);
            sortedCities.map((item) => {
                const locationItem = Object.create(LocationEntity);
                locationItem.populate({
                    ...item,
                    category: 'city'
                });
                return locationsList.push(locationItem);
            });
        }

        if (zipCodes) {
            locationSort(zipCodes, 'zip_code');
            zipCodes.map((item) => {
                const locationItem = Object.create(LocationEntity);
                locationItem.populate({
                    ...item,
                    category: 'zip_code'
                });
                return locationsList.push(locationItem);
            });
        }

        if (districtsCurrent) {
            locationSort(districtsCurrent, 'current_cd');
            districtsCurrent.map((item) => {
                const locationItem = Object.create(LocationEntity);
                locationItem.populate({
                    ...item,
                    category: 'current_cd'
                });
                return locationsList.push(locationItem);
            });
        }

        if (districtsOriginal) {
            locationSort(districtsOriginal, 'original_cd');
            districtsOriginal.map((item) => {
                const locationItem = Object.create(LocationEntity);
                locationItem.populate({
                    ...item,
                    category: 'original_cd'
                });
                return locationsList.push(locationItem);
            });
        }

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

            locationSearchRequests.promise
                .then((res) => {
                    parseLocations(res.data.results, res.data.count);
                })
                .catch((err) => {
                    console.log('error: ', err);
                });
        }
        else if (locationSearchRequests) {
            locationSearchRequests.cancel();
        }
    };

    const handleTextInput = (locationInput) => {
        const input = locationInput.target.value;
        window.clearTimeout(timeout);

        timeout = window.setTimeout(() => {
            queryAutocompleteLocations(input);
        }, 1000);
    };

    const selectItem = (item) => {
        console.log('selected item: ', item);
    };

    return (
        <>
            <ul>
                <Autocomplete
                    values={locations}
                    handleTextInput={handleTextInput}
                    onSelect={selectItem}
                    clearAutocompleteSuggestions={clearAutocompleteSuggestions}
                    noResults={noResults}
                    retainValue />
            </ul>
        </>

    );
};

export default NewLocationSectionContainer;

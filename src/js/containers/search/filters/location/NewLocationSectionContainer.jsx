/**
 * NewLocationSectionContainer.jsx
 * Created by Josue Aguilar 8/15/2024
 */

import React, { useEffect, useState } from 'react';
import { fetchLocations } from 'helpers/searchHelper';

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
    }, count) => {
        const locationsList = [];

        setNoResults(false);
        clearAutocompleteSuggestions();

        if (count === 0) {
            setNoResults(true);
            return;
        }

        if (countries) {
            locationSort(countries, 'country_name');
            countries.map((item) => (
                locationsList.push({ ...item, category: 'country' })
            ));
        }

        if (states) {
            locationSort(states, 'state_name');
            states.map((item) => (
                locationsList.push({ ...item, category: 'state' })
            ));
        }

        if (counties) {
            locationSort(counties, 'county_name');
            counties.map((item) => (
                locationsList.push({ ...item, category: 'county' })
            ));
        }

        if (cities) {
            const sortedCities = citySort(cities);
            sortedCities.map((item) => (
                locationsList.push({ ...item, category: 'city' })
            ));
        }

        if (zipCodes) {
            locationSort(zipCodes, 'zip_code');
            zipCodes.map((item) => (
                locationsList.push({ ...item, category: 'zip code' })
            ));
        }

        if (districtsCurrent) {
            locationSort(districtsCurrent, 'current_cd');
            districtsCurrent.map((item) => (
                locationsList.push({ ...item, category: 'current congressional district' })
            ));
        }

        if (districtsOriginal) {
            locationSort(districtsOriginal, 'original_cd');
            districtsOriginal.map((item) => (
                locationsList.push({ ...item, category: 'original congressional district' })
            ));
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

    // TODO: REMOVE HTML AND ONCHANGE. ONLY HERE FOR TESTING DEV-11306.
    const onChange = (e) => {
        e.persist();
        handleTextInput(e);
    };

    useEffect(() => {
        queryAutocompleteLocations('mexico');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {/* TODO: REMOVE HTML AND ONCHANGE. ONLY HERE FOR TESTING DEV-11306. */}
            <div>No Results: {noResults.toString()}</div>

            <h5>All Locations:</h5>
            <input type="text" id="input" name="input" onChange={onChange} />
            <ul>
                {locations.map((location) => (
                    <li>{JSON.stringify(location)}</li>
                ))}
            </ul>
        </>

    );
};

export default NewLocationSectionContainer;

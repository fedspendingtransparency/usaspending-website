/**
 * NewLocationSectionContainer.jsx
 * Created by Josue Aguilar 8/15/2024
 */

import React, { useEffect, useState } from 'react';
import { fetchLocations } from 'helpers/searchHelper';

const NewLocationSectionContainer = () => {
    const [locations, setLocations] = useState([]);
    const [noResults, setNoResults] = useState(false);

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

        if (count === 0) {
            setNoResults(true);
            return;
        }

        if (countries) {
            locationSort(countries, 'country_name');
            countries.map((item, index) => (
                locationsList.push(`${index + 1}. ${item.country_name}, `)
            ));
        }

        if (states) {
            locationSort(states, 'state_name');
            states.map((item, index) => (
                locationsList.push(`${index + 1}. ${item.state_name}, `)
            ));
        }

        if (counties) {
            locationSort(counties, 'county_name');
            counties.map((item, index) => (
                locationsList.push(`${index + 1}. ${item.county_name}, ${item.state_name} `)
            ));
        }

        if (cities) {
            const sortedCities = citySort(cities);
            sortedCities.map((item, index) => (
                locationsList.push(`${index + 1}. ${item.city_name_update}, `)
            ));
        }

        if (zipCodes) {
            locationSort(zipCodes, 'zip_code');
            zipCodes.map((item, index) => (
                locationsList.push(`${index + 1}. ${item.zip_code}, ${item.state_name} `)
            ));
        }

        if (districtsCurrent) {
            locationSort(districtsCurrent, 'current_cd');
            districtsCurrent.map((item, index) => (
                locationsList.push(`${index + 1}. ${item.current_cd}, ${item.state_name} `)
            ));
        }

        if (districtsOriginal) {
            locationSort(districtsOriginal, 'original_cd');
            districtsOriginal.map((item, index) => (
                locationsList.push(`${index + 1}. ${item.original_cd}, ${item.state_name} `)
            ));
        }

        setLocations(locationsList);
    };

    const queryAutocompleteLocations = (input = 'mex') => {
        const locationSearchParams = {
            search_text: input,
            limit: 5
        };

        fetchLocations(locationSearchParams).promise
            .then((res) => {
                parseLocations(res.data.results, res.data.count);
            })
            .catch((err) => {
                console.log('error: ', err);
            });
    };

    useEffect(() => {
        queryAutocompleteLocations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div>No Results: {noResults.toString()}</div>

            <h5>All Locations:</h5>
            <div>
                {locations}
            </div>
        </>

    );
};

export default NewLocationSectionContainer;

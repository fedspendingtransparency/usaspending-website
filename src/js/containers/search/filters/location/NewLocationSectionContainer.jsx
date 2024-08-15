/**
 * NewLocationSectionContainer.jsx
 * Created by Josue Aguilar 8/15/2024
 */

import React, { useEffect, useState } from 'react';
import { fetchLocations } from 'helpers/searchHelper';

const NewLocationSectionContainer = () => {
    const [locationList, setLocationList] = useState({
        countries: [],
        states: [],
        counties: [],
        cities: []
    });
    const [noResults, setNoResults] = useState(false);


    const parseLocations = ({
        countries, states, counties, cities
    }, count) => {
        const countriesList = [];
        const statesList = [];
        const countiesList = [];
        const citiesList = [];

        if (count === 0) {
            setNoResults(true);
            return;
        }

        if (countries) {
            countries.map((item, index) => (
                countriesList.push(`${index + 1}. ${item.country_name}, `)
            ));
        }

        if (states) {
            states.map((item, index) => (
                statesList.push(`${index + 1}. ${item.state_name}, `)
            ));
        }

        if (counties) {
            counties.map((item, index) => (
                countiesList.push(`${index + 1}. ${item.county_name}, ${item.state_name} `)
            ));
        }

        if (cities) {
            cities.map((item, index) => (
                citiesList.push(`${index + 1}. ${item.city_name}, ${item.state_name} `)
            ));
        }

        setLocationList({
            countries: countriesList,
            states: statesList,
            counties: countiesList,
            cities: citiesList
        });
    };

    const queryAutocompleteLocations = (input = 'den') => {
        const locationSearchParams = {
            search_text: input,
            limit: 5
        };

        fetchLocations(locationSearchParams).promise
            .then((res) => {
                console.log(res.data.results);
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
            <h5>Countries:</h5>
            <div>
                {locationList.countries}
            </div>
            <h5>States:</h5>
            <div>
                {locationList.states}
            </div>
            <h5>County:</h5>
            <div>
                {locationList.counties}
            </div>
            <h5>City:</h5>
            <div>
                {locationList.cities}
            </div>
        </>

    );
};

export default NewLocationSectionContainer;

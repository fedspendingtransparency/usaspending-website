/**
 * NewLocationSectionContainer.jsx
 * Created by Josue Aguilar 8/15/2024
 */

import React, { useEffect, useState } from 'react';
import { fetchLocations } from 'helpers/searchHelper';

const NewLocationSectionContainer = () => {
    const [cityList, setCityList] = useState(['KANSAS CITY']);
    const [countyList, setCountyList] = useState(['JACKSON COUNTY']);

    const parseLocations = (data) => {
        const citiesList = [];
        const countiesList = [];
        data.cities.map((item, index) => {
            citiesList.push(`${index + 1}. ${item.city_name}, ${item.state_name} `);
            setCityList(citiesList);
        });

        data.counties.map((item, index) => {
            countiesList.push(`${index + 1}. ${item.county_name}, ${item.state_name} `);
            setCountyList(countiesList);
        });
    };

    const queryAutocompleteLocations = (input = 'den') => {
        const locationSearchParams = {
            search_text: input,
            limit: 2
        };

        fetchLocations(locationSearchParams).promise
            .then((res) => {
                console.log(res.data.results);
                parseLocations(res.data.results);
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
            <h5>County:</h5>
            <div>
                {countyList}
            </div>
            <h5>City:</h5>
            <div>
                {cityList}
            </div>
        </>

    );
};

export default NewLocationSectionContainer;

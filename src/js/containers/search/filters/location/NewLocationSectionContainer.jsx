/**
 * NewLocationSectionContainer.jsx
 * Created by Kevin Li 8/15/2024
 */

import React, { useEffect } from 'react';
import { fetchLocations } from 'helpers/searchHelper';

const NewLocationSectionContainer = () => {
    const data = {
        name: 'Two Door Cinema Club'
    };

    const queryAutocompleteLocations = (input = 'den') => {
        const locationSearchParams = {
            search_text: input,
            limit: 10
        };

        fetchLocations(locationSearchParams).promise
            .then((res) => {
                console.log('res: ', res);
            })
            .catch((err) => {
                console.log('error: ', err);
            });
    };

    useEffect(() => {
        queryAutocompleteLocations();
    }, [queryAutocompleteLocations]);

    return (
        <div>
            {data.name}
        </div>
    );
};

export default NewLocationSectionContainer;

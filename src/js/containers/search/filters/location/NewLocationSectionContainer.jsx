/**
 * NewLocationSectionContainer.jsx
 * Created by Josue Aguilar 8/15/2024
 */

import React, { useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { uniqueId } from 'lodash';
import { fetchLocations } from 'helpers/searchHelper';
import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import LocationEntity from "../../../../models/v2/search/LocationEntity";
import LocationAutocomplete from "../../../../components/search/filters/location/LocationAutocomplete";

const NewLocationSectionContainer = (props) => {
    const [locations, setLocations] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [readyToStage, setReadyToStage] = useState(false);

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
        setReadyToStage(false);
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

    const selectItem = (item, valid, obj) => {
        // this.props.addPOPLocationObject(item);
        setSelectedItem(obj);
        setReadyToStage(true);
    };

    const addLocation = () => {
        const item = selectedItem;
        let location = {};

        if (item.category === "zip_code") {
            location = {
                identifier: `USA_${item.data.zip_code}`,
                display: {
                    title: item.data.zip_code,
                    entity: "ZIP Code",
                    standalone: item.data.zip_code
                },
                filter: {
                    country: item.data.country_name,
                    zip: item.data.zip_code
                }
            };
        }
        else if (item.category === "city") {
            location = {
                identifier: `USA_${item.data.state_name}_${item.data.city_name}`,
                display: {
                    title: `${item.data.city_name}, ${item.data.state_name}`,
                    entity: "City",
                    standalone: item.data.city_name
                },
                filter: {
                    country: item.data.country_name,
                    city: item.data.city_name,
                    state: item.data.state_name
                }
            };
        }
        else if (item.category === "county") {
            location = {
                identifier: `USA_${item.data.state_name}`,
                display: {
                    title: `${item.data.county_name}, ${item.data.state_name}`,
                    entity: "County",
                    standalone: item.data.county_name
                },
                filter: {
                    country: item.data.country_name,
                    county: item.data.county_name,
                    state: item.data.state_name
                }
            };
        }
        else if (item.category === "state") {
            location = {
                identifier: `USA_${item.data.state_name}`,
                display: {
                    title: item.data.state_name,
                    entity: "State",
                    standalone: item.data.state_name
                },
                filter: {
                    country: item.data.country_name,
                    state: item.data.state_name
                }
            };
        }
        else if (item.category === "country") {
            location = {
                identifier: `USA_${item.data.country_name}`,
                display: {
                    title: item.data.country_name,
                    entity: "Country",
                    standalone: item.data.country_name
                },
                filter: {
                    country: item.data.country_name
                }
            };
        }
        else if (item.category === "current_cd") {

        }
        else if (item.category === "original_cd") {

        }

        console.log(location);

        if (props.activeTab === 'recipient') {
            props.addRecipientLocationObject(location);
        }
        else {
            props.addPOPLocationObject(location);
        }

        clearAutocompleteSuggestions();
    };

    const removeLocation = (locationId) => {
        const newValue = props.selectedLocations.delete(locationId);
        props.updateGenericFilter({
            type: 'selectedLocations',
            value: newValue
        });
    };

    console.log(props.activeTab);

    return (
        <LocationAutocomplete
            activeTab={props.activeTab}
            locations={locations}
            handleTextInput={handleTextInput}
            selectItem={selectItem}
            clearAutocompleteSuggestions={clearAutocompleteSuggestions}
            noResults={noResults}
            readyToStage={readyToStage}
            addLocation={addLocation}
            selectedLocations={props.selectedLocations}
            removeLocation={removeLocation} />
    // key={`location-${uniqueId()}`} />
    );
};

export default connect(
    (state) => ({
        selectedLocations: state.filters.selectedLocations
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(NewLocationSectionContainer);

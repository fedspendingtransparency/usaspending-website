/**
 * LocationAutocompleteContainer.jsx
 * Created by Josue Aguilar 8/15/2024
 */

import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { isCancel } from "axios";
import PropTypes from "prop-types";
import { fetchLocations } from 'helpers/searchHelper';
import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import LocationEntity from "../../../../models/v2/search/LocationEntity";
import LocationAutocomplete from "../../../../components/search/filters/location/LocationAutocomplete";
import { fipsIdByStateName, stateFIPSByAbbreviation } from "../../../../dataMapping/state/stateNames";
import { fetchLocationList } from "../../../../helpers/mapHelper";

const propTypes = {
    activeTab: PropTypes.string,
    addRecipientLocationObject: PropTypes.func,
    addPOPLocationObject: PropTypes.func,
    updateGenericFilter: PropTypes.func,
    selectedLocations: PropTypes.object,
    selectedRecipientLocations: PropTypes.object
};

const LocationAutocompleteContainer = (props) => {
    const [locations, setLocations] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [readyToStage, setReadyToStage] = useState(false);
    const [countriesList, setCountriesList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    let timeout;
    let listRequest;

    const createLocationObjectByType = (location) => {
        if (props.activeTab === 'recipient') {
            props.addRecipientLocationObject(location);
        }
        else {
            props.addPOPLocationObject(location);
        }
    };

    const getKeyByValue = (object, value) => Object.keys(object).find((key) => object[key] === value);

    const loadCounties = (county, state, countryAbbreviation, stateFips, countyFips) => {
        const stateAbbreviation = getKeyByValue(
            stateFIPSByAbbreviation,
            stateFips
        ).toLowerCase();

        const location = {
            identifier: `${countryAbbreviation}_${stateAbbreviation}_${countyFips}`,
            display: {
                title: `${county}, ${state}`,
                entity: "County",
                standalone: county
            },
            filter: {
                country: countryAbbreviation,
                county: countyFips,
                state: stateAbbreviation
            }
        };

        createLocationObjectByType(location);
    };

    const loadCountries = () => {
        if (listRequest) {
            listRequest.cancel();
            setIsLoading(false);
        }

        listRequest = fetchLocationList("countries");
        listRequest.promise
            .then((res) => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addZip = (zipCode) => {
        // make a ZIP location object
        const location = {
            identifier: `USA_${zipCode}`,
            display: {
                title: zipCode,
                entity: "ZIP Code",
                standalone: zipCode
            },
            filter: {
                country: "USA",
                zip: zipCode
            }
        };

        return location;
    };

    const addCity = (city, state, countryAbbreviation) => {
        const fipsCode = fipsIdByStateName[state.toLowerCase()];
        const stateAbbreviation = getKeyByValue(stateFIPSByAbbreviation, fipsCode);
        const location = {
            identifier: `${countryAbbreviation}_${stateAbbreviation}_${city}`,
            display: {
                title: `${city}, ${state}`,
                entity: "City",
                standalone: city
            },
            filter: {
                country: countryAbbreviation,
                city,
                state: stateAbbreviation
            }
        };

        return location;
    };

    const addState = (state, countryAbbreviation) => {
        const fipsCode = fipsIdByStateName[state.toLowerCase()];
        const stateAbbreviation = getKeyByValue(stateFIPSByAbbreviation, fipsCode);
        const location = {
            identifier: `${countryAbbreviation}_${stateAbbreviation}`,
            display: {
                title: state,
                entity: "State",
                standalone: state
            },
            filter: {
                country: countryAbbreviation,
                state: stateAbbreviation
            }
        };

        return location;
    };

    const addCountry = (country, countryAbbreviation) => {
        const location = {
            identifier: countryAbbreviation,
            display: {
                title: country,
                entity: "Country",
                standalone: country
            },
            filter: {
                country: countryAbbreviation
            }
        };

        return location;
    };

    const addDistrict = (district, type) => {
        const districtArray = district.split('-');
        const stateAbbreviation = districtArray[0];
        const districtNumber = districtArray[1];
        const location = {
            identifier: `USA_${stateAbbreviation}_${districtNumber}`,
            filter: {
                country: "USA",
                state: stateAbbreviation,
                district_current: districtNumber
            },
            display: {
                entity: type,
                standalone: district,
                title: district
            }
        };

        return location;
    };

    const clearAutocompleteSuggestions = () => {
        setLocations([]);
        setReadyToStage(false);
        setIsLoading(false);
    };

    const addLocation = () => {
        const item = selectedItem;
        let location = {};
        const countryAbbreviation = item.data.country_name === 'UNITED STATES' ? 'USA' : countriesList?.find((country) => country.name === item.data.country_name)?.code;

        if (item.category === "zip_code") {
            location = addZip(item.data.zip_code);
        }
        else if (item.category === "city") {
            location = addCity(item.data.city_name, item.data.state_name, countryAbbreviation);
        }
        else if (item.category === "county") {
            loadCounties(
                item.data.county_name,
                item.data.state_name,
                countryAbbreviation,
                item.data.state_fips,
                item.data.county_fips
            );
        }
        else if (item.category === "state") {
            location = addState(item.data.state_name, countryAbbreviation);
        }
        else if (item.category === "country") {
            location = addCountry(item.data.country_name, countryAbbreviation);
        }
        else if (item.category === "current_cd") {
            location = addDistrict(item.data.current_cd, "Current congressional district");
        }
        else if (item.category === "original_cd") {
            location = addDistrict(item.data.original_cd, "Original congressional district");
        }

        if (item.category !== "county") {
            createLocationObjectByType(location);
        }

        clearAutocompleteSuggestions();
    };

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

        setNoResults(false);
        clearAutocompleteSuggestions();

        if (count === 0) {
            setNoResults(true);
            setIsLoading(false);
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

    const removeLocation = (locationId) => {
        const type = props.activeTab === 'recipient' ? 'selectedRecipientLocations' : 'selectedLocations';
        const newValue = props[type].delete(locationId);
        props.updateGenericFilter({
            type,
            value: newValue
        });
    };

    return (
        <LocationAutocomplete
            {...props}
            activeTab={props.activeTab}
            locations={locations}
            handleTextInput={handleTextInput}
            selectItem={selectItem}
            clearAutocompleteSuggestions={clearAutocompleteSuggestions}
            noResults={noResults}
            readyToStage={readyToStage}
            addLocation={addLocation}
            selectedLocations={props.selectedLocations}
            selectedRecipientLocations={props.selectedRecipientLocations}
            removeLocation={removeLocation}
            isLoading={isLoading} />
    );
};

LocationAutocompleteContainer.propTypes = propTypes;
export default connect(
    (state) => ({
        selectedLocations: state.filters.selectedLocations,
        selectedRecipientLocations: state.filters.selectedRecipientLocations
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(LocationAutocompleteContainer);

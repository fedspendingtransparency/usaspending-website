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
                country: countryAbbreviation || country
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
        let countryAbbreviation = item.data.country_name === 'UNITED STATES' ? 'USA' : countriesList?.find((country) => country.name === item.data.country_name)?.code;
        if (item.category === "zip_code") {
            location = addZip(item.data.zip_code);
        }
        else if (item.category === "city") {
            location = addCity(item.data.city_name, item.data.state_name, countryAbbreviation = 'USA'
            );
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
            location = addState(item.data.state_name, countryAbbreviation = 'USA');
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
            countries.sort();
            countries.map((item) => {
                const locationItem = Object.create(LocationEntity);
                locationItem.populate({
                    country_name: item,
                    category: 'country'
                });
                return locationsList.push(locationItem);
            });
        }

        if (states) {
            states.sort();
            states.map((item) => {
                const locationItem = Object.create(LocationEntity);
                locationItem.populate({
                    state_name: item,
                    category: 'state'
                });
                return locationsList.push(locationItem);
            });
        }

        if (counties) {
            counties.sort();
            counties.map((item) => {
                const countyState = item.split(",");
                const locationItem = Object.create(LocationEntity);
                if (countyState.length === 2) {
                    locationItem.populate({
                        county_name: countyState[0].trim(),
                        state_name: countyState[1].trim(),
                        category: 'county'
                    });
                }
                return locationsList.push(locationItem);
            });
        }

        if (cities) {
            cities.sort();
            cities.map((item) => {
                const cityState = item.split(",");
                const locationItem = Object.create(LocationEntity);
                if (cityState.length === 2) {
                    locationItem.populate({
                        city_name: cityState[0].trim(),
                        state_name: cityState[1].trim(),
                        category: 'city'
                    });
                }
                return locationsList.push(locationItem);
            });
        }

        if (zipCodes) {
            zipCodes.sort();
            zipCodes.map((item) => {
                const zipState = item.split(",");
                const locationItem = Object.create(LocationEntity);
                if (zipState.length === 2) {
                    locationItem.populate({
                        zip_code: zipState[0].trim(),
                        state_name: zipState[1].trim(),
                        category: 'zip_code'
                    });
                }
                return locationsList.push(locationItem);
            });
        }

        if (districtsCurrent) {
            districtsCurrent.sort();
            districtsCurrent.map((item) => {
                const districtState = item.split(",");
                const locationItem = Object.create(LocationEntity);
                if (districtState.length === 2) {
                    locationItem.populate({
                        current_cd: districtState[0].trim(),
                        state_name: districtState[1].trim(),
                        category: 'current_cd'
                    });
                }

                return locationsList.push(locationItem);
            });
        }

        if (districtsOriginal) {
            districtsOriginal.sort();
            districtsOriginal.map((item) => {
                const districtState = item.split(",");
                const locationItem = Object.create(LocationEntity);
                if (districtState.length === 2) {
                    locationItem.populate({
                        original_cd: districtState[0].trim(),
                        state_name: districtState[1].trim(),
                        category: 'original_cd'
                    });
                }
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

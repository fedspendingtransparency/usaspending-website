/**
 * LocationPickerContainer.jsx
 * Created by Kevin Li 10/30/17
 */

import React from "react";
import PropTypes from "prop-types";
import { isCancel } from "axios";
import { concat, debounce } from "lodash";

import {
    fetchLocationList,
    performZIPGeocode,
    fetchCityResults,
    getCitySearchRequestObj
} from "helpers/mapHelper";

import LocationPicker from "../../../../components/search/filters/location/LocationPicker";

const propTypes = {
    selectedLocations: PropTypes.object,
    addLocation: PropTypes.func,
    scope: PropTypes.oneOf(["primary_place_of_performance", "recipient_location"]),
    enableCitySearch: PropTypes.bool
};

const defaultProps = {
    scope: "primary_place_of_performance"
};

export const defaultLocationValues = {
    country: {
        code: "",
        name: "",
        autoPopulated: false
    },
    state: {
        code: "",
        fips: "",
        name: "",
        autoPopulated: false // from city selection
    },
    county: {
        code: "",
        fips: "",
        state: "",
        name: ""
    },
    city: {
        name: "",
        code: ""
    },
    district_original: {
        code: "",
        district: "",
        name: ""
    },
    district_current: {
        code: "",
        district: "",
        name: ""
    },
    zip: {
        valid: "",
        invalid: ""
    }
};

const locationProperties = ["country", "state", "district_original", "district_current", "county", "city"];
// Map to unique value for this.state.locationProperty
const locationPropertyAccessorMap = {
    country: 'code',
    city: 'name',
    district_original: 'district_original',
    district_current: 'district_current',
    state: 'code',
    county: 'fips'
};

export default class LocationPickerContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            availableCountries: [],
            availableStates: [],
            availableCounties: [],
            availableOriginalDistricts: [],
            availableCurrentDistricts: [],
            availableCities: [],
            country: Object.assign({}, defaultLocationValues.country),
            state: Object.assign({}, defaultLocationValues.state),
            county: Object.assign({}, defaultLocationValues.county),
            city: Object.assign({}, defaultLocationValues.city),
            district_current: Object.assign({}, defaultLocationValues.district_current),
            district_original: Object.assign({}, defaultLocationValues.district_original),
            zip: Object.assign({}, defaultLocationValues.zip),
            citySearchString: "",
            loading: false
        };

        this.listRequest = null;
        // keep the CD request seperate bc they may be parallel with county
        this.districtRequest = null;
        this.zipRequest = null;
        this.cityRequest = null;

        this.loadStates = this.loadStates.bind(this);
        this.loadCounties = this.loadCounties.bind(this);
        this.loadDistricts = this.loadDistricts.bind(this);

        this.clearStates = this.clearStates.bind(this);
        this.clearCounties = this.clearCounties.bind(this);
        this.clearOriginalDistricts = this.clearOriginalDistricts.bind(this);
        this.clearCurrentDistricts = this.clearCurrentDistricts.bind(this);
        this.clearCitiesAndSelectedCity = this.clearCitiesAndSelectedCity.bind(this);

        this.selectEntity = this.selectEntity.bind(this);

        this.createLocationObject = this.createLocationObject.bind(this);
        this.addLocation = this.addLocation.bind(this);
        this.validateZip = this.validateZip.bind(this);

        this.setCitySearchString = this.setCitySearchString.bind(this);
        this.fetchCityAutocomplete = this.fetchCityAutocomplete.bind(this);
        this.debouncedCitySearch = debounce(this.fetchCityAutocomplete, 500).bind(this);
        this.cleanBadLocationData = this.cleanBadLocationData.bind(this);
    }

    componentDidMount() {
        this.loadCountries();
    }

    componentWillUnmount() {
        if (this.listRequest) {
            this.listRequest.cancel();
        }
    }

    setCitySearchString(citySearchString, performFetch = true) {
    // we don't perform fetch when the user is clicking on a city search dropdown option
        this.setState({ citySearchString, availableCities: [] }, () => {
            if (citySearchString.length > 2 && performFetch) {
                this.debouncedCitySearch();
            }
        });
        if (!citySearchString) {
            this.clearCitiesAndSelectedCity();
        }
    }

    loadCountries() {
        if (this.listRequest) {
            this.listRequest.cancel();
        }

        this.listRequest = fetchLocationList("countries");

        this.listRequest.promise
            .then((res) => {
                this.parseCountries(res.data);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                }
            });
    }

    parseCountries(data) {
    // put USA and an "all foreign countries" option at the start of the list
        const countries = [
            { code: "USA", name: "UNITED STATES" },
            { code: "FOREIGN", name: "ALL FOREIGN COUNTRIES" },
            { code: "", name: "---" },
            ...data.countries
        ].map((country) => ({ ...country, autoPopulated: false }));
        this.setState({
            availableCountries: countries
        });
    }

    loadStates() {
        if (this.listRequest) {
            this.listRequest.cancel();
        }

        this.listRequest = fetchLocationList("states");

        this.listRequest.promise
            .then((res) => {
                this.parseStates(res.data);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                }
            });
    }

    parseStates(data) {
    // prepend a blank state to act as a de-select option
        if (data.states.length > 0) {
            const states = [
                { ...defaultLocationValues.state, name: "All states" },
                ...data.states
            ].map((state) => ({ ...state, autoPopulated: false }));
            this.setState({
                availableStates: states
            });
        }
        else {
            this.setState({ availableStates: [] });
        }
    }

    clearStates() {
        this.setState({
            availableStates: [],
            state: Object.assign({}, defaultLocationValues.state)
        });
    }

    clearCitiesAndSelectedCity() {
        this.setState({
            availableCities: [],
            city: defaultLocationValues.city,
            citySearchString: ""
        });
    }

    loadCounties(state) {
        if (this.listRequest) {
            this.listRequest.cancel();
        }

        this.listRequest = fetchLocationList(`counties/${state}_counties`);

        this.listRequest.promise
            .then((res) => {
                this.parseCounties(res.data);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                }
            });
    }

    parseCounties(data) {
    // prepend a blank county to act as a de-select option
        let counties = [];
        if (data.counties.length > 0) {
            counties = concat(
                [
                    Object.assign({}, defaultLocationValues.county, {
                        name: "All counties"
                    })
                ],
                data.counties
            );
        }
        this.setState({
            availableCounties: counties,
            county: Object.assign({}, defaultLocationValues.county)
        });
    }

    clearCounties() {
        this.setState({
            availableCounties: [],
            county: Object.assign({}, defaultLocationValues.county)
        });
    }

    loadDistricts(state) {
        if (this.districtRequest) {
            this.districtRequest.cancel();
        }

        this.districtRequest = fetchLocationList(`congressional/current/${state}_districts`);
        this.districtRequest.promise
            .then((res) => {
                this.parseCurrentDistricts(res.data);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                }
            });

        this.districtRequest = fetchLocationList(`congressional/original/${state}_districts`);

        this.districtRequest.promise
            .then((res) => {
                this.parseOriginalDistricts(res.data);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                }
            });
    }

    parseOriginalDistricts(data) {
    // prepend a blank district to act as a de-select option
        let districts = [];
        if (data.districts.length > 0) {
            districts = concat(
                [
                    Object.assign({}, defaultLocationValues.district_original, {
                        name: "All congressional districts"
                    })
                ],
                data.districts
            );
        }

        this.setState({
            availableOriginalDistricts: districts,
            district_original: Object.assign({}, defaultLocationValues.district_original)
        });
    }

    parseCurrentDistricts(data) {
        // prepend a blank district to act as a de-select option
        let districts = [];
        if (data.districts.length > 0) {
            districts = concat(
                [
                    Object.assign({}, defaultLocationValues.district_current, {
                        name: "All congressional districts"
                    })
                ],
                data.districts
            );
        }

        this.setState({
            availableCurrentDistricts: districts,
            district_current: Object.assign({}, defaultLocationValues.district_current)
        });
    }

    clearOriginalDistricts() {
        this.setState({
            availableOriginalDistricts: [],
            district_original: Object.assign({}, defaultLocationValues.district_original)
        });
    }
    clearCurrentDistricts() {
        this.setState({
            availableCurrentDistricts: [],
            district_current: Object.assign({}, defaultLocationValues.district_current)
        });
    }

    selectEntity(level, value) {
        const shouldAutoPopulateState = (
            level === "city" &&
            this.state.country.code === "USA" &&
            this.state.state.code !== value.code &&
            (value.code)
        );
        const shouldAutoPopulateCountry = (
            level === "city" &&
            this.state.country.code !== "USA" &&
            this.state.country.code !== value.code &&
            (value.code)
        );
        if (shouldAutoPopulateState) {
            const stateFromCity = this.state.availableStates
                .filter((state) => state.code === value.code)
                .reduce(
                    (acc, state) => ({ ...acc, ...state, autoPopulated: true }),
                    defaultLocationValues.state
                );
            this.setState({ state: stateFromCity });
        }
        else if (shouldAutoPopulateCountry) {
            const countryFromCity = this.state.availableCountries
                .filter((country) => country.code === value.code)
                .reduce(
                    (acc, country) => ({ ...acc, ...country, autoPopulated: true }),
                    { code: "FOREIGN", name: "ALL FOREIGN COUNTRIES" }
                );
            this.setState({ country: countryFromCity });
        }
        this.setState({
            [level]: value
        });
    }

    /**
     * This function was necessary to handle bad location data.
     * It overrides local state, which is an anti-pattern.
     * The specific condition this handles is when a city is returned from the api
     * which does not have a country code associated with it that exists within our availableCountries array in local state.
     * In this case, the back end team has requested we pass them the country code associated with the city itself in the API response.
     * That is what this function is intended to accomplish.
     * We are not setting this value (city.code) to this.state.country because it would have additional
     * side effects across the component's children and introduce even greater complexity.
     * The specific example this was created to handle was searching by city, recipient location, londonderry.
     **/

    cleanBadLocationData(locationObject) {
        const cleanLocationObject = Object.keys(locationObject)
            .reduce((acc, locationProperty) => {
                if (locationProperty === 'filter') {
                    // only cleaning data passed to api which is the .filter property
                    const filterData = locationObject[locationProperty];
                    if (filterData.city && filterData.country.toLowerCase() === 'foreign') {
                        return {
                            ...acc,
                            filter: {
                                ...acc.filter,
                                country: this.state.city.code
                            }
                        };
                    }
                }
                return acc;
            }, locationObject);
        return cleanLocationObject;
    }

    createLocationObject() {
        const locationObject = Object.keys(this.state)
            .filter((prop) => locationProperties.includes(prop) && this.state[prop].code !== '')
            .reduce((acc, prop) => {
                const accessor = locationPropertyAccessorMap[prop];
                // removes ', <State/Country>' appended to city
                let parsedKeyValue = prop === 'city'
                    ? this.state.city.name.split(", ").filter((str) => str !== this.state.city.code).join(", ")
                    : this.state[prop][accessor];

                let entityValue = '';
                if (prop === 'district') {
                    entityValue = 'Congressional district';
                }
                else if (prop === 'district_original') {
                    entityValue = 'Original congressional district';
                }
                else if (prop === 'district_current') {
                    entityValue = 'Current congressional district';
                }
                else {
                    entityValue = `${prop.substr(0, 1).toUpperCase()}${prop.substr(1)}`;
                }

                if (parsedKeyValue === undefined && (prop === 'district_current' || prop === 'district_original')) {
                    parsedKeyValue = this.state[prop].district;
                }

                const toReturn = {
                    identifier: prop === 'country' // init identifier value w/o appended '_'
                        ? this.state.country.code
                        : `${acc.identifier}_${parsedKeyValue}`,
                    filter: {
                        ...acc.filter,
                        [prop]: parsedKeyValue
                    },
                    display: {
                        entity: `${entityValue}`,
                        standalone: prop === 'county'
                            ? `${this.state.county.name}, ${this.state.state.code}`
                            : this.state[prop].name,
                        title: this.state[prop].name
                    }
                };
                return toReturn;
            }, { identifier: '', display: { entity: '', title: '', standalone: '' }, filter: {} });

        return this.cleanBadLocationData(locationObject);
    }

    addLocation() {
        const locationObject = this.createLocationObject();
        if (locationObject) {
            this.props.addLocation(locationObject);
        }
    }

    addZip() {
        if (this.state.zip.valid === "") {
            // no zip
            return;
        }

        // make a ZIP location object
        const location = {
            identifier: `USA_${this.state.zip.valid}`,
            display: {
                title: this.state.zip.valid,
                entity: "ZIP Code",
                standalone: this.state.zip.valid
            },
            filter: {
                country: "USA",
                zip: this.state.zip.valid
            }
        };

        this.props.addLocation(location);
    }

    validateZip(zip) {
        if (this.zipRequest) {
            this.zipRequest.cancel();
        }

        // zip must be 5 characters and all numeric
        const zipRegex = /^[0-9]{5}$/;
        if (zip.length !== 5 || !zipRegex.test(zip)) {
            this.invalidZip(zip);
            return;
        }

        this.zipRequest = performZIPGeocode(zip);

        this.zipRequest.promise
            .then((res) => {
                this.parseZip(res.data, zip);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    this.zipRequest = null;
                }
            });
    }

    fetchCityAutocomplete() {
        if (!this.props.enableCitySearch) {
            return;
        }
        const { citySearchString, country, state } = this.state;
        if (this.cityRequest) {
            this.cityRequest.cancel();
        }
        if (!this.state.loading) {
            this.setState({ loading: true });
        }

        this.cityRequest = fetchCityResults(
            getCitySearchRequestObj(citySearchString, state.code, country.code, this.props.scope)
        );

        this.cityRequest.promise
            .then((res) => {
                if (res.data.results.length === 0) {
                    this.parseCities([{ city_name: "No matching results", state_code: "NA-000" }]);
                }
                else {
                    this.parseCities(res.data.results);
                }
                this.cityRequest = null;
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    this.cityRequest = null;
                }
            })
            .finally(() => {
                if (!this.cityRequest) {
                    this.setState({ loading: false });
                }
            });
    }

    parseCities(results) {
        this.setState({
            availableCities: results.map((city) => ({
                name:
                    city.state_code === "NA-000" || !city.state_code // NA-000 is no results found
                        ? city.city_name
                        : `${city.city_name}, ${city.state_code}`,
                code: city.state_code
            }))
        });
    }

    parseZip(data, zip) {
        if (data.features && data.features.length > 0) {
            // this is a valid zip code
            this.validZip(zip);
        }
        else {
            this.invalidZip(zip);
        }
    }

    invalidZip(zip) {
        this.setState({
            zip: {
                valid: "",
                invalid: zip
            }
        });
    }

    validZip(zip) {
        this.setState(
            {
                zip: {
                    valid: zip,
                    invalid: ""
                }
            },
            () => {
                this.addZip(zip);
            }
        );
    }

    render() {
        return (
            <LocationPicker
                {...this.state}
                scope={this.props.scope}
                enableCitySearch={this.props.enableCitySearch}
                selectedLocations={this.props.selectedLocations}
                loadStates={this.loadStates}
                loadCounties={this.loadCounties}
                loadDistricts={this.loadDistricts}
                clearStates={this.clearStates}
                clearCitiesAndSelectedCity={this.clearCitiesAndSelectedCity}
                clearCounties={this.clearCounties}
                clearOriginalDistricts={this.clearOriginalDistricts}
                clearCurrentDistricts={this.clearCurrentDistricts}
                selectEntity={this.selectEntity}
                createLocationObject={this.createLocationObject}
                addLocation={this.addLocation}
                validateZip={this.validateZip}
                setCitySearchString={this.setCitySearchString} />
        );
    }
}

LocationPickerContainer.propTypes = propTypes;
LocationPickerContainer.defaultProps = defaultProps;

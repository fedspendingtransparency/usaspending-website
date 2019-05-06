/**
 * LocationPickerContainer.jsx
 * Created by Kevin Li 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';
import { concat } from 'lodash';

import { fetchLocationList, performZIPGeocode, fetchCityResults } from 'helpers/mapHelper';

import LocationPicker from 'components/search/filters/location/LocationPicker';

const propTypes = {
    selectedLocations: PropTypes.object,
    addLocation: PropTypes.func
};

const defaultSelections = {
    country: {
        code: '',
        name: ''
    },
    state: {
        code: '',
        fips: '',
        name: ''
    },
    county: {
        code: '',
        fips: '',
        state: '',
        name: ''
    },
    city: {
        name: ''
    },
    district: {
        code: '',
        district: '',
        name: ''
    },
    zip: {
        valid: '',
        invalid: ''
    }
};

export default class LocationPickerContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            availableCountries: [],
            availableStates: [],
            availableCounties: [],
            availableDistricts: [],
            availableCities: [],
            country: Object.assign({}, defaultSelections.country),
            state: Object.assign({}, defaultSelections.state),
            county: Object.assign({}, defaultSelections.county),
            city: Object.assign({}, defaultSelections.city),
            district: Object.assign({}, defaultSelections.district),
            zip: Object.assign({}, defaultSelections.zip),
            citySearchString: ''
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
        this.clearDistricts = this.clearDistricts.bind(this);

        this.selectEntity = this.selectEntity.bind(this);

        this.createLocationObject = this.createLocationObject.bind(this);
        this.addLocation = this.addLocation.bind(this);
        this.validateZip = this.validateZip.bind(this);

        this.setCitySearchString = this.setCitySearchString.bind(this);
    }

    componentDidMount() {
        this.loadCountries();
    }

    loadCountries() {
        if (this.listRequest) {
            this.listRequest.cancel();
        }

        this.listRequest = fetchLocationList('countries');

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
        const countries = concat([{
            code: 'USA',
            name: 'UNITED STATES'
        }, {
            code: 'FOREIGN',
            name: 'ALL FOREIGN COUNTRIES'
        }, {
            code: '',
            name: '---'
        }], data.countries);
        this.setState({
            availableCountries: countries
        });
    }

    loadStates() {
        if (this.listRequest) {
            this.listRequest.cancel();
        }

        this.listRequest = fetchLocationList('states');

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
        let states = [];
        if (data.states.length > 0) {
            states = concat([Object.assign({}, defaultSelections.state, {
                name: 'All states'
            })], data.states);
        }
        this.setState({
            availableStates: states
        });
    }

    clearStates() {
        this.setState({
            availableStates: [],
            state: Object.assign({}, defaultSelections.state)
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
            counties = concat([Object.assign({}, defaultSelections.county, {
                name: 'All counties'
            })], data.counties);
        }
        this.setState({
            availableCounties: counties,
            county: Object.assign({}, defaultSelections.county)
        });
    }

    clearCounties() {
        this.setState({
            availableCounties: [],
            county: Object.assign({}, defaultSelections.county)
        });
    }

    loadDistricts(state) {
        if (this.districtRequest) {
            this.districtRequest.cancel();
        }

        this.districtRequest = fetchLocationList(`congressional/${state}_districts`);

        this.districtRequest.promise
            .then((res) => {
                this.parseDistricts(res.data);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                }
            });
    }

    parseDistricts(data) {
        // prepend a blank district to act as a de-select option
        let districts = [];
        if (data.districts.length > 0) {
            districts = concat([Object.assign({}, defaultSelections.district, {
                name: 'All congressional districts'
            })], data.districts);
        }

        this.setState({
            availableDistricts: districts,
            district: Object.assign({}, defaultSelections.district)
        });
    }

    clearDistricts() {
        this.setState({
            availableDistricts: [],
            district: Object.assign({}, defaultSelections.district)
        });
    }

    selectEntity(level, value) {
        this.setState({
            [level]: value
        });
    }

    createLocationObject() {
        // create a location object
        const location = {};
        let title = '';
        let standalone = '';
        let entity = '';
        let identifier = '';
        if (this.state.country.code === '') {
            // do nothing, it's an empty filter
            return null;
        }
        location.country = this.state.country.code;
        title = this.state.country.name;
        standalone = this.state.country.name;
        entity = 'Country';
        identifier += this.state.country.code;

        if (this.state.city.name !== '') {
            location.city = this.state.city.name;
        }

        if (this.state.state.code !== '') {
            location.state = this.state.state.code;
            title = this.state.state.name;
            standalone = this.state.state.name;
            entity = 'State';
            identifier += `_${this.state.state.code}`;

            if (this.state.county.code !== '') {
                location.county = this.state.county.fips;
                title = this.state.county.name;
                standalone = `${this.state.county.name}, ${this.state.state.code}`;
                entity = 'County';
                identifier += `_${this.state.county.fips}`;
            }
            else if (this.state.district.code !== '') {
                location.district = this.state.district.district;
                title = this.state.district.name;
                standalone = this.state.district.name;
                entity = 'Congressional district';
                identifier += `_${this.state.district.district}`;
            }
        }

        // generate a display tag
        const display = {
            title,
            entity,
            standalone
        };

        return {
            identifier,
            display,
            filter: location
        };
    }

    addLocation() {
        const locationObject = this.createLocationObject();
        if (locationObject) {
            this.props.addLocation(locationObject);
        }
    }

    addZip() {
        if (this.state.zip.valid === '') {
            // no zip
            return;
        }

        // make a ZIP location object
        const location = {
            identifier: `USA_${this.state.zip.valid}`,
            display: {
                title: this.state.zip.valid,
                entity: 'ZIP Code',
                standalone: this.state.zip.valid
            },
            filter: {
                country: 'USA',
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

    setCitySearchString(citySearchString) {
        this.setState(
            {
                citySearchString
            },
            () => {
                if (citySearchString.length > 2) {
                    this.fetchCityAutocomplete();
                }
            }
        );
    }

    fetchCityAutocomplete() {
        if (this.cityRequest) {
            this.cityRequest.cancel();
        }

        this.cityRequest = fetchCityResults(this.state.citySearchString);

        this.cityRequest.promise
            .then((res) => {
                this.setState({
                    availableCities: res.data.results
                });
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    this.cityRequest = null;
                }
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
                valid: '',
                invalid: zip
            }
        });
    }

    validZip(zip) {
        this.setState({
            zip: {
                valid: zip,
                invalid: ''
            }
        }, () => {
            this.addZip(zip);
        });
    }

    render() {
        return (
            <LocationPicker
                {...this.state}
                selectedLocations={this.props.selectedLocations}
                loadStates={this.loadStates}
                loadCounties={this.loadCounties}
                loadDistricts={this.loadDistricts}
                clearStates={this.clearStates}
                clearCounties={this.clearCounties}
                clearDistricts={this.clearDistricts}
                selectEntity={this.selectEntity}
                createLocationObject={this.createLocationObject}
                addLocation={this.addLocation}
                validateZip={this.validateZip}
                setCitySearchString={this.setCitySearchString} />
        );
    }
}

LocationPickerContainer.propTypes = propTypes;

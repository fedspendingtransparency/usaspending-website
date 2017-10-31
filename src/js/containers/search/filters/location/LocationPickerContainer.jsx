/**
 * LocationPickerContainer.jsx
 * Created by Kevin Li 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';
import { concat } from 'lodash';

import { fetchLocationList } from 'helpers/mapHelper';

import LocationPicker from 'components/search/filters/location/LocationPicker';

const propTypes = {
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
    district: {
        code: '',
        district: '',
        name: ''
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
            country: Object.assign({}, defaultSelections.country),
            state: Object.assign({}, defaultSelections.state),
            county: Object.assign({}, defaultSelections.county),
            district: Object.assign({}, defaultSelections.district)
        };

        this.listRequest = null;
        // keep the CD request seperate bc they may be parallel with county
        this.districtRequest = null;

        this.loadStates = this.loadStates.bind(this);
        this.loadCounties = this.loadCounties.bind(this);
        this.loadDistricts = this.loadDistricts.bind(this);

        this.clearStates = this.clearStates.bind(this);
        this.clearCounties = this.clearCounties.bind(this);
        this.clearDistricts = this.clearDistricts.bind(this);

        this.selectEntity = this.selectEntity.bind(this);

        this.addLocation = this.addLocation.bind(this);
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
                name: 'All districts'
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

    addLocation() {
        // create a location object
        const location = {};
        let title = '';
        let entity = '';
        let parent = '';
        let identifier = '';
        if (this.state.country.code === '') {
            // do nothing, it's an empty filter
            return;
        }
        location.country = this.state.country.code;
        title = this.state.country.name;
        entity = 'Country';
        identifier += this.state.country.code;

        if (this.state.state.code !== '') {
            location.state = this.state.state.code;
            title = this.state.state.name;
            parent = this.state.country.name;
            entity = 'State';
            identifier += `_${this.state.state.code}`;

            if (this.state.county.code !== '') {
                location.county = this.state.county.fips;
                title = this.state.county.name;
                parent = this.state.state.name;
                entity = 'county';
                identifier += `_${this.state.county.fips}`;
            }
            else if (this.state.district.code !== '') {
                location.district = this.state.district.district;
                title = this.state.district.name;
                parent = this.state.state.name;
                entity = 'congressional district';
                identifier += `_${this.state.district.district}`;
            }
        }

        let description = `${entity.toUpperCase()} in ${parent}`;
        if (parent === '') {
            description = entity.toUpperCase();
        }

        // generate a display tag
        const display = {
            title,
            description
        };

        this.props.addLocation({
            identifier,
            display,
            filter: location
        });
    }

    render() {
        return (
            <LocationPicker
                {...this.state}
                loadStates={this.loadStates}
                loadCounties={this.loadCounties}
                loadDistricts={this.loadDistricts}
                clearStates={this.clearStates}
                clearCounties={this.clearCounties}
                clearDistricts={this.clearDistricts}
                selectEntity={this.selectEntity}
                addLocation={this.addLocation} />
        );
    }
}

LocationPickerContainer.propTypes = propTypes;

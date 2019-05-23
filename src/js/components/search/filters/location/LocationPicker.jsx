/**
 * LocationPicker.jsx
 * Created by Kevin Li 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import EntityDropdown from './EntityDropdown';
import ZIPField from './ZIPField';

const propTypes = {
    selectedLocations: PropTypes.object,
    country: PropTypes.object,
    state: PropTypes.object,
    county: PropTypes.object,
    city: PropTypes.object,
    district: PropTypes.object,
    zip: PropTypes.object,
    availableCountries: PropTypes.array,
    availableStates: PropTypes.array,
    availableCounties: PropTypes.array,
    availableDistricts: PropTypes.array,
    availableCities: PropTypes.array,
    selectEntity: PropTypes.func,
    loadStates: PropTypes.func,
    loadCounties: PropTypes.func,
    loadDistricts: PropTypes.func,
    clearStates: PropTypes.func,
    clearCounties: PropTypes.func,
    clearDistricts: PropTypes.func,
    clearCitiesAndSelectedCity: PropTypes.func,
    createLocationObject: PropTypes.func,
    addLocation: PropTypes.func,
    validateZip: PropTypes.func,
    setCitySearchString: PropTypes.func,
    citySearchString: PropTypes.string,
    loading: PropTypes.bool,
    enableCitySearch: PropTypes.bool
};

const defaultProps = {
    enableCitySearch: false
};

export default class LocationPicker extends React.Component {
    constructor(props) {
        super(props);

        this.submitForm = this.submitForm.bind(this);
        this.generateWarning = this.generateWarning.bind(this);
    }

    componentDidUpdate(prevProps) {
        const stateChanged = (prevProps.state.code !== this.props.state.code);
        const countryChanged = (prevProps.country.code !== this.props.country.code);
        const isCityInState = ( // if selected city is inside the selected state, don't clear the selected city!
            this.props.state.code === this.props.city.code
        );

        if (countryChanged && this.props.country.code === "USA") {
            // user has selected USA, load the state list
            this.props.loadStates();
            this.props.clearCitiesAndSelectedCity();
        }
        else if (countryChanged && prevProps.country.code === 'USA') {
            // the user previously selected USA, need to clear these out
            this.props.clearStates();
            this.props.clearCitiesAndSelectedCity();
        }
        else if (countryChanged) {
            //  since USA isn't selected and wasn't previously selected, only clear cities
            this.props.clearCitiesAndSelectedCity();
        }
        if (stateChanged && this.props.state.code && !isCityInState) {
            // state code changed, load the counties
            this.props.loadCounties(this.props.state.code.toLowerCase());
            // also the districts
            this.props.loadDistricts(this.props.state.code.toLowerCase());
            this.props.clearCitiesAndSelectedCity();
        }
        else if (stateChanged && !this.props.state.code && !isCityInState) {
            this.props.clearCounties();
            this.props.clearDistricts();
            this.props.clearCitiesAndSelectedCity();
        }
    }

    submitForm(e) {
        // don't reload the page on submit
        e.preventDefault();
    }

    generateWarning(field) {
        if (!this.props.country.code) {
            // no country provided
            return (
                <span>
                    Please select a&nbsp;
                    <span className="field">country</span> before selecting a&nbsp;
                    <span className="field">{field}</span>.
                </span>
            );
        }
        else if (this.props.country.code === 'USA') {
            const {
                state,
                district,
                county,
                city
            } = this.props;
            const countyOrDistrictSelected = (district.district || county.code);
            if (!state.code) {
                // no state
                return (
                    <span>
                        Please select a&nbsp;
                        <span className="field">state</span> before selecting a&nbsp;
                        <span className="field">{field}</span>.
                    </span>
                );
            }
            else if (countyOrDistrictSelected || (city.code && (!district.district || !county.code))) {
                const selectedField = (district.district) ? "congressional district" : "county"; // if evaluates to county, double check it's not actually city
                return (
                    <span>
                        You cannot select both a <span className="field">{(selectedField === "county" && county.code) ? selectedField : "city"}</span> and a <span className="field"> {field}</span>.
                    </span>
                );
            }
            return null;
        }
        return (
            <span>
                Filtering by <span className="field">{field}</span> is only available for locations within the United States.
            </span>
        );
    }

    render() {
        const isCityEnabled = (
            this.props.country.code !== "" &&
            !this.props.county.code &&
            !this.props.district.district
        );
        const isCountyEnabled = (
            this.props.state.code !== "" &&
            !this.props.district.district &&
            !this.props.city.code
        );
        const isDistrictEnabled = (
            this.props.state.code !== "" &&
            !this.props.county.code &&
            !this.props.city.code
        );
        const isStateEnabled = (this.props.country.code === 'USA');

        let districtPlaceholder = 'Select a congressional district';
        if (this.props.state.code !== '' && this.props.availableDistricts.length === 0) {
            // no districts in this state
            districtPlaceholder = 'No congressional districts in territory';
        }

        let isAddFilterDisabled = true;
        if (this.props.country.code !== '') {
            // enable the button if at least some filters are selected
            isAddFilterDisabled = false;

            // check to see if the location is already selected
            const location = this.props.createLocationObject();
            if (location && this.props.selectedLocations.has(location.identifier)) {
                // it is already selected
                isAddFilterDisabled = true;
            }
        }

        return (
            <div>
                <form
                    className="location-filter-form"
                    onSubmit={this.submitForm}>
                    <div className="location-item">
                        <EntityDropdown
                            scope="country"
                            placeholder="Select a country"
                            title="COUNTRY"
                            value={this.props.country}
                            selectEntity={this.props.selectEntity}
                            options={this.props.availableCountries}
                            generateWarning={this.generateWarning} />
                    </div>
                    <div className="location-item">
                        <EntityDropdown
                            scope="state"
                            placeholder="Select a state"
                            title="STATE (US ONLY)"
                            value={this.props.state}
                            selectEntity={this.props.selectEntity}
                            options={this.props.availableStates}
                            enabled={isStateEnabled}
                            generateWarning={this.generateWarning} />
                    </div>
                    <div className="location-item">
                        <EntityDropdown
                            scope="county"
                            placeholder="Select a county"
                            title="COUNTY (US ONLY)"
                            value={this.props.county}
                            selectEntity={this.props.selectEntity}
                            options={this.props.availableCounties}
                            enabled={isCountyEnabled}
                            generateWarning={this.generateWarning} />
                    </div>
                    {this.props.enableCitySearch &&
                        <div className="location-item">
                            <EntityDropdown
                                type="autocomplete"
                                loading={this.props.loading}
                                scope="city"
                                placeholder="Enter a City"
                                title="CITY"
                                value={this.props.city}
                                options={this.props.availableCities}
                                selectEntity={this.props.selectEntity}
                                enabled={isCityEnabled}
                                generateWarning={this.generateWarning}
                                setSearchString={this.props.setCitySearchString}
                                searchString={this.props.citySearchString} />
                        </div>}
                    <div className="location-item">
                        <EntityDropdown
                            scope="district"
                            matchKey="district"
                            placeholder={districtPlaceholder}
                            title="CONGRESSIONAL DISTRICT (US ONLY)"
                            value={this.props.district}
                            selectEntity={this.props.selectEntity}
                            options={this.props.availableDistricts}
                            enabled={isDistrictEnabled}
                            generateWarning={this.generateWarning} />
                    </div>
                    <button
                        className="add-location"
                        onClick={this.props.addLocation}
                        aria-controls="award-search-selected-locations"
                        disabled={isAddFilterDisabled}>
                        Add Filter
                    </button>
                </form>
                <hr className="location-picker-divider" />
                <ZIPField
                    zip={this.props.zip}
                    validateZip={this.props.validateZip} />
            </div>
        );
    }
}

LocationPicker.propTypes = propTypes;
LocationPicker.defaultProps = defaultProps;

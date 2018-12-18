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
    district: PropTypes.object,
    zip: PropTypes.object,
    availableCountries: PropTypes.array,
    availableStates: PropTypes.array,
    availableCounties: PropTypes.array,
    availableDistricts: PropTypes.array,
    selectEntity: PropTypes.func,
    loadStates: PropTypes.func,
    loadCounties: PropTypes.func,
    loadDistricts: PropTypes.func,
    clearStates: PropTypes.func,
    clearCounties: PropTypes.func,
    clearDistricts: PropTypes.func,
    createLocationObject: PropTypes.func,
    addLocation: PropTypes.func,
    validateZip: PropTypes.func
};

export default class LocationPicker extends React.Component {
    constructor(props) {
        super(props);

        this.submitForm = this.submitForm.bind(this);
        this.generateWarning = this.generateWarning.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.country.code !== this.props.country.code) {
            if (this.props.country.code === 'USA') {
                // user has selected USA, load the state list
                this.props.loadStates();
            }
            else if (this.props.country.code === 'USA') {
                // the user previously selected USA but it is no longer selected
                this.props.clearStates();
            }
        }

        if (prevProps.state.code !== this.props.state.code) {
            if (this.props.state.code !== '') {
                // state code changed, load the counties
                this.props.loadCounties(this.props.state.code.toLowerCase());
                // also the districts
                this.props.loadDistricts(this.props.state.code.toLowerCase());
            }
            else {
                this.props.clearCounties();
                this.props.clearDistricts();
            }
        }
    }

    submitForm(e) {
        // don't reload the page on submit
        e.preventDefault();
    }

    generateWarning(field) {
        if (this.props.country.code === '') {
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
            if (this.props.state.code === '') {
                // no state
                return (
                    <span>
                        Please select a&nbsp;
                        <span className="field">state</span> before selecting a&nbsp;
                        <span className="field">{field}</span>.
                    </span>
                );
            }
            else if (this.props.county.code !== '' || this.props.district.district !== '') {
                // county selected
                return (
                    <span>
                        You cannot select both a <span className="field">county</span> and a <span className="field">congressional district</span>.
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
        let districtPlaceholder = 'Select a congressional district';
        if (this.props.state.code !== '' && this.props.availableDistricts.length === 0) {
            // no districts in this state
            districtPlaceholder = 'No congressional districts in territory';
        }

        let disabled = true;
        if (this.props.country.code !== '') {
            // enable the button if at least some filters are selected
            disabled = false;

            // check to see if the location is already selected
            const location = this.props.createLocationObject();
            if (location && this.props.selectedLocations.has(location.identifier)) {
                // it is already selected
                disabled = true;
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
                            title="Country"
                            value={this.props.country}
                            selectEntity={this.props.selectEntity}
                            options={this.props.availableCountries}
                            generateWarning={this.generateWarning} />
                    </div>
                    <div className="location-item">
                        <EntityDropdown
                            scope="state"
                            placeholder="Select a state"
                            title="State"
                            value={this.props.state}
                            selectEntity={this.props.selectEntity}
                            options={this.props.availableStates}
                            enabled={this.props.country.code === 'USA'}
                            generateWarning={this.generateWarning} />
                    </div>
                    <div className="location-item">
                        <EntityDropdown
                            scope="county"
                            placeholder="Select a county"
                            title="County"
                            value={this.props.county}
                            selectEntity={this.props.selectEntity}
                            options={this.props.availableCounties}
                            enabled={this.props.state.code !== '' && this.props.district.district === ''}
                            generateWarning={this.generateWarning} />
                    </div>
                    <div className="location-item">
                        <EntityDropdown
                            scope="district"
                            matchKey="district"
                            placeholder={districtPlaceholder}
                            title="Congressional District"
                            value={this.props.district}
                            selectEntity={this.props.selectEntity}
                            options={this.props.availableDistricts}
                            enabled={this.props.state.code !== '' && this.props.county.code === ''}
                            generateWarning={this.generateWarning} />
                    </div>
                    <button
                        className="add-location"
                        onClick={this.props.addLocation}
                        aria-controls="award-search-selected-locations"
                        disabled={disabled}>
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

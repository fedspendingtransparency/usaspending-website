/**
 * LocationPicker.jsx
 * Created by Kevin Li 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import EntityDropdown from './EntityDropdown';

const propTypes = {
    country: PropTypes.object,
    state: PropTypes.object,
    county: PropTypes.object,
    district: PropTypes.object,
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
    addLocation: PropTypes.func
};

export default class LocationPicker extends React.Component {
    constructor(props) {
        super(props);

        this.submitForm = this.submitForm.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.country.code !== this.props.country.code) {
            if (nextProps.country.code === 'USA') {
                // user has selected USA, load the state list
                this.props.loadStates();
            }
            else if (this.props.country.code === 'USA') {
                // the user previously selected USA but it is no longer selected
                this.props.clearStates();
            }
        }

        if (nextProps.state.code !== this.props.state.code) {
            if (nextProps.state.code !== '') {
                // state code changed, load the counties
                this.props.loadCounties(nextProps.state.code.toLowerCase());
                // also the districts
                this.props.loadDistricts(nextProps.state.code.toLowerCase());
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

    render() {
        let districtPlaceholder = 'Select a district';
        if (this.props.state.code !== '' && this.props.availableDistricts.length === 0) {
            // no districts in this state
            districtPlaceholder = 'No congressional districts in territory';
        }
        return (
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
                        options={this.props.availableCountries} />
                </div>
                <div className="location-item">
                    <EntityDropdown
                        scope="state"
                        placeholder="Select a state"
                        title="State"
                        value={this.props.state}
                        selectEntity={this.props.selectEntity}
                        options={this.props.availableStates}
                        enabled={this.props.country.code === 'USA'} />
                </div>
                <div className="location-item">
                    <EntityDropdown
                        scope="county"
                        placeholder="Select a county"
                        title="County"
                        value={this.props.county}
                        selectEntity={this.props.selectEntity}
                        options={this.props.availableCounties}
                        enabled={this.props.state.code !== ''} />
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
                        enabled={this.props.state.code !== ''} />
                </div>
                <button
                    className="add-location"
                    onClick={this.props.addLocation}>
                    Add Filter
                </button>
            </form>
        );
    }
}

LocationPicker.propTypes = propTypes;

/**
 * LocationFilter.jsx
 * Created by Lizzie Salita 3/23/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import { CheckCircle } from 'components/sharedComponents/icons/Icons';
import EntityDropdown from 'components/search/filters/location/EntityDropdown';

const propTypes = {
    locationTypes: PropTypes.array,
    states: PropTypes.array,
    currentLocation: PropTypes.object,
    updateFilter: PropTypes.func,
    currentLocationType: PropTypes.string
};

const countryOptions = [
    {
        code: 'all',
        name: 'All'
    },
    {
        code: 'USA',
        name: 'United States'
    },
    {
        code: 'FOREIGN',
        name: 'All Foreign Countries'
    }
];

export default class LocationFilter extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.updateLocationFilter = this.updateLocationFilter.bind(this);
        this.generateDisclaimer = this.generateDisclaimer.bind(this);
    }

    onChange(e) {
        const target = e.target;
        this.props.updateFilter('locationType', target.value);
    }

    generateDisclaimer(field) {
        if (!this.props.currentLocation.country.code) {
            // no country provided
            return (
                <span>
                    Please select a&nbsp;
                    <span className="field">country</span> before selecting a&nbsp;
                    <span className="field">{field}</span>.
                </span>
            );
        }
        return (
            <span>
                Filtering by <span className="field">{field}</span> is only available for locations within the United States.
            </span>
        );
    }

    updateLocationFilter(locationType, selectedLocation) {
        if (locationType === 'country') {
            this.props.updateFilter('location', {
                country: selectedLocation,
                state: {
                    code: '',
                    name: ''
                }
            });
        }
        else if (locationType === 'state') {
            const updatedLocation = Object.assign({}, this.props.currentLocation, {
                state: selectedLocation
            });

            this.props.updateFilter('location', updatedLocation);
        }
    }

    render() {
        const icon = (
            <div className="icon valid">
                <CheckCircle />
            </div>
        );

        const states = this.props.states.slice();
        states.unshift({
            code: 'all',
            name: 'All'
        });

        const locationTypes = this.props.locationTypes.map((locationType) => (
            <div
                className="radio"
                key={locationType.name}>
                <input
                    type="radio"
                    aria-label={locationType.name}
                    value={locationType.name}
                    name="locationType"
                    checked={this.props.currentLocationType === locationType.name}
                    onChange={this.onChange} />
                <label className="radio-label" htmlFor="locationType">{locationType.label}</label>
            </div>
        ));

        return (
            <div className="download-filter">
                <h3 className="download-filter__title">
                    {icon} Select a <span className="download-filter__title_em">location</span>.
                </h3>
                <div className="download-filter__content">
                    {locationTypes}
                    <EntityDropdown
                        scope="country"
                        placeholder="Select a Country"
                        title="Country"
                        value={this.props.currentLocation.country}
                        selectEntity={this.updateLocationFilter}
                        options={countryOptions}
                        field="country"
                        generateDisclaimer={this.generateDisclaimer} />
                    <EntityDropdown
                        scope="state"
                        placeholder="Select a State"
                        title="State"
                        value={this.props.currentLocation.state}
                        selectEntity={this.updateLocationFilter}
                        options={states}
                        field="state"
                        enabled={this.props.currentLocation.country.code === 'USA'}
                        generateDisclaimer={this.generateDisclaimer} />
                </div>
            </div>
        );
    }
}

LocationFilter.propTypes = propTypes;

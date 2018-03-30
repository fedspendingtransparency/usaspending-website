/**
 * LocationFilter.jsx
 * Created by Lizzie Salita 3/23/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import { CheckCircle } from 'components/sharedComponents/icons/Icons';
import EntityDropdown from 'components/search/filters/location/EntityDropdown';

const propTypes = {
    states: PropTypes.array,
    currentLocation: PropTypes.object,
    updateFilter: PropTypes.func
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

        this.updateLocationFilter = this.updateLocationFilter.bind(this);
        this.generateWarning = this.generateWarning.bind(this);
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

    generateWarning(field) {
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

        return (
            <div className="download-filter">
                <div className="download-filter__title">
                    {icon} Select a <span className="download-filter__title_em">recipient location</span>.
                </div>
                <div className="download-filter__content">
                    <EntityDropdown
                        scope="country"
                        placeholder="Select a Country"
                        title="Country"
                        value={this.props.currentLocation.country}
                        selectEntity={this.updateLocationFilter}
                        options={countryOptions}
                        generateWarning={this.generateWarning} />
                    <EntityDropdown
                        scope="state"
                        placeholder="Select a State"
                        title="State"
                        value={this.props.currentLocation.state}
                        selectEntity={this.updateLocationFilter}
                        options={states}
                        enabled={this.props.currentLocation.country.code === 'USA'}
                        generateWarning={this.generateWarning} />
                </div>
            </div>
        );
    }
}

LocationFilter.propTypes = propTypes;

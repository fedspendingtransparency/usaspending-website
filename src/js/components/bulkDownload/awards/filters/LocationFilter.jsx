/**
 * LocationFilter.jsx
 * Created by Lizzie Salita 3/23/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle } from 'components/sharedComponents/icons/Icons';
import EntityDropdown from 'components/bulkDownload/awards/filters/EntityDropdown';

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

const LocationFilter = ({
    locationTypes,
    states,
    currentLocation,
    updateFilter,
    currentLocationType
}) => {
    const onChange = (e) => {
        const target = e.target;
        updateFilter('locationType', target.value);
    };

    const generateDisclaimer = (field) => {
        if (!currentLocation.country.code) {
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
                Filtering by
                <span className="field"> {field} </span>
                is only available for locations within the United States.
            </span>
        );
    };

    const updateLocationFilter = (locationType, selectedLocation) => {
        if (locationType === 'country') {
            updateFilter('location', {
                country: selectedLocation,
                state: {
                    code: '',
                    name: ''
                }
            });
        }
        else if (locationType === 'state') {
            const updatedLocation = Object.assign({}, currentLocation, {
                state: selectedLocation
            });

            updateFilter('location', updatedLocation);
        }
    };

    const stateOptions = states.slice();

    stateOptions.unshift({
        code: 'all',
        name: 'All'
    });

    const locationTypesArray = locationTypes.map((locationType) => (
        <div
            className="radio"
            key={locationType.name}>
            <input
                type="radio"
                aria-label={locationType.name}
                value={locationType.name}
                name="locationType"
                checked={currentLocationType === locationType.name}
                onChange={onChange} />
            <label className="radio-label" htmlFor="locationType">{locationType.label}</label>
        </div>
    ));

    return (
        <div className="download-filter">
            <h3 className="download-filter__title">
                <div className="icon valid">
                    <CheckCircle />
                </div>
                {' '}Select a <span className="download-filter__title_em">location</span>.
            </h3>
            <div className="download-filter__content">
                {locationTypesArray}
                <EntityDropdown
                    scope="country"
                    placeholder="Select a Country"
                    title="Country"
                    value={currentLocation.country}
                    selectEntity={updateLocationFilter}
                    options={countryOptions}
                    field="country"
                    generateDisclaimer={generateDisclaimer} />
                <EntityDropdown
                    scope="state"
                    placeholder="Select a State"
                    title="State"
                    value={currentLocation.state}
                    selectEntity={updateLocationFilter}
                    options={stateOptions}
                    field="state"
                    enabled={currentLocation.country.code === 'USA'}
                    generateDisclaimer={generateDisclaimer} />
            </div>
        </div>
    );
}

LocationFilter.propTypes = propTypes;
export default LocationFilter;

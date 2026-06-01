/**
 * LocationFilter.jsx
 * Created by Lizzie Salita 3/23/18
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { awardDownloadOptions } from 'dataMapping/bulkDownload/bulkDownloadOptions';
import { CheckCircle } from 'components/sharedComponents/icons/Icons';
import EntityDropdown from 'components/bulkDownload/awards/filters/EntityDropdown';
import { useSelector } from "react-redux";

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

const { locationTypes } = awardDownloadOptions;

const propTypes = {
    states: PropTypes.array,
    updateFilter: PropTypes.func
};

// eslint-disable-next-line prefer-arrow-callback
const LocationFilter = memo(function LocationFilter({
    states,
    updateFilter
}) {
    const location = useSelector((state) => state.bulkDownload.awards.location);
    const locationType = useSelector((state) => state.bulkDownload.awards.locationType);

    const onChange = (e) => {
        const target = e.target;
        updateFilter('locationType', target.value);
    };

    const generateDisclaimer = (field) => {
        if (!location.country.code) {
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
            const updatedLocation = Object.assign({}, location, {
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

    const locationTypesArray = locationTypes.map((type) => (
        <div
            className="radio"
            key={type.name}>
            <input
                type="radio"
                aria-label={type.name}
                value={type.name}
                name="locationType"
                checked={locationType === type.name}
                onChange={onChange} />
            <label className="radio-label" htmlFor="locationType">{type.label}</label>
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
                    value={location.country}
                    selectEntity={updateLocationFilter}
                    options={countryOptions}
                    field="country"
                    generateDisclaimer={generateDisclaimer} />
                <EntityDropdown
                    scope="state"
                    placeholder="Select a State"
                    title="State"
                    value={location.state}
                    selectEntity={updateLocationFilter}
                    options={stateOptions}
                    field="state"
                    enabled={location.country.code === 'USA'}
                    generateDisclaimer={generateDisclaimer} />
            </div>
        </div>
    );
});

LocationFilter.propTypes = propTypes;
export default LocationFilter;

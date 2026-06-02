/**
 * LocationFilter.jsx
 * Created by Lizzie Salita 3/23/18
 */

import React, { memo, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { awardDownloadOptions } from 'dataMapping/bulkDownload/bulkDownloadOptions';
import { CheckCircle } from 'components/sharedComponents/icons/Icons';
import ComboBox from "components/sharedComponents/ComboBox";

const countryOptions = [
    {
        value: 'all',
        text: 'All Countries'
    },
    {
        value: 'USA',
        text: 'United States'
    },
    {
        value: 'FOREIGN',
        text: 'All Foreign Countries'
    }
];

const getCountryOption = (v) => {
    switch (v) {
        case 'USA': return { code: countryOptions[1].value, name: countryOptions[1].text };
        case 'FOREIGN': return { code: countryOptions[2].value, name: countryOptions[2].text };
        default: return { code: countryOptions[0].value, name: countryOptions[0].text };
    }
}

const { locationTypes } = awardDownloadOptions;

const propTypes = {
    states: PropTypes.array,
    updateFilter: PropTypes.func
};

// eslint-disable-next-line prefer-arrow-callback
const LocationFilter = memo(function LocationFilter({ states, updateFilter }) {
    const location = useSelector((state) => state.bulkDownload.awards.location);
    const locationType = useSelector((state) => state.bulkDownload.awards.locationType);

    const onChange = (e) => {
        const target = e.target;
        updateFilter('locationType', target.value);
    };

    const updateCountry = useCallback((e) => {
        updateFilter('location', {
            country: getCountryOption(e.target.value),
            state: { code: '', name: '' }
        });
    }, [updateFilter]);

    const updateState = (e) => {
        const updatedLocation = Object.assign({}, location, {
            state: e.target.value
        });

        updateFilter('location', updatedLocation);
    };

    const stateOptions = useMemo(() => {
        const tempArr = states.slice();

        tempArr.unshift({ code: 'all', name: 'All' });

        return tempArr.map(({ code, name }) => ({ value: code, text: name }));
    }, [states])

    const locationTypesArray = locationTypes.map((type) => (
        <div
            className="radio"
            key={type.name}>
            <label className={"radio-label"} htmlFor={"locationType"}>
                <input
                    type="radio"
                    aria-label={type.name}
                    value={type.name}
                    name="locationType"
                    checked={locationType === type.name}
                    onChange={onChange} />
                <div className="radio-container">
                    {type.label}
                    <div className="radio-description">
                        {type.description}
                    </div>
                </div>
            </label>
        </div>
    ));

    // set location to all on render
    useEffect(() => updateCountry({ target: { value: 'all' } }), [updateCountry]);

    return (
        <div className="download-filter">
            <h3 className="download-filter__title">
                <div className="icon valid">
                    <CheckCircle />
                </div>
                {' '}Select a <span className="download-filter__title_em">location</span>.
            </h3>
            <div className="download-filter__content location">
                <div className="input-container">
                    {locationTypesArray}
                </div>
                <div className="combo-box-container">
                    <ComboBox
                        optionsArray={countryOptions}
                        onSelect={updateCountry}
                        label={"Country"}
                        placeholder={"Select a Country"}
                        defaultValue={'All Countries'} />
                    <ComboBox
                        optionsArray={stateOptions}
                        onSelect={updateState}
                        label={"State"}
                        placeholder={"Select a State"}
                        disabled={location.country.code !== "USA"} />
                </div>
            </div>
        </div>
    );
});

LocationFilter.propTypes = propTypes;
export default LocationFilter;

/**
 * LocationFilter.jsx
 * Created by Lizzie Salita 3/23/18
 */

import React, { memo, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { awardDownloadOptions } from 'dataMapping/bulkDownload/bulkDownloadOptions';
import FilterSectionTitle from 'components/bulkDownload/FilterSelectionTitle';
import ComboBox from "components/sharedComponents/ComboBox";
import BulkDownloadRadioButton from "../../../sharedComponents/BulkDownloadRadioButton";
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

    const onCountryClearSelect = () => updateFilter('location', '');

    const updateState = (e) => {
        const getState = (v) => {
            switch (v) {
                case '':return [{ code: '', name: '' }];
                case 'all':return [{ code: 'all', name: 'All' }];
                default: return states.filter(({ code }) => code === e.target.value);
            }
        }

        const updatedLocation = Object.assign({}, location, {
            state: getState(e.target.value)[0]
        });

        updateFilter('location', updatedLocation);
    };

    const onStateClearSelect = () => updateState({ target: { value: '' }});

    const stateOptions = useMemo(() => {
        const tempArr = states?.slice();

        tempArr?.unshift({ code: 'all', name: 'All' });

        return tempArr?.map(({ code, name }) => ({ value: code, text: name }));
    }, [states])

    const locationTypesArray = locationTypes.map(({ name, label, description }) => (
        <BulkDownloadRadioButton
            name="locationType"
            value={name}
            checked={locationType === name}
            onChange={onChange}
            label={label}
            description={description}
            key={name} />
    ));

    // set location to all on render
    useEffect(() => updateCountry({ target: { value: 'all' } }), [updateCountry]);

    return (
        <div className="download-filter">
            <FilterSectionTitle type="location" />
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
                        defaultValue={'All Countries'}
                        onClearSelect={onCountryClearSelect} />
                    <ComboBox
                        optionsArray={stateOptions}
                        onSelect={updateState}
                        label={"State"}
                        placeholder={"Select a State"}
                        disabled={location.country?.code !== "USA"}
                        onClearSelect={onStateClearSelect} />
                </div>
            </div>
        </div>
    );
});

LocationFilter.propTypes = propTypes;
export default LocationFilter;

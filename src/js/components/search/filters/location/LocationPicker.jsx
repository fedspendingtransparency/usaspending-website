/* eslint-disable camelcase */
/**
 * LocationPicker.jsx
 * Created by Kevin Li 10/30/17
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash-es';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from "data-transparency-ui";
import EntityDropdown from './EntityDropdown';
import ZIPField from './ZIPField';
import { defaultLocationValues } from
    "../../../../containers/search/filters/location/LocationPickerContainer";
import { showSlideout } from '../../../../helpers/slideoutHelper';
import usePrevious from "../../../../hooks/usePrevious";
import EntityCDTooltip from "./EntityCDTooltip";

const propTypes = {
    selectedLocations: PropTypes.object,
    country: PropTypes.object,
    state: PropTypes.object,
    county: PropTypes.object,
    city: PropTypes.object,
    district_current: PropTypes.object,
    district_original: PropTypes.object,
    zip: PropTypes.object,
    availableCountries: PropTypes.array,
    availableStates: PropTypes.array,
    availableCounties: PropTypes.array,
    availableCurrentDistricts: PropTypes.array,
    availableOriginalDistricts: PropTypes.array,
    availableCities: PropTypes.array,
    selectEntity: PropTypes.func,
    loadStates: PropTypes.func,
    loadCounties: PropTypes.func,
    loadDistricts: PropTypes.func,
    clearStates: PropTypes.func,
    clearCounties: PropTypes.func,
    clearOriginalDistricts: PropTypes.func,
    clearCurrentDistricts: PropTypes.func,
    clearCitiesAndSelectedCity: PropTypes.func,
    createLocationObject: PropTypes.func,
    addLocation: PropTypes.func,
    validateZip: PropTypes.func,
    setCitySearchString: PropTypes.func,
    citySearchString: PropTypes.string,
    loading: PropTypes.bool,
    enableCitySearch: PropTypes.bool,
    scope: PropTypes.oneOf(["primary_place_of_performance", "recipient_location"])
};

const LocationPicker = ({
    selectedLocations,
    country,
    state,
    county,
    city,
    district_current,
    district_original,
    zip,
    availableCountries,
    availableStates,
    availableCounties,
    availableCurrentDistricts,
    availableOriginalDistricts,
    availableCities,
    selectEntity,
    loadStates,
    loadCounties,
    loadDistricts,
    clearStates,
    clearCounties,
    clearOriginalDistricts,
    clearCurrentDistricts,
    clearCitiesAndSelectedCity,
    createLocationObject,
    addLocation,
    validateZip,
    setCitySearchString,
    citySearchString,
    loading,
    enableCitySearch = false,
    scope
}) => {
    const prevProps = usePrevious();
    const isUSA = country.code === "USA";

    const isCityEnabled = (
        country.code !== "" &&
        !county.code &&
        !district_current?.district &&
        !district_original?.district
    );
    const isCountyEnabled = (
        state.code !== "" &&
        !district_current?.district &&
        !district_original?.district &&
        !city.code
    );
    const isDistrictEnabled = (
        state.code !== "" &&
        !county.code &&
        !city.code
    );

    const isOriginalDistrictEnabled = (
        isDistrictEnabled &&
        (isEqual(district_current, defaultLocationValues.district_current) ||
            isEqual(district_current, {
                code: '',
                district: '',
                name: 'All congressional districts'
            })
        )
    );

    const isCurrentDistrictEnabled = (
        isDistrictEnabled &&
        (isEqual(district_original, defaultLocationValues.district_original) ||
            isEqual(district_original, {
                code: '',
                district: '',
                name: 'All congressional districts'
            })
        )
    );

    let districtPlaceholder = 'Select a congressional district';
    if (state.code !== '' &&
        (availableOriginalDistricts?.length === 0 || availableCurrentDistricts?.length === 0)) {
        // no districts in this state
        districtPlaceholder = 'No congressional districts in territory';
    }

    let isAddFilterDisabled = true;
    if (country.code !== '') {
        // enable the button if at least some filters are selected
        isAddFilterDisabled = false;

        // check to see if the location is already selected
        const location = createLocationObject();
        if (location && selectedLocations.has(location.identifier)) {
            // it is already selected
            isAddFilterDisabled = true;
        }
    }

    const showDisclaimer = (
        scope === 'primary_place_of_performance' &&
        country.code !== 'USA' &&
        country.code !== ''
    );

    const submitForm = (e) => {
        // don't reload the page on submit
        e.preventDefault();
    };

    const atdClick = () => {
        showSlideout('atd', { url: 'congressional-district-data' });
    };

    const generateDisclaimer = (field) => {
        if (!country.code) {
            // no country provided
            return (
                <span>
                    Please select a&nbsp;
                    <span className="field">country</span> before selecting a&nbsp;
                    <span className="field">{field}</span>.
                </span>
            );
        }
        else if (
            country.code !== 'USA' &&
            field === 'CITY' &&
            scope === "primary_place_of_performance"
        ) {
            return (
                <span>
                    Place of Performance data for foreign cities is limited and may return fewer results.
                </span>
            );
        }
        else if (country.code === 'USA') {
            const countyOrDistrictSelected = (
                (district_original.district || district_current.district) || county.code
            );
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
            else if (
                countyOrDistrictSelected ||
                (city.code && ((!district_original || !district_current) || !county.code))
            ) {
                // if evaluates to county, double check it's not actually city
                const selectedField = (
                    district_original.district || district_current.district) ?
                    "congressional district" : "county";
                return (
                    <span>
                        You cannot select both a <span className="field">{(selectedField === "county" && !county.code) ? "city" : selectedField}</span> and a <span className="field"> {field}</span>.
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
    };

    useEffect(() => {
        // a state that was autoPopulated and then removed via
        // city de-selection will have prevProps.state.autoPopulated === true
        const cityDeselected = (prevProps?.city.name && !city.name);

        if (cityDeselected && state.autoPopulated) {
            // city was deselected which autopopulated state selection, so clear the state selection
            selectEntity('state', defaultLocationValues.state);
        }
        else if (cityDeselected && country.autoPopulated) {
            selectEntity(
                'country',
                { code: "FOREIGN", name: "ALL FOREIGN COUNTRIES", autoPopulated: true }
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city.name]);

    useEffect(() => {
        if (country.code === "USA") {
            // user has selected USA, load the state list
            loadStates();
            if (!country.autoPopulated) {
                clearCitiesAndSelectedCity();
            }
        }
        else {
            clearStates();
            clearCitiesAndSelectedCity();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [country.code]);

    useEffect(() => {
        // selected city is w/in the selected state
        const isCityInState = (
            country.code === 'USA' &&
            state.code === city.code &&
            state.code &&
            city.code
        );

        const manuallyPopulatedStateChanged = (
            !prevProps?.state.autoPopulated &&
            (prevProps?.state.code !== state.code)
        );

        if (state.code) {
            // new state selected , load the corresponding counties & districts
            loadCounties(state.code.toLowerCase());
            loadDistricts(state.code.toLowerCase());
            if (!isCityInState) {
                // only clear the city if the new state does not contain selected city
                clearCitiesAndSelectedCity();
            }
        }
        else {
            // manually selected state was removed, clear counties, districts & cities
            clearCounties();
            clearOriginalDistricts();
            clearCurrentDistricts();
            if (manuallyPopulatedStateChanged) {
                clearCitiesAndSelectedCity();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.code]);

    return (
        <div>
            <form
                className="location-filter-form"
                onSubmit={submitForm}>
                <div className="location-item">
                    <EntityDropdown
                        field="country"
                        placeholder="Select a country"
                        title="COUNTRY"
                        value={country}
                        selectEntity={selectEntity}
                        options={availableCountries}
                        generateDisclaimer={generateDisclaimer} />
                </div>
                <div className="location-item">
                    <EntityDropdown
                        field="state"
                        placeholder="Select a state"
                        title="STATE (US ONLY)"
                        value={state}
                        selectEntity={selectEntity}
                        options={availableStates}
                        enabled={isUSA}
                        generateDisclaimer={generateDisclaimer} />
                </div>
                <div className="location-item">
                    <EntityDropdown
                        field="county"
                        placeholder="Select a county"
                        title="COUNTY (US ONLY)"
                        value={county}
                        selectEntity={selectEntity}
                        options={availableCounties}
                        enabled={isCountyEnabled}
                        generateDisclaimer={generateDisclaimer} />
                </div>
                {enableCitySearch &&
                    <div className="location-item">
                        <EntityDropdown
                            type="autocomplete"
                            loading={loading}
                            field="city"
                            scope={scope}
                            placeholder="Enter a City"
                            title="CITY"
                            value={city}
                            options={availableCities}
                            selectEntity={selectEntity}
                            enabled={isCityEnabled}
                            generateDisclaimer={generateDisclaimer}
                            setSearchString={setCitySearchString}
                            searchString={citySearchString}
                            showDisclaimer={showDisclaimer} />
                    </div>}
                <EntityCDTooltip isDistrictEnabled={isDistrictEnabled} />
                <div className="location-item__with-overline">
                    <EntityDropdown
                        field="district"
                        matchKey="district"
                        placeholder={districtPlaceholder}
                        title="Current Congressional Districts (based on 2023 redistricting)"
                        value={district_current}
                        selectEntity={selectEntity}
                        options={availableCurrentDistricts}
                        enabled={isCurrentDistrictEnabled}
                        generateDisclaimer={generateDisclaimer} />
                </div>
                <div className="location-item__with-overline">
                    <EntityDropdown
                        field="district"
                        matchKey="district"
                        placeholder={districtPlaceholder}
                        title="Original Congressional Districts (as reported by federal agencies)"
                        value={district_original}
                        selectEntity={selectEntity}
                        options={availableOriginalDistricts}
                        enabled={isOriginalDistrictEnabled}
                        generateDisclaimer={generateDisclaimer} />
                </div>
                <div className="location-filter__link-container">
                    <Button
                        onClick={atdClick}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                atdClick();
                            }
                        }}
                        additionalClassnames="location-filter__atd-link"
                        copy="Learn about congressional redistricting"
                        buttonSize="sm"
                        buttonType="text"
                        backgroundColor="light"
                        imageAlignment="left"
                        image={
                            <FontAwesomeIcon
                                className="location-filter__atd-info"
                                icon="info-circle" />
                        } />
                </div>
                <button
                    className="add-location"
                    onClick={addLocation}
                    aria-controls="award-search-selected-locations"
                    disabled={isAddFilterDisabled}>
                    Add Filter
                </button>
            </form>
            <hr className="location-picker-divider" />
            <div className="location-item">
                <div className="geo-entity-item">
                    <ZIPField
                        generateDisclaimer={generateDisclaimer}
                        isUSA={isUSA}
                        zip={zip}
                        validateZip={validateZip} />
                </div>
            </div>
        </div>
    );
};

LocationPicker.propTypes = propTypes;
export default LocationPicker;

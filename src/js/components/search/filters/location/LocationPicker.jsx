/* eslint-disable camelcase */
/**
 * LocationPicker.jsx
 * Created by Kevin Li 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TooltipWrapper, Button } from "data-transparency-ui";
import EntityDropdown from './EntityDropdown';
import ZIPField from './ZIPField';
import { defaultLocationValues } from "../../../../containers/search/filters/location/LocationPickerContainer";
import { CDTooltip } from "../tooltips/AdvancedSearchTooltip";
import {
    setAboutTheDataTermFromUrl,
    showAboutTheData
} from "../../../../redux/actions/aboutTheDataSidebar/aboutTheDataActions";
import { setLastOpenedSlideout } from "../../../../redux/actions/slideouts/slideoutActions";

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
    availableDistricts: PropTypes.array,
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

const defaultProps = {
    enableCitySearch: false
};

class LocationPicker extends React.Component {
    constructor(props) {
        super(props);

        this.submitForm = this.submitForm.bind(this);
        this.generateDisclaimer = this.generateDisclaimer.bind(this);
        this.atdClick = this.atdClick.bind(this);
    }

    componentDidUpdate(prevProps) {
        // a state that was autoPopulated and then removed via city de-selection will have prevProps.state.autoPopulated === true
        const manuallyPopulatedStateChanged = (!prevProps.state.autoPopulated && (prevProps.state.code !== this.props.state.code));
        const manuallyPopulatedCountryChanged = (!this.props.country.autoPopulated && (prevProps.country.code !== this.props.country.code));
        const stateChanged = (prevProps.state.code !== this.props.state.code);
        const countryChanged = (prevProps.country.code !== this.props.country.code);

        const isCityInState = ( // selected city is w/in the selected state
            this.props.country.code === 'USA' &&
            this.props.state.code === this.props.city.code &&
            this.props.state.code && this.props.city.code
        );

        const cityDeselected = (prevProps.city.name && !this.props.city.name);

        if (countryChanged && this.props.country.code === "USA") {
            // user has selected USA, load the state list
            this.props.loadStates();
            if (manuallyPopulatedCountryChanged) {
                this.props.clearCitiesAndSelectedCity();
            }
        }
        else if (countryChanged && prevProps.country.code === 'USA') {
            // the user previously selected USA, need to clear these out
            this.props.clearStates();
            if (manuallyPopulatedCountryChanged) {
                this.props.clearCitiesAndSelectedCity();
            }
        }
        else if (manuallyPopulatedCountryChanged) {
            //  since USA isn't selected and wasn't previously selected, only clear cities
            this.props.clearCitiesAndSelectedCity();
        }
        if (stateChanged && this.props.state.code) {
            // new state selected , load the corresponding counties & districts
            this.props.loadCounties(this.props.state.code.toLowerCase());
            this.props.loadDistricts(this.props.state.code.toLowerCase());
            if (!isCityInState) { // only clear the city if the new state does not contain selected city
                this.props.clearCitiesAndSelectedCity();
            }
        }
        else if (stateChanged && !this.props.state.code) {
            // manually selected state was removed, clear counties, districts & cities
            this.props.clearCounties();
            this.props.clearOriginalDistricts();
            this.props.clearCurrentDistricts();
            if (manuallyPopulatedStateChanged) {
                this.props.clearCitiesAndSelectedCity();
            }
        }

        if (cityDeselected && this.props.state.autoPopulated) {
            // city was deselected which auto populated state selection, so clear the state selection
            this.props.selectEntity('state', defaultLocationValues.state);
        }
        else if (cityDeselected && this.props.country.autoPopulated) {
            this.props.selectEntity('country', { code: "FOREIGN", name: "ALL FOREIGN COUNTRIES", autoPopulated: true });
        }
    }

    submitForm(e) {
        // don't reload the page on submit
        e.preventDefault();
    }

    atdClick() {
        this.props.openATD();
        // make sure it will open on top of glossary if glossary is already open
        this.props.setSlideout('atd');
        this.props.setATDTerm('congressional-district-data');
    }

    generateDisclaimer(field) {
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
        else if (this.props.country.code !== 'USA' && field === 'CITY' && this.props.scope === "primary_place_of_performance") {
            return (
                <span>
                    Place of Performance data for foreign cities is limited and may return fewer results.
                </span>
            );
        }
        else if (this.props.country.code === 'USA') {
            const {
                state,
                district_original,
                district_current,
                county,
                city
            } = this.props;
            const countyOrDistrictSelected = ((district_original.district || district_current.district) || county.code);
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
            else if (countyOrDistrictSelected || (city.code && ((!district_original || !district_current) || !county.code))) {
                const selectedField = (district_original.district || district_current.district) ? "congressional district" : "county"; // if evaluates to county, double check it's not actually city
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
    }

    render() {
        const isUSA = this.props.country.code === "USA";

        const isCityEnabled = (
            this.props.country.code !== "" &&
            !this.props.county.code &&
            !this.props.district_current?.district &&
            !this.props.district_original?.district
        );
        const isCountyEnabled = (
            this.props.state.code !== "" &&
            !this.props.district_current?.district &&
            !this.props.district_original?.district &&
            !this.props.city.code
        );
        const isDistrictEnabled = (
            this.props.state.code !== "" &&
            !this.props.county.code &&
            !this.props.city.code
        );

        const isOriginalDistrictEnabled = (isDistrictEnabled && (isEqual(this.props.district_current, defaultLocationValues.district_current) || isEqual(this.props.district_current, {
            code: '',
            district: '',
            name: 'All congressional districts'
        })));
        const isCurrentDistrictEnabled = (isDistrictEnabled && (isEqual(this.props.district_original, defaultLocationValues.district_original) || isEqual(this.props.district_original, {
            code: '',
            district: '',
            name: 'All congressional districts'
        })));

        let districtPlaceholder = 'Select a congressional district';
        if (this.props.state.code !== '' && (this.props.availableOriginalDistricts?.length === 0 || this.props.availableCurrentDistricts?.length === 0)) {
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

        const showDisclaimer = (
            this.props.scope === 'primary_place_of_performance' &&
            this.props.country.code !== 'USA' &&
            this.props.country.code !== ''
        );

        return (
            <div>
                <form
                    className="location-filter-form"
                    onSubmit={this.submitForm}>
                    <div className="location-item">
                        <EntityDropdown
                            field="country"
                            placeholder="Select a country"
                            title="COUNTRY"
                            value={this.props.country}
                            selectEntity={this.props.selectEntity}
                            options={this.props.availableCountries}
                            generateDisclaimer={this.generateDisclaimer} />
                    </div>
                    <div className="location-item">
                        <EntityDropdown
                            field="state"
                            placeholder="Select a state"
                            title="STATE (US ONLY)"
                            value={this.props.state}
                            selectEntity={this.props.selectEntity}
                            options={this.props.availableStates}
                            enabled={isUSA}
                            generateDisclaimer={this.generateDisclaimer} />
                    </div>
                    <div className="location-item">
                        <EntityDropdown
                            field="county"
                            placeholder="Select a county"
                            title="COUNTY (US ONLY)"
                            value={this.props.county}
                            selectEntity={this.props.selectEntity}
                            options={this.props.availableCounties}
                            enabled={isCountyEnabled}
                            generateDisclaimer={this.generateDisclaimer} />
                    </div>
                    {this.props.enableCitySearch &&
                        <div className="location-item">
                            <EntityDropdown
                                type="autocomplete"
                                loading={this.props.loading}
                                field="city"
                                scope={this.props.scope}
                                placeholder="Enter a City"
                                title="CITY"
                                value={this.props.city}
                                options={this.props.availableCities}
                                selectEntity={this.props.selectEntity}
                                enabled={isCityEnabled}
                                generateDisclaimer={this.generateDisclaimer}
                                setSearchString={this.props.setCitySearchString}
                                searchString={this.props.citySearchString}
                                showDisclaimer={showDisclaimer} />
                        </div>}

                    <div className="location-item__cd">
                        <span className={`location-label__with-tt ${isDistrictEnabled === false ? "disabled" : ""}`}>CONGRESSIONAL DISTRICT (US ONLY)</span>
                        <div>
                            <TooltipWrapper
                                className="advanced-search__cd-tooltip"
                                icon="info"
                                tooltipComponent={<CDTooltip />} />
                        </div>
                    </div>
                    <div className="location-item__with-overline">
                        <EntityDropdown
                            field="district"
                            matchKey="district"
                            placeholder={districtPlaceholder}
                            title="Current Congressional Districts (based on 2023 redistricting)"
                            value={this.props.district_current}
                            selectEntity={this.props.selectEntity}
                            options={this.props.availableCurrentDistricts}
                            enabled={isCurrentDistrictEnabled}
                            generateDisclaimer={this.generateDisclaimer} />
                    </div>
                    <div className="location-item__with-overline">
                        <EntityDropdown
                            field="district"
                            matchKey="district"
                            placeholder={districtPlaceholder}
                            title="Original Congressional Districts (as reported by federal agencies)"
                            value={this.props.district_original}
                            selectEntity={this.props.selectEntity}
                            options={this.props.availableOriginalDistricts}
                            enabled={isOriginalDistrictEnabled}
                            generateDisclaimer={this.generateDisclaimer} />
                    </div>
                    <div className="location-filter__link-container">
                        <Button
                            onClick={this.atdClick}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    this.atdClick();
                                }
                            }}
                            additionalClassnames="location-filter__atd-link"
                            copy="Learn about congressional redistricting"
                            buttonSize="sm"
                            buttonType="text"
                            backgroundColor="light"
                            imageAlignment="left"
                            image={<FontAwesomeIcon className="location-filter__atd-info" icon="info-circle" />} />
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
                <div className="location-item">
                    <div className="geo-entity-item">
                        <ZIPField
                            generateDisclaimer={this.generateDisclaimer}
                            isUSA={isUSA}
                            zip={this.props.zip}
                            validateZip={this.props.validateZip} />
                    </div>
                </div>
            </div>
        );
    }
}

LocationPicker.propTypes = propTypes;
LocationPicker.defaultProps = defaultProps;

const mapDispatchToProps = (dispatch) => ({
    openATD: () => dispatch(showAboutTheData()),
    setATDTerm: (term) => dispatch(setAboutTheDataTermFromUrl(term)),
    setSlideout: (str) => dispatch(setLastOpenedSlideout(str))
});
export default connect(null, mapDispatchToProps)(LocationPicker);

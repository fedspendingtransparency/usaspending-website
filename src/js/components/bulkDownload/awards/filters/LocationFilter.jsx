/**
 * LocationFilter.jsx
 * Created by Lizzie Salita 3/23/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    states: PropTypes.array,
    currentLocation: PropTypes.object,
    updateFilter: PropTypes.func
};

const countryOptions = [
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

        this.state = {
            showCountryPicker: false,
            showStatePicker: false
        };

        this.toggleCountryPicker = this.toggleCountryPicker.bind(this);
        this.handleCountrySelect = this.handleCountrySelect.bind(this);
        this.toggleStatePicker = this.toggleStatePicker.bind(this);
        this.handleStateSelect = this.handleStateSelect.bind(this);
    }

    toggleCountryPicker(e) {
        e.preventDefault();
        this.setState({
            showCountryPicker: !this.state.showCountryPicker
        });
    }

    handleCountrySelect(e) {
        e.preventDefault();
        const code = e.target.value;
        const selectedCountry = countryOptions.find((country) => country.code === code);
        const name = selectedCountry.name;

        this.props.updateFilter('location', {
            country: {
                code,
                name
            },
            state: {
                code: '',
                name: ''
            }
        });

        this.setState({
            showCountryPicker: false
        });
    }

    toggleStatePicker(e) {
        e.preventDefault();
        if (this.props.currentLocation.country.code === 'USA') {
            this.setState({
                showStatePicker: !this.state.showStatePicker
            });
        }
    }

    handleStateSelect(e) {
        e.preventDefault();
        const code = e.target.value;
        const selectedState = this.props.states.find((state) => state.code === code);
        const name = selectedState.name;

        const updatedLocation = Object.assign({}, this.props.currentLocation, {
            state: {
                code,
                name
            }
        });

        this.props.updateFilter('location', updatedLocation);

        this.setState({
            showStatePicker: false
        });
    }

    render() {
        const icon = (
            <div className="icon valid">
                <Icons.CheckCircle />
            </div>
        );

        const countries = countryOptions.map((country) => (
            <li
                className="field-item indent"
                key={`field-${country.code}`}>
                <button
                    className="item-button"
                    title={country.name}
                    aria-label={country.name}
                    value={country.code}
                    onClick={this.handleCountrySelect}>
                    {country.name}
                </button>
            </li>
        ));

        const states = this.props.states.map((state) => (
            <li
                className="field-item indent"
                key={`field-${state.fips}`}>
                <button
                    className="item-button"
                    title={state.name}
                    aria-label={state.code}
                    value={state.code}
                    onClick={this.handleStateSelect}>
                    {state.name}
                </button>
            </li>
        ));

        const currentCountry = (this.props.currentLocation.country.code && this.props.currentLocation.country.name)
            || 'Select a Country';
        const currentState = (this.props.currentLocation.state.code && this.props.currentLocation.state.name)
            || 'Select a State';

        let showCountryPicker = 'hide';
        let countryIcon = <Icons.AngleDown alt="Pick a country" />;
        if (this.state.showCountryPicker) {
            showCountryPicker = '';
            countryIcon = <Icons.AngleUp alt="Pick a country" />;
        }

        let showStatePicker = 'hide';
        let stateIcon = <Icons.AngleDown alt="Pick a state" />;
        if (this.state.showStatePicker) {
            showStatePicker = '';
            stateIcon = <Icons.AngleUp alt="Pick a state" />;
        }

        let statesDisabledClass = '';
        if (this.props.currentLocation.country.code !== 'USA') {
            statesDisabledClass = 'disabled';
        }

        return (
            <div className="download-filter">
                <h5 className="download-filter__title">
                    {icon} Select a <span className="download-filter__title_em">recipient location</span>.
                </h5>
                <div className="download-filter__content">
                    <div className="filter-picker">
                        <label className="select-label" htmlFor="state-select">
                            Country
                        </label>

                        <div className="field-picker">
                            <button
                                className="selected-button"
                                title={currentCountry}
                                aria-label={currentCountry}
                                onClick={this.toggleCountryPicker}>
                                <div className="label">
                                    {currentCountry}
                                    <span className="arrow-icon">
                                        {countryIcon}
                                    </span>
                                </div>
                            </button>

                            <div className={`field-list ${showCountryPicker}`}>
                                <ul>
                                    {countries}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="filter-picker">
                        <label className="select-label" htmlFor="state-select">
                            State
                        </label>
                        <div className="field-picker">
                            <button
                                className={`selected-button ${statesDisabledClass}`}
                                title={currentState}
                                aria-label={currentState}
                                onClick={this.toggleStatePicker}>
                                <div className="label">
                                    {currentState}
                                    <span className="arrow-icon">
                                        {stateIcon}
                                    </span>
                                </div>
                            </button>

                            <div className={`field-list ${showStatePicker}`}>
                                <ul>
                                    {states}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

LocationFilter.propTypes = propTypes;

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
    },
    {
        code: '',
        name: '---'
    }
];

export default class LocationFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showCountryPicker: false,
            showStatePicker: false,
            statesDisabled: true
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
        const target = e.target;

        this.props.updateFilter('location', {
            country: {
                code: target.value,
                name: target.name
            },
            state: ''
        });

        if (target.value === 'USA') {
            this.setState({
                statesDisabled: false,
                showCountryPicker: false
            });
        }
        else {
            this.setState({
                statesDisabled: true,
                showCountryPicker: false
            });
        }
    }

    toggleStatePicker(e) {
        e.preventDefault();
        if (!this.state.statesDisabled) {
            this.setState({
                showStatePicker: !this.state.showStatePicker
            });
        }
    }

    handleStateSelect(e) {
        e.preventDefault();
        const target = e.target;

        const updatedLocation = Object.assign({}, this.props.currentLocation, {
            state: target.value
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
                    name={country.name}
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
                    {state.code}
                </button>
            </li>
        ));

        const currentCountry = (this.props.currentLocation.country.code && this.props.currentLocation.country.name)
            || 'Select a Country';
        const currentState = this.props.currentLocation.state || 'Select a State';

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
        if (this.state.statesDisabled) {
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

/**
 * LocationFilter.jsx
 * Created by Lizzie Salita 3/23/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    states: PropTypes.array,
    currentState: PropTypes.string,
    updateFilter: PropTypes.func,
    valid: PropTypes.bool
};

export default class LocationFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showStatePicker: false
        };

        this.toggleStatePicker = this.toggleStatePicker.bind(this);
        this.handleStateSelect = this.handleStateSelect.bind(this);
    }

    toggleStatePicker(e) {
        e.preventDefault();
        this.setState({
            showStatePicker: !this.state.showStatePicker
        });
    }

    handleStateSelect(e) {
        e.preventDefault();
        const target = e.target;
        this.props.updateFilter('location', target.value);

        this.setState({
            showStatePicker: false
        });
    }

    render() {
        let icon = (
            <div className="icon valid">
                <Icons.CheckCircle />
            </div>
        );

        if (!this.props.valid) {
            icon = (
                <div className="icon invalid">
                    <Icons.ExclamationCircle />
                </div>
            );
        }

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

        const currentState = this.props.currentState;

        let showStatePicker = 'hide';
        let locationIcon = <Icons.AngleDown alt="Pick an agency" />;
        if (this.state.showStatePicker) {
            showStatePicker = '';
            locationIcon = <Icons.AngleUp alt="Pick an agency" />;
        }

        return (
            <div className="filter-section">
                <h5 className="filter-section-title">
                    {icon} Select a <span>recipient location</span>.
                </h5>
                <div className="filter-section-content">
                    <div className="filter-picker">
                        <label className="select-label" htmlFor="state-select">
                            State
                        </label>

                        <div className="field-picker">
                            <button
                                className="selected-button"
                                title={currentState}
                                aria-label={currentState}
                                onClick={this.toggleStatePicker}>
                                <div className="label">
                                    {currentState}
                                    <span className="arrow-icon">
                                        {locationIcon}
                                    </span>
                                </div>
                            </button>

                            <div className={`field-list ${showStatePicker}`}>
                                <ul>
                                    <li className="field-item">
                                        <button
                                            className="item-button"
                                            title="All"
                                            aria-label="All"
                                            value="All"
                                            onClick={this.handleStateSelect}>
                                            All
                                        </button>
                                    </li>
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

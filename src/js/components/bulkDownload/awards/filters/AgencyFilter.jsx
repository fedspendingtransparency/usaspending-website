/**
 * AgencyFilter.jsx
 * Created by Lizzie Salita 11/2/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    agencies: PropTypes.array,
    subAgencies: PropTypes.array,
    setSubAgencyList: PropTypes.func,
    currentAgencies: PropTypes.object,
    updateFilter: PropTypes.func,
    valid: PropTypes.bool
};

export default class AgencyFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAgencyPicker: false,
            showSubAgencyPicker: false
        };

        this.toggleAgencyPicker = this.toggleAgencyPicker.bind(this);
        this.toggleSubAgencyPicker = this.toggleSubAgencyPicker.bind(this);
        this.handleAgencySelect = this.handleAgencySelect.bind(this);
        this.handleSubAgencySelect = this.handleSubAgencySelect.bind(this);
    }

    toggleAgencyPicker(e) {
        e.preventDefault();
        this.setState({
            showAgencyPicker: !this.state.showAgencyPicker
        });
    }

    toggleSubAgencyPicker(e) {
        e.preventDefault();
        // Disable the button if there are no sub-agencies
        if (this.props.subAgencies.length > 0) {
            this.setState({
                showSubAgencyPicker: !this.state.showSubAgencyPicker
            });
        }
    }

    handleAgencySelect(e) {
        e.preventDefault();
        const target = e.target;
        this.props.updateFilter('agency', {
            id: target.value,
            name: target.name
        });

        if (target.value !== 'all') {
            this.props.setSubAgencyList(target.value);
        }

        this.setState({
            showAgencyPicker: false
        });
    }

    handleSubAgencySelect(e) {
        e.preventDefault();
        const target = e.target;
        this.props.updateFilter('subAgency', {
            id: target.value,
            name: target.name
        });

        this.setState({
            showSubAgencyPicker: false
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
                    <Icons.ExclamationTriangle />
                </div>
            );
        }

        // Create the agency options
        const agencies = this.props.agencies.map((agency) => (
            <li
                className="field-item"
                key={`field-${agency.toptier_agency_id}`}>
                <button
                    className="item-button"
                    title={agency.name}
                    aria-label={agency.name}
                    value={agency.toptier_agency_id}
                    name={agency.name}
                    onClick={this.handleAgencySelect}>
                    {agency.name}
                </button>
            </li>
        ));

        // Create the sub-agency options
        const subAgencies = this.props.subAgencies.map((subAgency) => (
            <li
                className="field-item"
                key={`field-${subAgency.subtier_agency_id}`}>
                <button
                    className="item-button"
                    title={subAgency.subtier_agency_name}
                    aria-label={subAgency.subtier_agency_name}
                    value={subAgency.subtier_agency_id}
                    name={subAgency.subtier_agency_name}
                    onClick={this.handleSubAgencySelect}>
                    {subAgency.subtier_agency_name}
                </button>
            </li>
        ));

        const currentAgencyName = this.props.currentAgencies.agency.name;
        const currentSubAgencyName = this.props.currentAgencies.subAgency.name;

        let showAgencyPicker = 'hide';
        let agencyIcon = <Icons.AngleDown alt="Pick an agency" />;
        if (this.state.showAgencyPicker) {
            showAgencyPicker = '';
            agencyIcon = <Icons.AngleUp alt="Pick an agency" />;
        }

        let showSubAgencyPicker = 'hide';
        let subAgencyIcon = <Icons.AngleDown alt="Pick a sub-agency" />;
        if (this.state.showSubAgencyPicker) {
            showSubAgencyPicker = '';
            subAgencyIcon = <Icons.AngleUp alt="Pick a sub-agency" />;
        }

        let subAgencyDisabledClass = '';
        if (this.props.subAgencies.length === 0) {
            subAgencyDisabledClass = 'disabled';
        }

        return (
            <div className="filter-section">
                <h5 className="filter-section-title">
                    {icon} Select an <span>agency</span> and <span>sub-agency</span>.
                </h5>
                <div className="filter-section-content">
                    <div className="agency-picker">
                        <label className="select-label" htmlFor="agency-select">
                            Agency
                        </label>

                        <div className="field-picker agency-select">
                            <button
                                className="selected-button"
                                title={currentAgencyName}
                                aria-label={currentAgencyName}
                                onClick={this.toggleAgencyPicker}>
                                <span className="label">
                                    {currentAgencyName}
                                </span>
                                <span className="arrow-icon">
                                    {agencyIcon}
                                </span>
                            </button>

                            <div
                                className={`field-list ${showAgencyPicker}`}
                                style={{
                                    height: ((this.props.agencies.length + 1) * 54) + 1
                                }}>
                                <ul>
                                    <li
                                        className="field-item"
                                        key={`field-all`}>
                                        <button
                                            className="item-button"
                                            title="All"
                                            aria-label="all"
                                            name="All"
                                            value="all"
                                            onClick={this.handleAgencySelect}>
                                            All
                                        </button>
                                    </li>
                                    {agencies}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="sub-agency-picker">
                        <label className="select-label" htmlFor="sub-agency-select">
                            Sub-Agency
                        </label>
                        <div className="field-picker sub-agency-select">
                            <button
                                className={`selected-button ${subAgencyDisabledClass}`}
                                title={currentSubAgencyName}
                                aria-label={currentSubAgencyName}
                                onClick={this.toggleSubAgencyPicker}>
                                <span className="label">
                                    {currentSubAgencyName}
                                </span>
                                <span className="arrow-icon">
                                    {subAgencyIcon}
                                </span>
                            </button>

                            <div
                                className={`field-list ${showSubAgencyPicker}`}
                                style={{
                                    height: (this.props.subAgencies.length * 54) + 1
                                }}>
                                <ul>
                                    {subAgencies}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AgencyFilter.propTypes = propTypes;

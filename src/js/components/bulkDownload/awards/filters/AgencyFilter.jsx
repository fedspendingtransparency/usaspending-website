/**
 * AgencyFilter.jsx
 * Created by Lizzie Salita 11/2/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    agencies: PropTypes.object,
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

        if (target.value === 'all') {
            this.props.setSubAgencyList('');
        }
        else {
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
            name: target.value
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
                    <Icons.ExclamationCircle />
                </div>
            );
        }

        // Create the CFO agencies options
        const cfoAgencies = this.props.agencies.cfoAgencies.map((agency) => (
            <li
                className="field-item indent"
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

        // Create the other agencies options
        const otherAgencies = this.props.agencies.otherAgencies.map((agency) => (
            <li
                className="field-item indent"
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
        const subAgencies = this.props.subAgencies.map((subAgency, i) => (
            <li
                className="field-item"
                key={`field-${subAgency.subtier_agency_name}-${i}`}>
                <button
                    className="item-button"
                    title={subAgency.subtier_agency_name}
                    aria-label={subAgency.subtier_agency_name}
                    value={subAgency.subtier_agency_name}
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
            <div className="download-filter">
                <div className="download-filter__title">
                    {icon} Select an awarding <span className="download-filter__title_em">agency</span> and <span>sub-agency</span>.
                </div>
                <div className="download-filter__content">
                    <div className="filter-picker">
                        <label className="select-label" htmlFor="agency-select">
                            Agency
                        </label>

                        <div className="field-picker">
                            <button
                                className="selected-button"
                                title={currentAgencyName}
                                aria-label={currentAgencyName}
                                onClick={this.toggleAgencyPicker}>
                                <div className="label">
                                    {currentAgencyName}
                                </div>
                                <div className="arrow-icon">
                                    {agencyIcon}
                                </div>
                            </button>

                            <div className={`field-list ${showAgencyPicker}`}>
                                <ul>
                                    <li className="field-item">
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
                                    <li className="field-item">
                                        <button
                                            className="item-button group-label"
                                            title="CFO Agencies"
                                            aria-label="CFO Agencies"
                                            disabled >
                                            CFO Agencies
                                        </button>
                                    </li>
                                    {cfoAgencies}
                                    <li className="field-item">
                                        <button
                                            className="item-button group-label"
                                            title="Other Agencies"
                                            aria-label="Other Agencies"
                                            disabled >
                                            Other Agencies
                                        </button>
                                    </li>
                                    {otherAgencies}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="filter-picker">
                        <label className="select-label" htmlFor="sub-agency-select">
                            Sub-Agency
                        </label>
                        <div className="field-picker">
                            <button
                                className={`selected-button ${subAgencyDisabledClass}`}
                                title={currentSubAgencyName}
                                aria-label={currentSubAgencyName}
                                onClick={this.toggleSubAgencyPicker}>
                                <div className="label">
                                    {currentSubAgencyName}
                                </div>
                                <div className="arrow-icon">
                                    {subAgencyIcon}
                                </div>
                            </button>

                            <div
                                className={`field-list ${showSubAgencyPicker}`}>
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

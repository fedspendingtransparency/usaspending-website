/**
 * AgencyFilter.jsx
 * Created by Lizzie Salita 12/15/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    agency: PropTypes.object,
    updateFilter: PropTypes.func,
    agencies: PropTypes.object,
    formWidth: PropTypes.number,
    windowWidth: PropTypes.number
};

export default class ArchiveAgencyFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAgencyPicker: false
        };

        this.toggleAgencyPicker = this.toggleAgencyPicker.bind(this);
        this.handleAgencySelect = this.handleAgencySelect.bind(this);
    }

    toggleAgencyPicker(e) {
        e.preventDefault();
        this.setState({
            showAgencyPicker: !this.state.showAgencyPicker
        });
    }

    handleAgencySelect(e) {
        e.preventDefault();
        const target = e.target;
        this.props.updateFilter('agency', {
            id: target.value,
            name: target.name
        });

        this.setState({
            showAgencyPicker: false
        });
    }

    render() {
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


        const currentAgencyName = this.props.agency.name;

        let showAgencyPicker = 'hide';
        let agencyIcon = <Icons.AngleDown alt="Pick an agency" />;
        if (this.state.showAgencyPicker) {
            showAgencyPicker = '';
            agencyIcon = <Icons.AngleUp alt="Pick an agency" />;
        }

        let dropDownWidth = this.props.formWidth - 30;
        if (this.props.windowWidth >= 992) {
            dropDownWidth = (this.props.formWidth * 0.45) - 30;
        }

        return (
            <div className="filter-picker agency-picker">
                <label className="select-label" htmlFor="agency-select">
                    Agency
                </label>

                <div className="field-picker agency-select">
                    <button
                        className="selected-button"
                        title={currentAgencyName}
                        aria-label={currentAgencyName}
                        onClick={this.toggleAgencyPicker}>
                        <div className="label">
                            {currentAgencyName}
                            <span className="arrow-icon">
                                {agencyIcon}
                            </span>
                        </div>
                    </button>

                    <div
                        className={`field-list ${showAgencyPicker}`}
                        style={{ width: dropDownWidth }}>
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
        );
    }
}

ArchiveAgencyFilter.propTypes = propTypes;

/**
 * AgencyFilter.jsx
 * Created by Lizzie Salita 4/23/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    agencies: PropTypes.object,
    federalAccounts: PropTypes.array,
    currentAgency: PropTypes.object,
    currentFederalAccount: PropTypes.object,
    updateFilter: PropTypes.func,
    valid: PropTypes.bool,
    setFederalAccountList: PropTypes.func,
    validBudgetFunctionCode: PropTypes.bool
};

export default class AgencyFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAgencyPicker: false,
            showFederalAccountPicker: false
        };

        this.toggleAgencyPicker = this.toggleAgencyPicker.bind(this);
        this.toggleFederalAccountPicker = this.toggleFederalAccountPicker.bind(this);
        this.handleAgencySelect = this.handleAgencySelect.bind(this);
        this.handleFederalAccountSelect = this.handleFederalAccountSelect.bind(this);
    }

    toggleAgencyPicker(e) {
        e.preventDefault();
        this.setState({
            showAgencyPicker: !this.state.showAgencyPicker,
            showFederalAccountPicker: false
        });
    }

    toggleFederalAccountPicker(e) {
        e.preventDefault();
        this.setState({
            showFederalAccountPicker: !this.state.showFederalAccountPicker,
            showAgencyPicker: false
        });
    }

    handleAgencySelect(e, agencyCode) {
        e.preventDefault();
        const target = e.target;
        this.props.updateFilter('agency', {
            id: target.value,
            name: target.name
        });

        if (!this.props.validBudgetFunctionCode) {
            this.props.updateFilter('budgetFunction', {
                code: 'all',
                title: 'All'
            });
        }

        if (target.value !== 'all') {
            this.props.setFederalAccountList(agencyCode);
            this.props.updateFilter('federalAccount', {
                id: 'all',
                name: 'All'
            });
        }
        else {
            this.props.setFederalAccountList('');
        }

        this.setState({
            showAgencyPicker: false
        });
    }

    handleFederalAccountSelect(e) {
        e.preventDefault();
        const target = e.target;
        this.props.updateFilter('federalAccount', {
            id: target.value,
            name: target.name
        });

        this.setState({
            showFederalAccountPicker: false
        });
    }

    render() {
        let federalAccountDisabled = 'disabled';
        let disabled = true;
        if (this.props.federalAccounts.length > 0) {
            federalAccountDisabled = '';
            disabled = false;
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
                    onClick={(e) => this.handleAgencySelect(e, agency.cgac_code)}>
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
                    onClick={(e) => this.handleAgencySelect(e, agency.cgac_code)}>
                    {agency.name}
                </button>
            </li>
        ));

        const accounts = this.props.federalAccounts.map((account) => (
            <li
                className="field-item indent"
                key={`field-${account.account_id}`}>
                <button
                    className="item-button"
                    title={account.account_name}
                    aria-label={account.account_name}
                    value={account.account_id}
                    onClick={this.handleFederalAccountSelect}
                    name={account.account_name} >
                    {account.account_number} - {account.account_name}
                </button>
            </li>
        ));

        const currentAgencyName = this.props.currentAgency.name;
        let showAgencyPicker = 'hide';
        let agencyIcon = <Icons.AngleDown alt="Pick an agency" />;
        if (this.state.showAgencyPicker) {
            showAgencyPicker = '';
            agencyIcon = <Icons.AngleUp alt="Pick an agency" />;
        }

        const currentFederalAccountName = this.props.currentFederalAccount.name;
        let showFederalAccountPicker = 'hide';
        let federalAccountIcon = <Icons.AngleDown alt="Pick a federal account" />;
        if (this.state.showFederalAccountPicker) {
            showFederalAccountPicker = '';
            federalAccountIcon = <Icons.AngleUp alt="Pick a federal account" />;
        }

        return (
            <div className="download-filter">
                <h4 className="download-filter__title">
                    Agency
                </h4>
                <p className="download-filter__info">This is spending divided by all U.S. government agencies.</p>
                <div className="download-filter__container">
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
                    </div>

                    <div className="download-filter__content">
                        <div className="federal-picker">
                            <label className={`select-label ${federalAccountDisabled}`} htmlFor="federal-select">
                            Federal Account
                            </label>
                            <div className="field-picker">
                                <button
                                    className={`selected-button ${federalAccountDisabled}`}
                                    title={currentFederalAccountName}
                                    aria-label={currentFederalAccountName}
                                    disabled={disabled}
                                    onClick={this.toggleFederalAccountPicker} >
                                    <div className="label">
                                        {currentFederalAccountName}
                                    </div>
                                    <div className="arrow-icon">
                                        {federalAccountIcon}
                                    </div>
                                </button>

                                <div className={`field-list ${showFederalAccountPicker}`}>
                                    <ul>
                                        <li className="field-item indent">
                                            <button
                                                className="item-button"
                                                title="All"
                                                aria-label="all"
                                                name="All"
                                                value="all"
                                                onClick={this.handleFederalAccountSelect}>
                                            All
                                            </button>
                                        </li>
                                        {accounts}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AgencyFilter.propTypes = propTypes;

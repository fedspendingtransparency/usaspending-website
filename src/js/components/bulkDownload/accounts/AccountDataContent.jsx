/**
 * AccountDataContent.jsx
 * Created by Lizzie Salita 4/23/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import { accountDownloadOptions } from 'dataMapping/bulkDownload/bulkDownloadOptions';

import AgencyFilter from './filters/AgencyFilter';
import SubmissionTypeFilter from './filters/SubmissionTypeFilter';
import FiscalYearFilter from './filters/FiscalYearFilter';
import UserSelections from './UserSelections';
import SubmitButton from '../awards/SubmitButton';

const propTypes = {
    accounts: PropTypes.object,
    updateFilter: PropTypes.func,
    clearAccountFilters: PropTypes.func,
    agencies: PropTypes.object,
    clickedDownload: PropTypes.func
};

export default class AccountDataContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validForm: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.accounts !== this.props.accounts) {
            this.validateForm(nextProps.accounts);
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.clickedDownload();
    }

    resetForm() {
        this.props.clearAccountFilters();
    }

    validateForm(accounts) {
        const validForm = (
            (accounts.agency.id !== '')
            && (accounts.submissionType !== '')
            && (accounts.fy !== '')
            && (accounts.quarter !== '')
        );

        this.setState({
            validForm
        });
    }

    render() {
        const accounts = this.props.accounts;
        return (
            <div className="download-center">
                <div className="download-center__filters">
                    <h2 className="download-center__title">Custom Account Data</h2>
                    <form
                        className="download-center-form"
                        onSubmit={this.handleSubmit}>
                        <AgencyFilter
                            agencies={this.props.agencies}
                            currentAgency={accounts.agency}
                            updateFilter={this.props.updateFilter}
                            valid={accounts.agency.id !== ''} />
                        <SubmissionTypeFilter
                            submissionTypes={accountDownloadOptions.submissionTypes}
                            currentSubmissionType={accounts.submissionType}
                            updateFilter={this.props.updateFilter}
                            valid={accounts.submissionType !== ''} />
                        <FiscalYearFilter
                            currentFy={accounts.fy}
                            currentQuarter={accounts.quarter}
                            updateFilter={this.props.updateFilter}
                            valid={accounts.fy && accounts.quarter} />
                        <UserSelections
                            accounts={accounts} />
                        <SubmitButton
                            validForm={this.state.validForm}
                            filters={accounts}
                            validDates
                            dataType="accounts" />
                    </form>
                    <button className="download-center__reset" onClick={this.resetForm}>
                        Reset form and start over
                    </button>
                </div>
                <div className="download-info">
                    <div className="download-info__title">About Account Data</div>
                    <div className="download-info__section">
                        <div className="download-info__section-heading">What is account data?</div>
                        <p>
                            Account data covers all spending data, including non-award spending.
                            The data is available on two different levels, federal account and treasury account. Federal account data is essentially a &ldquo;roll-up&rdquo; of multiple treasury account data.
                            The files available are categorized by type, according to the scope of spending they cover. More information on the different file types can be found here [insert link].
                        </p>
                    </div>
                    <div className="download-info__section">
                        <div className="download-info__section-heading">Why is this data useful?</div>
                        <p>
                            Account data contains the most encompassing amounts of spending throughout U.S. government agencies.  Unlike award data, account data include spending that is not tied to awards, such as operational costs and employee salaries.
                        </p>
                    </div>
                    <div className="download-info__section">
                        <div className="download-info__section-heading">How do I use this form?</div>
                        <p>
                            This form allows you to download account data in a range of quarters within a specific fiscal year.
                            Select an option in each section and click the &ldquo;Download&rdquo; button at the bottom.
                            Heads up: all fields are required. You&rsquo;ll only be able to start the download when all sections are properly filled.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

AccountDataContent.propTypes = propTypes;

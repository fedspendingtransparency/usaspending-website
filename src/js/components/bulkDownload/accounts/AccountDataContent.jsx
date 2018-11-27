/**
 * AccountDataContent.jsx
 * Created by Lizzie Salita 4/23/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import kGlobalConstants from 'GlobalConstants';

import { accountDownloadOptions } from 'dataMapping/bulkDownload/bulkDownloadOptions';
import { Glossary } from 'components/sharedComponents/icons/Icons';

import AccountLevelFilter from './filters/AccountLevelFilter';
import AgencyFilter from './filters/AgencyFilter';
import BudgetFunctionFilter from './filters/BudgetFunctionFilter';
import SubmissionTypeFilter from './filters/SubmissionTypeFilter';
import FiscalYearFilter from './filters/FiscalYearFilter';
import UserSelections from './UserSelections';
import SubmitButton from '../awards/SubmitButton';

import FilterSelection from './filters/FilterSelection';

const propTypes = {
    accounts: PropTypes.object,
    updateFilter: PropTypes.func,
    clearAccountFilters: PropTypes.func,
    agencies: PropTypes.object,
    federalAccounts: PropTypes.array,
    clickedDownload: PropTypes.func,
    setFederalAccountList: PropTypes.func,
    budgetFunctions: PropTypes.array,
    setBudgetSubfunctionList: PropTypes.func,
    budgetSubfunctions: PropTypes.array
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

    componentDidUpdate(prevProps) {
        if (prevProps.accounts !== this.props.accounts) {
            this.validateForm(this.props.accounts);
        }
    }

    componentWillUnmount() {
        this.props.clearAccountFilters();
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
            (accounts.budgetFunction.code !== '')
            && (accounts.agency.id !== '')
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
                    <FilterSelection valid={accounts.budgetFunction.code !== '' || accounts.agency.id !== ''} />
                    <form
                        className="download-center-form"
                        onSubmit={this.handleSubmit}>
                        <BudgetFunctionFilter
                            budgetFunctions={this.props.budgetFunctions}
                            budgetSubfunctions={this.props.budgetSubfunctions}
                            currentBudgetFunction={accounts.budgetFunction}
                            currentBudgetSubfunction={accounts.budgetSubfunction}
                            setBudgetSubfunctionList={this.props.setBudgetSubfunctionList}
                            updateFilter={this.props.updateFilter}
                            validAgencyId={accounts.agency.id !== ''}
                            valid={accounts.budgetFunction.code !== ''} />
                        <AgencyFilter
                            agencies={this.props.agencies}
                            federalAccounts={this.props.federalAccounts}
                            currentAgency={accounts.agency}
                            currentFederalAccount={accounts.federalAccount}
                            setFederalAccountList={this.props.setFederalAccountList}
                            updateFilter={this.props.updateFilter}
                            validBudgetFunctionCode={accounts.budgetFunction.code !== ''}
                            valid={accounts.agency.id !== ''} />
                        <AccountLevelFilter
                            accountLevels={accountDownloadOptions.accountLevels}
                            currentAccountLevel={accounts.accountLevel}
                            updateFilter={this.props.updateFilter}
                            valid={accounts.accountLevel !== ''} />
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
                    <h3 className="download-info__title">About Account Data</h3>
                    <div className="download-info__section">
                        <h4 className="download-info__section-heading">What is account data?</h4>
                        <p>
                            Account data covers all spending data, including non-award spending.
                        </p>
                        <p>
                            The data is available on two different levels, <strong>federal account</strong>&nbsp;
                            <a href="#/download_center/custom_account_data/?glossary=federal-account"><Glossary /></a>
                            and <strong>treasury account</strong>&nbsp;
                            <a href="#/download_center/custom_account_data/?glossary=treasury-account-symbol-tas"><Glossary /></a>
                            . Federal account data is essentially a &ldquo;roll-up&rdquo; of multiple treasury account data.
                        </p>
                        <p>
                            The files available are categorized by type, according to the scope of spending they cover. More information on the different file types can be found in our <a href={`https://files${kGlobalConstants.DEV ? '-nonprod' : ''}.usaspending.gov/docs/Custom+Account+Data+Dictionary.xlsx`}>Custom Account Data Dictionary</a>.
                        </p>
                    </div>
                    <div className="download-info__section">
                        <h4 className="download-info__section-heading">Why is this data useful?</h4>
                        <p>
                            Account data contains the most encompassing amounts of spending throughout U.S. government agencies.  Unlike award data, account data include spending that is not tied to awards, such as operational costs and employee salaries.
                        </p>
                    </div>
                    <div className="download-info__section">
                        <h4 className="download-info__section-heading">How do I use this form?</h4>
                        <p>
                            This form allows you to download account data in a range of quarters within a specific fiscal year.
                        </p>
                        <p>
                            Select an option in each section and click the &ldquo;Download&rdquo; button at the bottom.
                        </p>
                        <p>
                            Heads up: all fields are required. You&rsquo;ll only be able to start the download when all sections are properly filled.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

AccountDataContent.propTypes = propTypes;

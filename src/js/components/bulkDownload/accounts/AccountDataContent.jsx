/**
 * AccountDataContent.jsx
 * Created by Lizzie Salita 4/23/18
 */

import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import kGlobalConstants from 'GlobalConstants';

import { areDefCodesDisabled } from 'helpers/bulkDownloadHelper';
import { accountDownloadOptions } from 'dataMapping/bulkDownload/bulkDownloadOptions';
import { Glossary } from 'components/sharedComponents/icons/Icons';
import DefCodeFilter from 'components/bulkDownload/sharedFilters/DefCodeFilter';
import IsMobileContext from "context/IsMobileContext";

import AccountLevelFilter from './filters/AccountLevelFilter';
import AgencyFilter from './filters/AgencyFilter';
import BudgetFunctionFilter from './filters/BudgetFunctionFilter';
import SubmissionTypeFilter from './filters/SubmissionTypeFilter';
import FiscalYearFilter from './filters/FiscalYearFilter';
import AccountUserSelections from './AccountUserSelections';
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

const AccountDataContent = ({
    accounts,
    updateFilter,
    clearAccountFilters,
    agencies,
    federalAccounts,
    clickedDownload,
    setFederalAccountList,
    budgetFunctions,
    setBudgetSubfunctionList,
    budgetSubfunctions
}) => {
    const { isTablet } = useContext(IsMobileContext);
    const [validForm, setValidForm] = useState(false);

    useEffect(() => {
        setValidForm((
            (accounts.budgetFunction.code !== '')
            && (accounts.agency.id !== '')
            && (accounts.submissionTypes.length !== 0)
            && (accounts.fy !== '')
            && (accounts.quarter !== '' || accounts.period !== '')
        ));
    }, [accounts]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => () => clearAccountFilters, []);

    return (
        <div className="download-center">
            <div className="download-center__filters">
                <h2 className="download-center__title">Custom Account Data</h2>
                <FilterSelection
                    valid={accounts.budgetFunction.code !== '' || accounts.agency.id !== ''} />
                <div className="download-center-form">
                    <BudgetFunctionFilter
                        budgetFunctions={budgetFunctions}
                        budgetSubfunctions={budgetSubfunctions}
                        currentBudgetFunction={accounts.budgetFunction}
                        currentBudgetSubfunction={accounts.budgetSubfunction}
                        setBudgetSubfunctionList={setBudgetSubfunctionList}
                        updateFilter={updateFilter}
                        validAgencyId={accounts.agency.id !== ''}
                        valid={accounts.budgetFunction.code !== ''} />
                    <AgencyFilter
                        agencies={agencies}
                        federalAccounts={federalAccounts}
                        currentAgency={accounts.agency}
                        currentFederalAccount={accounts.federalAccount}
                        setFederalAccountList={setFederalAccountList}
                        updateFilter={updateFilter}
                        validBudgetFunctionCode={accounts.budgetFunction.code !== ''}
                        valid={accounts.agency.id !== ''} />
                    <AccountLevelFilter
                        accountLevels={accountDownloadOptions.accountLevels}
                        currentAccountLevel={accounts.accountLevel}
                        updateFilter={updateFilter}
                        valid={accounts.accountLevel !== ''} />
                    <SubmissionTypeFilter
                        submissionTypes={accountDownloadOptions.submissionTypes}
                        currentSubmissionTypes={accounts.submissionTypes}
                        updateFilter={updateFilter}
                        valid={accounts.submissionTypes.length !== 0} />
                    <DefCodeFilter
                        type="accounts"
                        isDisabled={areDefCodesDisabled(accounts.submissionTypes)} />
                    <FiscalYearFilter
                        currentFy={accounts.fy}
                        latestSelectedTimePeriod={
                            accounts.period ? accounts.period : accounts.quarter
                        }
                        updateFilter={updateFilter}
                        valid={(accounts.fy && (accounts.quarter || accounts.period))} />
                    { isTablet && <AccountUserSelections /> }
                    <SubmitButton
                        handleSubmit={clickedDownload}
                        validForm={validForm}
                        filters={accounts}
                        validDates
                        dataType="accounts" />
                    <div className="download-center__reset-container">
                        <button className="download-center__reset" onClick={clearAccountFilters}>
                    Reset form and start over
                        </button>
                    </div>
                </div>

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
                        <Link to="/download_center/custom_account_data?glossary=federal-account"><Glossary /></Link>
                        and <strong>treasury account</strong>&nbsp;
                        <Link to="/download_center/custom_account_data?glossary=treasury-account-symbol-tas"><Glossary /></Link>
                        . Federal account data is essentially a &ldquo;roll-up&rdquo; of multiple treasury account data.
                    </p>
                    <p>
                        The files available are categorized by type, according to the scope of spending they cover. More information on the different file types can be found in our <a className="usa-bold-link" href={`${kGlobalConstants.FILES_SERVER_BASE_URL}/docs/Custom+Account+Data+Dictionary.xlsx`}>Custom Account Data Dictionary</a>.
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
};

AccountDataContent.propTypes = propTypes;
export default AccountDataContent;

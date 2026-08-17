/**
 * AccountDataContent.jsx
 * Created by Lizzie Salita 4/23/18
 */

import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { areDefCodesDisabled } from 'helpers/bulkDownloadHelper';
import { accountDownloadOptions } from 'dataMapping/bulkDownload/bulkDownloadOptions';
import IsMobileContext from "context/IsMobileContext";

import AccountLevelFilter from './filters/AccountLevelFilter';
import SubmissionTypeFilter from './filters/SubmissionTypeFilter';
import FiscalYearFilter from './filters/FiscalYearFilter';
import AccountUserSelections from './AccountUserSelections';
import DefCodeFilter from './filters/DefCodeFilter';

import BudgetAgencyGroup from './filters/BudgetAgencyGroup';
import { Button, FlexGridRow } from 'data-transparency-ui';

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
    const { isMedium } = useContext(IsMobileContext);
    const [validForm, setValidForm] = useState(false);

    // prevents submission on enter keydown
    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            clearAccountFilters();
        }
    };

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
                <div className="download-center-title-wrapper">
                    <h2 className="download-center__title">Download spending data, including non-award spending.</h2>
                    <p>
                        To download award transaction data for each major agency by fiscal year, visit&nbsp;
                        <Link to="/download_center/award_data_archive">
                            Award Data Archive page
                        </Link>
                        .
                    </p>
                </div>
                <div className="download-center-form">
                    <BudgetAgencyGroup
                        budgetFunctions={budgetFunctions}
                        budgetSubfunctions={budgetSubfunctions}
                        agencies={agencies}
                        federalAccounts={federalAccounts}
                        setBudgetSubfunctionList={setBudgetSubfunctionList}
                        setFederalAccountList={setFederalAccountList}
                        updateFilter={updateFilter}
                        valid={accounts.budgetFunction.code !== '' || accounts.agency.id !== ''}
                        accounts={accounts} />
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
                    <FiscalYearFilter updateFilter={updateFilter} />
                    { isMedium && <AccountUserSelections /> }
                    <FlexGridRow className='download-button-group'>
                        <Button
                            additionalClassnames="download-reset"
                            copy="Reset Form"
                            buttonTitle="Reset Form"
                            buttonSize="md"
                            buttonType="secondary"
                            backgroundColor="light"
                            onClick={clearAccountFilters}
                            onKeyDown={onKeyDown}/>
                        <Button
                            additionalClassnames="download-button"
                            copy="Download"
                            buttonTitle="Download"
                            buttonSize="md"
                            buttonType="primary"
                            backgroundColor="light"
                            onClick={clickedDownload}
                            disabled={!validForm} />
                    </FlexGridRow>
                </div>

            </div>
        </div>
    );
};

AccountDataContent.propTypes = propTypes;
export default AccountDataContent;

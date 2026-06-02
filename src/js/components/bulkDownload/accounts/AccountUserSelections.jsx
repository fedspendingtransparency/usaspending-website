/**
 * AccountUserSelections.jsx
 * Created by Lizzie Salita 4/25/18
 */

import React from 'react';
import { useSelector } from 'react-redux';

import { accountDownloadOptions } from 'dataMapping/bulkDownload/bulkDownloadOptions';

const AccountUserSelections = () => {
    const accounts = useSelector((state) => state.bulkDownload.accounts);

    const generateDefCodesString = () => {
        const { submissionTypes, defCodes } = accounts;
        if (
            defCodes.length &&
            !(submissionTypes.length === 1 &&
                submissionTypes.includes('accountBalances'))
        ) {
            return (
                <div className="selection__content">{accounts.defCodes.toString()}</div>
            );
        }
        return (
            <div className="selection__content">&mdash;</div>
        );
    };

    const generateAccountLevelString = () => {
        if (accounts.accountLevel) {
            const options = accountDownloadOptions.accountLevels;
            const selectedOption = options.find((option) =>
                option.name === accounts.accountLevel
            );
            return (
                <div className="selection__content">{selectedOption.label}</div>
            );
        }
        return (
            <div className="selection__content selection__content-required">
                Account not selected
            </div>
        );
    };

    const generateAgencyString = () => {
        if (accounts.agency.name !== 'Select an Agency') {
            return (
                <div className="selection__content">{accounts.agency.name}</div>
            );
        }

        return (
            <div className="selection__content selection__content-required">
                Budget function or Agency required
            </div>
        );
    };

    const generateBudgetFunctionString = () => {
        if (accounts.budgetFunction.title !== 'Select a Budget Function') {
            return (
                <div className="selection__content">{accounts.budgetFunction.title}</div>
            );
        }

        return (
            <div className="selection__content selection__content-required">
                Budget function or Agency required
            </div>
        );
    };

    const generateFederalAccountString = () => {
        if (accounts.federalAccount.name !== 'Select a Federal Account') {
            return (
                <div className="selection__content">{accounts.federalAccount.name}</div>
            );
        }

        return (
            <div className="selection__content">Federal account not selected</div>
        );
    };

    const generateBudgetSubfunctionString = () => {
        if (accounts.budgetSubfunction.title !== 'Select a Budget Sub-Function') {
            return (
                <div className="selection__content">{accounts.budgetSubfunction.title}</div>
            );
        }

        return (
            <div className="selection__content">Budget sub-function not selected</div>
        );
    };

    const generateSubmissionTypeString = () => {
        if (accounts.submissionTypes.length > 0) {
            return (
                <div className="selection__content">
                    {accountDownloadOptions.submissionTypes
                        .filter((option) => accounts.submissionTypes.includes(option.name))
                        .reduce((acc, option, i, array) => {
                            // don't append comma
                            if (i === 0 && array.length === 1) return `${option.label}`;
                            if (i === array.length - 1) return `${acc}${option.label}`;
                            return `${acc}${option.label}, `;
                        }, '')}
                </div>
            );
        }
        return (
            <div className="selection__content selection__content-required">required</div>
        );
    };

    const generateFyString = () => {
        const { fy, quarter, period } = accounts;
        const timePeriodSelection = quarter ? `Q${quarter}` : `P${period}`;
        if (fy) {
            return (
                <div className="selection__content">{fy} - {timePeriodSelection}</div>
            );
        }

        return (
            <div className="selection__content selection__content-required">required</div>
        );
    };

    return (
        <div className="download-user-selections">
            <h3 className="download-user-selections__title">Your selected options are...</h3>
            <div className="download-user-selections__left-col">
                <div className="selection">
                    <div className="selection__heading">Budget Function</div>
                    <div className="selection__content">
                        {generateBudgetFunctionString()}
                    </div>
                </div>
                <div className="selection">
                    <div className="selection__heading">Budget Sub-Function</div>
                    <div className="selection__content">
                        {generateBudgetSubfunctionString()}
                    </div>
                </div>
                <div className="selection">
                    <div className="selection__heading">Agency</div>
                    {generateAgencyString()}
                </div>
                <div className="selection">
                    <div className="selection__heading">Federal Account</div>
                    <div className="selection__content">
                        {generateFederalAccountString()}
                    </div>
                </div>

                <div className="selection">
                    <div className="selection__heading">Account Level</div>
                    <div className="selection__content">
                        {generateAccountLevelString()}
                    </div>
                </div>
                <div className="selection">
                    <div className="selection__heading">Disaster Emergency Fund Codes</div>
                    <div className="selection__content">
                        {generateDefCodesString()}
                    </div>
                </div>
            </div>
            <div className="download-user-selections__right-col">
                <div className="selection">
                    <div className="selection__heading">File Submission Type</div>
                    {generateSubmissionTypeString()}
                </div>
                <div className="selection">
                    <div className="selection__heading">Fiscal Year</div>
                    {generateFyString()}
                </div>
            </div>
        </div>
    );
};

export default AccountUserSelections;

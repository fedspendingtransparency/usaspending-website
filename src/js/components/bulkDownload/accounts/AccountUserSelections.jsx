/**
 * AccountUserSelections.jsx
 * Created by Lizzie Salita 4/25/18
 */

import React from 'react';
import { useSelector } from 'react-redux';

import { getPeriodTitle } from '../../../helpers/shared/dateHelper';
import { accountDownloadOptions } from '../../../dataMapping/bulkDownload/bulkDownloadOptions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            <div className="selection__content">None selected</div>
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


    const generateBudgetAgencyFunctionString = () => {
        let selectedFilterValues = [];

        if (accounts.budgetFunction.title !== 'Select a Budget Function') {
            selectedFilterValues.push({
                title: "Budget Function",
                value: accounts.budgetFunction.title
            })
        }
        if (accounts.budgetSubfunction.title !== 'Select a Budget Sub-Function') {
            selectedFilterValues.push({
                title: "Budget Sub-function",
                value: accounts.budgetSubfunction.title
            })
        }

        if (accounts.agency.name !== 'Select an Agency') {
            selectedFilterValues.push({
                title: "Agency",
                value: accounts.agency.name
            })
        }
        if (accounts.federalAccount.name !== 'Select a Federal Account') {
            selectedFilterValues.push({
                title: "Federal Account",
                value: accounts.federalAccount.name
            })
        }

        if (selectedFilterValues.length > 0) {
            return (
                <>
                    {selectedFilterValues.map((filter) => (
                        <div className="selection__content" key={filter.title}>
                            {`${filter.title}: ${filter.value}`}
                        </div>
                    ))}
                </>
            );
        }

        return (
            <div className="selection__content selection__content-required">
                Required
            </div>
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
            <div className="selection__content selection__content-required">
                Required
            </div>
        );
    };

    const generateFyString = () => {
        const { fy, quarter, period } = accounts;
        const timePeriodSelection = quarter ? `(Q${quarter})` : `(P${period})`;
        if (fy) {
            return (
                <div className="selection__content">
                    FY {fy} - {getPeriodTitle(period?.toString())} {timePeriodSelection}
                </div>
            );
        }

        return (
            <div className="selection__content selection__content-required">Required</div>
        );
    };

    return (
        <div className="download-user-selections">
            <div className="header-bar" />
            <div className="download-user-selections__title-wrapper">
                <h3 className="download-user-selections__title">
                    <FontAwesomeIcon icon="file-arrow-down" className="title-icon" />
                    Download Summary
                </h3>
                <h5 className="download-user-selections__subtitle">
                    Your selected options are...
                </h5>
            </div>
            <div className="selection">
                <div className="selection__heading">Budget Function</div>
                <div className="selection__content">
                    {generateBudgetAgencyFunctionString()}
                </div>
            </div>
            <div className="selection">
                <div className="selection__heading">Account Level</div>
                <div className="selection__content">
                    {generateAccountLevelString()}
                </div>
            </div>
            <div className="selection">
                <div className="selection__heading">File Type</div>
                <div className="selection__content">
                    {generateSubmissionTypeString()}
                </div>
            </div>
            <div className="selection">
                <div className="selection__heading">Disaster Emergency Fund Codes (DEFCs)</div>
                <div className="selection__content">
                    {generateDefCodesString()}
                </div>
            </div>
            <div className="selection">
                <div className="selection__heading">Fiscal Year and Quarter</div>
                <div className="selection__content">
                    {generateFyString()}
                </div>
            </div>
        </div>
    );
};

export default AccountUserSelections;

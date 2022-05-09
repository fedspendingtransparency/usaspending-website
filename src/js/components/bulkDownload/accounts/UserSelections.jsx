/**
 * UserSelections.jsx
 * Created by Lizzie Salita 4/25/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import { accountDownloadOptions } from 'dataMapping/bulkDownload/bulkDownloadOptions';

const propTypes = {
    accounts: PropTypes.object
};

export default class UserSelections extends React.Component {
    constructor(props) {
        super(props);

        this.generateAccountLevelString = this.generateAccountLevelString.bind(this);
        this.generateAgencyString = this.generateAgencyString.bind(this);
        this.generateBudgetFunctionString = this.generateBudgetFunctionString.bind(this);
        this.generateFederalAccountString = this.generateFederalAccountString.bind(this);
        this.generateSubmissionTypeString = this.generateSubmissionTypeString.bind(this);
        this.generateFyString = this.generateFyString.bind(this);
    }

    generateDefCodesString() {
        const { submissionTypes, defCodes } = this.props.accounts;
        if (defCodes.length && !(submissionTypes.length === 1 && submissionTypes.includes('accountBalances'))) {
            return (
                <div className="selection__content">{this.props.accounts.defCodes.toString()}</div>
            );
        }
        return (
            <div className="selection__content">&mdash;</div>
        );
    }

    generateAccountLevelString() {
        if (this.props.accounts.accountLevel) {
            const options = accountDownloadOptions.accountLevels;
            const selectedOption = options.find((option) =>
                option.name === this.props.accounts.accountLevel
            );
            return (
                <div className="selection__content">{selectedOption.label}</div>
            );
        }
        return (
            <div className="selection__content selection__content-required">Account not selected</div>
        );
    }

    generateAgencyString() {
        if (this.props.accounts.agency.name !== 'Select an Agency') {
            return (
                <div className="selection__content">{this.props.accounts.agency.name}</div>
            );
        }

        return (
            <div className="selection__content selection__content-required">Budget function or Agency required</div>
        );
    }

    generateBudgetFunctionString() {
        if (this.props.accounts.budgetFunction.title !== 'Select a Budget Function') {
            return (
                <div className="selection__content">{this.props.accounts.budgetFunction.title}</div>
            );
        }

        return (
            <div className="selection__content selection__content-required">Budget function or Agency required</div>
        );
    }

    generateFederalAccountString() {
        if (this.props.accounts.federalAccount.name !== 'Select a Federal Account') {
            return (
                <div className="selection__content">{this.props.accounts.federalAccount.name}</div>
            );
        }

        return (
            <div className="selection__content">Federal account not selected</div>
        );
    }

    generateBudgetSubfunctionString() {
        if (this.props.accounts.budgetSubfunction.title !== 'Select a Budget Sub-Function') {
            return (
                <div className="selection__content">{this.props.accounts.budgetSubfunction.title}</div>
            );
        }

        return (
            <div className="selection__content">Budget sub-function not selected</div>
        );
    }

    generateSubmissionTypeString() {
        if (this.props.accounts.submissionTypes.length > 0) {
            return (
                <div className="selection__content">
                    {accountDownloadOptions.submissionTypes
                        .filter((option) => this.props.accounts.submissionTypes.includes(option.name))
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
    }

    generateFyString() {
        const { fy, quarter, period } = this.props.accounts;
        const timePeriodSelection = quarter ? `Q${quarter}` : `P${period}`;
        if (fy) {
            return (
                <div className="selection__content">{fy} - {timePeriodSelection}</div>
            );
        }

        return (
            <div className="selection__content selection__content-required">required</div>
        );
    }

    render() {
        return (
            <div className="download-user-selections">
                <h3 className="download-user-selections__title">Your selected options are...</h3>
                <div className="download-user-selections__left-col">
                    <div className="selection">
                        <div className="selection__heading">Budget Function</div>
                        <div className="selection__content">
                            {this.generateBudgetFunctionString()}
                        </div>
                    </div>
                    <div className="selection">
                        <div className="selection__heading">Budget Sub-Function</div>
                        <div className="selection__content">
                            {this.generateBudgetSubfunctionString()}
                        </div>
                    </div>
                    <div className="selection">
                        <div className="selection__heading">Agency</div>
                        {this.generateAgencyString()}
                    </div>
                    <div className="selection">
                        <div className="selection__heading">Federal Account</div>
                        <div className="selection__content">
                            {this.generateFederalAccountString()}
                        </div>
                    </div>

                    <div className="selection">
                        <div className="selection__heading">Account Level</div>
                        <div className="selection__content">
                            {this.generateAccountLevelString()}
                        </div>
                    </div>
                    <div className="selection">
                        <div className="selection__heading">Disaster Emergency Fund Codes</div>
                        <div className="selection__content">
                            {this.generateDefCodesString()}
                        </div>
                    </div>
                </div>
                <div className="download-user-selections__right-col">
                    <div className="selection">
                        <div className="selection__heading">File Submission Type</div>
                        {this.generateSubmissionTypeString()}
                    </div>
                    <div className="selection">
                        <div className="selection__heading">Fiscal Year</div>
                        {this.generateFyString()}
                    </div>
                </div>
            </div>
        );
    }
}

UserSelections.propTypes = propTypes;

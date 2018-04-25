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
        this.generateSubmissionTypeString = this.generateSubmissionTypeString.bind(this);
        this.generateFyString = this.generateFyString.bind(this);
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
            <div className="selection__content selection__content-required">required</div>
        );
    }

    generateAgencyString() {
        if (this.props.accounts.agency.name !== 'Select an Agency') {
            return (
                <div className="selection__content">{this.props.accounts.agency.name}</div>
            );
        }

        return (
            <div className="selection__content selection__content-required">required</div>
        );
    }

    generateSubmissionTypeString() {
        if (this.props.accounts.submissionType) {
            const options = accountDownloadOptions.submissionTypes;
            const selectedOption = options.find((option) =>
                option.name === this.props.accounts.submissionType
            );
            return (
                <div className="selection__content">{selectedOption.label}</div>
            );
        }
        return (
            <div className="selection__content selection__content-required">required</div>
        );
    }

    generateFyString() {
        if (this.props.accounts.fy && this.props.accounts.quarter) {
            return (
                <div className="selection__content">{this.props.accounts.fy} - Q{this.props.accounts.quarter}</div>
            );
        }

        return (
            <div className="selection__content selection__content-required">required</div>
        );
    }

    render() {
        return (
            <div className="download-user-selections">
                <div className="download-user-selections__title">Your selected options are...</div>
                <div className="download-user-selections__left-col">
                    <div className="selection">
                        <div className="selection__heading">Account Level</div>
                        Treasury Account
                    </div>
                    <div className="selection">
                        <div className="selection__heading">Agency</div>
                        {this.generateAgencyString()}
                    </div>
                    <div className="selection">
                        <div className="selection__heading">File Type</div>
                        {this.generateSubmissionTypeString()}
                    </div>
                    <div className="selection">
                        <div className="selection__heading">File Format</div>
                        CSV
                    </div>
                </div>
                <div className="download-user-selections__right-col">
                    <div className="selection">
                        <div className="selection__heading">&nbsp;</div>
                        &nbsp;
                    </div>
                    <div className="selection">
                        <div className="selection__heading">Federal Account</div>
                        -
                    </div>
                    <div className="selection">
                        <div className="selection__heading">Time Period</div>
                        {this.generateFyString()}
                    </div>
                </div>
            </div>
        );
    }
}

UserSelections.propTypes = propTypes;

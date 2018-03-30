/**
 * UserSelections.jsx
 * Created by Lizzie Salita 11/3/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { awardDownloadOptions } from 'dataMapping/bulkDownload/bulkDownloadOptions';

const propTypes = {
    awards: PropTypes.object
};

export default class UserSelections extends React.Component {
    constructor(props) {
        super(props);

        this.generateAwardLevelString = this.generateAwardLevelString.bind(this);
        this.generateAwardTypeString = this.generateAwardTypeString.bind(this);
        this.generateAgencyString = this.generateAgencyString.bind(this);
        this.generateSubAgencyString = this.generateSubAgencyString.bind(this);
        this.generateLocationString = this.generateLocationString.bind(this);
        this.generateDateTypeString = this.generateDateTypeString.bind(this);
        this.generateFileFormatString = this.generateFileFormatString.bind(this);
        this.generateDateRangeString = this.generateDateRangeString.bind(this);
    }

    generateAwardLevelString() {
        // Build an array of labels for the current selections
        const selectionsArray = [];
        const options = awardDownloadOptions.awardLevels;
        const currentAwardLevels = this.props.awards.awardLevels;
        for (let i = 0; i < options.length; i++) {
            if (currentAwardLevels[options[i].name]) {
                selectionsArray.push(options[i].label);
            }
        }
        // Build the string for display
        let selectionsString = '';
        if (selectionsArray.length !== 0) {
            for (let i = 0; i < selectionsArray.length; i++) {
                if (i === 0) {
                    selectionsString = `${selectionsArray[i]}`;
                }
                else {
                    selectionsString = `${selectionsString}, ${selectionsArray[i]}`;
                }
            }
            return (
                <div className="selection__content">{selectionsString}</div>
            );
        }
        return (
            <div className="selection__content selection__content-required">required</div>
        );
    }

    generateAwardTypeString() {
        // Build an array of labels for the current selections
        const selectionsArray = [];
        const options = awardDownloadOptions.awardTypes;
        const currentAwardTypes = this.props.awards.awardTypes;
        for (let i = 0; i < options.length; i++) {
            if (currentAwardTypes[options[i].name]) {
                selectionsArray.push(options[i].label);
            }
        }
        // Build the string for display
        let selectionsString = '';
        if (selectionsArray.length !== 0) {
            for (let i = 0; i < selectionsArray.length; i++) {
                if (i === 0) {
                    selectionsString = `${selectionsArray[i]}`;
                }
                else {
                    selectionsString = `${selectionsString}, ${selectionsArray[i]}`;
                }
            }
            return (
                <div className="selection__content">{selectionsString}</div>
            );
        }
        return (
            <div className="selection__content selection__content-required">required</div>
        );
    }

    generateDateTypeString() {
        if (this.props.awards.dateType !== '') {
            const options = awardDownloadOptions.dateTypes;
            const selectedOption = options.find((option) =>
                option.name === this.props.awards.dateType
            );
            return (
                <div className="selection__content">{selectedOption.label}</div>
            );
        }
        return (
            <div className="selection__content selection__content-required">required</div>
        );
    }

    generateFileFormatString() {
        if (this.props.awards.fileFormat !== '') {
            const options = awardDownloadOptions.fileFormats;
            const selectedOption = options.find((option) =>
                option.name === this.props.awards.fileFormat
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
        if (this.props.awards.agency.name !== 'Select an Agency') {
            return (
                <div className="selection__content">{this.props.awards.agency.name}</div>
            );
        }

        return (
            <div className="selection__content selection__content-required">required</div>
        );
    }

    generateSubAgencyString() {
        if (this.props.awards.subAgency.name !== 'Select a Sub-Agency') {
            return (
                <div className="selection__content">{this.props.awards.subAgency.name}</div>
            );
        }
        return (
            <div className="selection__content">-</div>
        );
    }

    generateLocationString() {
        if (this.props.awards.location.country.code && this.props.awards.location.country.code !== 'all') {
            if (this.props.awards.location.state.code && this.props.awards.location.state.code !== 'all') {
                return (
                    <div>{`${this.props.awards.location.state.name}, ${this.props.awards.location.country.name}`}</div>
                );
            }
            return (
                <div>{this.props.awards.location.country.name}</div>
            );
        }
        return (
            <div className="selection__content">-</div>
        );
    }

    generateDateRangeString() {
        let startDate = this.props.awards.dateRange.startDate;
        let endDate = this.props.awards.dateRange.endDate;

        if (startDate !== '') {
            const start = moment(this.props.awards.dateRange.startDate);
            startDate = start.format("MM/DD/YYYY");
        }

        if (endDate !== '') {
            const end = moment(this.props.awards.dateRange.endDate);
            endDate = end.format("MM/DD/YYYY");
        }

        if (startDate || endDate) {
            return (
                <div className="selection__content">{`${startDate} - ${endDate}`}</div>
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
                        <div className="selection__heading">Award Levels</div>
                        {this.generateAwardLevelString()}
                    </div>
                    <div className="selection">
                        <div className="selection__heading">Agency</div>
                        {this.generateAgencyString()}
                    </div>
                    <div className="selection">
                        <div className="selection__heading">Recipient Location</div>
                        {this.generateLocationString()}
                    </div>
                    <div className="selection">
                        <div className="selection__heading">Date Type</div>
                        {this.generateDateTypeString()}
                    </div>
                    <div className="selection">
                        <div className="selection__heading">File Format</div>
                        {this.generateFileFormatString()}
                    </div>
                </div>
                <div className="download-user-selections__right-col">
                    <div className="selection">
                        <div className="selection__heading">Award Types</div>
                        {this.generateAwardTypeString()}
                    </div>
                    <div className="selection">
                        <div className="selection__heading">Sub Agency</div>
                        {this.generateSubAgencyString()}
                    </div>
                    <div className="selection">
                        <div className="selection__heading">Date Range</div>
                        {this.generateDateRangeString()}
                    </div>
                </div>
            </div>
        );
    }
}

UserSelections.propTypes = propTypes;

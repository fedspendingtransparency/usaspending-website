/**
 * UserSelections.jsx
 * Created by Lizzie Salita 11/3/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { awardDownloadOptions } from 'dataMapping/bulkDownload/bulkDownloadOptions';
import { indexOf } from 'lodash';

const propTypes = {
    awards: PropTypes.object,
    agencies: PropTypes.array,
    subAgencies: PropTypes.array
};

export default class UserSelections extends React.Component {
    constructor(props) {
        super(props);

        this.generateAwardLevelString = this.generateAwardLevelString.bind(this);
        this.generateAwardTypeString = this.generateAwardTypeString.bind(this);
        this.generateAgencyString = this.generateAgencyString.bind(this);
        this.generateSubAgencyString = this.generateSubAgencyString.bind(this);
        this.generateDateTypeString = this.generateDateTypeString.bind(this);
        this.generateFileFormatString = this.generateFileFormatString.bind(this);
        this.generateDateRangeString = this.generateDateRangeString.bind(this);
    }

    generateAwardLevelString() {
        // Build an array of labels for the current selections
        const selectionsArray = [];
        const options = awardDownloadOptions.awardLevels;
        const currentAwardLevels = this.props.awards.award_levels;
        for (let i = 0; i < options.length; i++) {
            if (indexOf(currentAwardLevels, options[i].name) !== -1) {
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
                <div>{selectionsString}</div>
            );
        }
        return (
            <div className="required">required</div>
        );
    }

    generateAwardTypeString() {
        // Build an array of labels for the current selections
        const selectionsArray = [];
        const options = awardDownloadOptions.awardTypes;
        const currentAwardTypes = this.props.awards.filters.award_types;
        for (let i = 0; i < options.length; i++) {
            if (indexOf(currentAwardTypes, options[i].name) !== -1) {
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
                <div>{selectionsString}</div>
            );
        }
        return (
            <div className="required">required</div>
        );
    }

    generateDateTypeString() {
        if (this.props.awards.filters.date_type !== '') {
            const options = awardDownloadOptions.dateTypes;
            const selectedOption = options.find((option) =>
                option.name === this.props.awards.filters.date_type
            );
            return (
                <div>{selectedOption.label}</div>
            );
        }
        return (
            <div className="required">required</div>
        );
    }

    generateFileFormatString() {
        if (this.props.awards.file_format !== '') {
            const options = awardDownloadOptions.fileFormats;
            const selectedOption = options.find((option) =>
                option.name === this.props.awards.file_format
            );
            return (
                <div>{selectedOption.label}</div>
            );
        }
        return (
            <div className="required">required</div>
        );
    }

    generateAgencyString() {
        if (this.props.awards.filters.agency === 'all') {
            return (
                <div>all</div>
            );
        }

        const id = parseFloat(this.props.awards.filters.agency);
        if (!isNaN(id)) {
            const agencies = this.props.agencies;
            const selectedAgency = agencies.find((agency) =>
                agency.toptier_agency_id === id
            );
            return (
                <div>{selectedAgency.name}</div>
            );
        }

        return (
            <div className="required">required</div>
        );
    }

    generateSubAgencyString() {
        const id = parseFloat(this.props.awards.filters.sub_agency);
        if (!isNaN(id)) {
            const subAgencies = this.props.subAgencies;
            const selectedSubAgency = subAgencies.find((subAgency) =>
                subAgency.subtier_agency_id === id
            );
            return (
                <div>{selectedSubAgency.subtier_agency_name}</div>
            );
        }
        return (
            <div>-</div>
        );
    }

    generateDateRangeString() {
        let startDate = this.props.awards.filters.date_range.start_date;
        let endDate = this.props.awards.filters.date_range.end_date;

        if (startDate !== '') {
            const start = moment(this.props.awards.filters.date_range.start_date);
            startDate = start.format("MM/DD/YYYY");
        }

        if (endDate !== '') {
            const end = moment(this.props.awards.filters.date_range.end_date);
            endDate = end.format("MM/DD/YYYY");
        }

        if (startDate || endDate) {
            return (
                <div>{`${startDate} - ${endDate}`}</div>
            );
        }
        return (
            <div className="required">required</div>
        );
    }

    render() {
        return (
            <div className="your-selections">
                <h5>Your selected options are...</h5>
                <div className="left-col">
                    <div className="option">
                        <h6>Award Levels</h6>
                        {this.generateAwardLevelString()}
                    </div>
                    <div className="option">
                        <h6>Agency</h6>
                        {this.generateAgencyString()}
                    </div>
                    <div className="option">
                        <h6>Date Type</h6>
                        {this.generateDateTypeString()}
                    </div>
                    <div className="option">
                        <h6>File Format</h6>
                        {this.generateFileFormatString()}
                    </div>
                </div>
                <div className="right-col">
                    <div className="option">
                        <h6>Award Types</h6>
                        {this.generateAwardTypeString()}
                    </div>
                    <div className="option">
                        <h6>Sub Agency</h6>
                        {this.generateSubAgencyString()}
                    </div>
                    <div className="option">
                        <h6>Date Range</h6>
                        {this.generateDateRangeString()}
                    </div>
                </div>
            </div>
        );
    }
}

UserSelections.propTypes = propTypes;

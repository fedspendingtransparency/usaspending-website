/**
 * UserSelections.jsx
 * Created by Lizzie Salita 11/3/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { awardDownloadOptions } from 'dataMapping/bulkDownload/bulkDownloadOptions';

const propTypes = {
    formState: PropTypes.object,
    agencies: PropTypes.array,
    subAgencies: PropTypes.array
};

export default class UserSelections extends React.Component {
    constructor(props) {
        super(props);

        this.generateCheckboxesString = this.generateCheckboxesString.bind(this);
        this.generateAgencyString = this.generateAgencyString.bind(this);
        this.generateSubAgencyString = this.generateSubAgencyString.bind(this);
        this.generateRadioButtonsString = this.generateRadioButtonsString.bind(this);
        this.generateDateRangeString = this.generateDateRangeString.bind(this);
    }

    generateCheckboxesString(filterType) {
        let selectionsString = '';
        const selectionsArray = [];
        const options = awardDownloadOptions[filterType];
        for (let i = 0; i < options.length; i++) {
            if (this.props.formState[options[i].name]) {
                selectionsArray.push(options[i].label);
            }
        }
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

    generateRadioButtonsString(filterType) {
        if (this.props.formState[filterType] !== '') {
            const options = awardDownloadOptions[`${filterType}s`];
            const selectedOption = options.find((option) =>
                option.name === this.props.formState[filterType]
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
        const id = parseFloat(this.props.formState.agency);
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
        const id = parseFloat(this.props.formState.subAgency);
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
        const startDate = this.props.formState.startDate;
        const endDate = this.props.formState.endDate;

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
                        {this.generateCheckboxesString('awardLevels')}
                    </div>
                    <div className="option">
                        <h6>Agency</h6>
                        {this.generateAgencyString()}
                    </div>
                    <div className="option">
                        <h6>Date Type</h6>
                        {this.generateRadioButtonsString('dateType')}
                    </div>
                    <div className="option">
                        <h6>File Format</h6>
                        {this.generateRadioButtonsString('fileFormat')}
                    </div>
                </div>
                <div className="right-col">
                    <div className="option">
                        <h6>Award Types</h6>
                        {this.generateCheckboxesString('awardTypes')}
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

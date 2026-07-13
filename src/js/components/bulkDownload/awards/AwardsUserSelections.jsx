/**
 * AwardsUserSelections.jsx
 * Created by Lizzie Salita 11/3/17
 */

import React from 'react';

import { awardDownloadOptions } from '../../../dataMapping/bulkDownload/bulkDownloadOptions';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const dayjs = require('dayjs');

const AwardsUserSelections = () => {
    const awards = useSelector((state) => state.bulkDownload.awards);
    const generateAwardTypeString = () => {
    // Build an array of labels for the current selections
        const options = Object.assign(
            {},
            ...Object.entries(awardDownloadOptions.awardTypeLookups)
                .map(([key, value]) => ({ [key]: value.label }))
        );
        const currentAwardTypes = Object.values(awards.awardTypes)
            .reduce((acc, curr) => (
                acc.concat(curr.toArray())
            ), []);
        const selectionsArray = currentAwardTypes.map((awardType) => (
            options[awardType]
        ));

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
            <div className="selection__content selection__content-required">Required</div>
        );
    };

    const generateDateTypeString = () => {
        if (awards.dateType !== '') {
            const options = awardDownloadOptions.dateTypes;
            const selectedOption = options.find((option) =>
                option.name === awards.dateType
            );
            return (
                <div className="selection__content">{selectedOption.label}</div>
            );
        }
        return (
            <div className="selection__content selection__content-required">Required</div>
        );
    };

    const generateFileFormatString = () => {
        if (awards.fileFormat !== '') {
            const options = awardDownloadOptions.fileFormats;
            const selectedOption = options.find((option) =>
                option.name === awards.fileFormat
            );
            return (
                <div className="selection__content">{selectedOption.label}</div>
            );
        }
        return (
            <div className="selection__content selection__content-required">required</div>
        );
    };


    const generateAgencyString = () => {
        if (awards.agency.name !== 'Select an Agency') {
            const options = awardDownloadOptions.agencyTypes;
            const selectedOption = options.find((option) =>
                option.name === awards.agencyType
            );

            return (
                <div className="selection__content">{selectedOption.label}: {awards.agency.name}</div>
            );
        }

        return (
            <div className="selection__content selection__content-required">Required</div>
        );
    };

    const generateSubAgencyString = () => {
        if (awards.subAgency.name !== 'Select a Sub-Agency') {
            return (
                <div className="selection__content">Sub-agency: {awards.subAgency.name}</div>
            );
        }
        return null;
    };


    const generateLocationString = () => {
        const options = awardDownloadOptions.locationTypes;
        const selectedOption = options.find((option) =>
            option.name === awards.locationType
        );
        const locationType = selectedOption.label;

        if (awards.location?.country?.code && awards.location?.country?.code !== 'all') {
            if (awards.location.state.code && awards.location.state.code !== 'all') {
                return (
                    <div className="selection__content">
                        {`${locationType}: ${awards.location.state.name}, ${awards.location.country.name}`}
                    </div>
                );
            }
            return (
                <div className="selection__content">{locationType}: {awards.location.country.name}</div>
            );
        }
        
        // default or if all is selected
        return (
            <div className="selection__content">{locationType}: All countries</div>
        );
    };

    const generateDateRangeString = () => {
        let startDate = awards.dateRange.startDate;
        let endDate = awards.dateRange.endDate;

        if (startDate !== '') {
            const start = dayjs(awards.dateRange.startDate);
            startDate = start.format("MM/DD/YYYY");
        }

        if (endDate !== '') {
            const end = dayjs(awards.dateRange.endDate);
            endDate = end.format("MM/DD/YYYY");
        }

        if (startDate || endDate) {
            return (
                <div className="selection__content">{`${startDate} - ${endDate}`}</div>
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
                <div className="selection__heading">Award Types</div>
                {generateAwardTypeString()}
            </div>
            <div className="selection">
                <div className="selection__heading">Agency</div>
                {generateAgencyString()}
                {generateSubAgencyString()}
            </div>
            <div className="selection">
                <div className="selection__heading">Location</div>
                {generateLocationString()}
            </div>
            <div className="selection">
                <div className="selection__heading">Date Type</div>
                {generateDateTypeString()}
            </div>
            <div className="selection">
                <div className="selection__heading">Date Range</div>
                {generateDateRangeString()}
            </div>
            <div className="selection">
                <div className="selection__heading">File Format</div>
                {generateFileFormatString()}
            </div>
        </div>
    );
};

export default AwardsUserSelections;

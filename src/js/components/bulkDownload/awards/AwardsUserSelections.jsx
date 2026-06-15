/**
 * AwardsUserSelections.jsx
 * Created by Lizzie Salita 11/3/17
 */

import React from 'react';

import { awardDownloadOptions } from 'dataMapping/bulkDownload/bulkDownloadOptions';
import { useSelector } from 'react-redux';

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
            <div className="selection__content selection__content-required">required</div>
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
            <div className="selection__content selection__content-required">required</div>
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

    const generateAgencyTypeString = () => {
        const options = awardDownloadOptions.agencyTypes;
        const selectedOption = options.find((option) =>
            option.name === awards.agencyType
        );
        return (
            <div className="selection__content">{selectedOption.label}</div>
        );
    };

    const generateAgencyString = () => {
        if (awards.agency.name !== 'Select an Agency') {
            return (
                <div className="selection__content">{awards.agency.name}</div>
            );
        }

        return (
            <div className="selection__content selection__content-required">required</div>
        );
    };

    const generateSubAgencyString = () => {
        if (awards.subAgency.name !== 'Select a Sub-Agency') {
            return (
                <div className="selection__content">{awards.subAgency.name}</div>
            );
        }
        return (
            <div className="selection__content">&mdash;</div>
        );
    };

    const generateLocationTypeString = () => {
        const options = awardDownloadOptions.locationTypes;
        const selectedOption = options.find((option) =>
            option.name === awards.locationType
        );
        return (
            <div className="selection__content">{selectedOption.label}</div>
        );
    };

    const generateLocationString = () => {
        if (awards.location?.country?.code && awards.location?.country?.code !== 'all') {
            if (awards.location.state.code && awards.location.state.code !== 'all') {
                return (
                    <div className="selection__content">
                        {`${awards.location.state.name}, ${awards.location.country.name}`}
                    </div>
                );
            }
            return (
                <div className="selection__content">{awards.location.country.name}</div>
            );
        }
        else if (awards.location?.country?.code === 'all') {
            return (
                <div className="selection__content">All</div>
            );
        }
        return (
            <div className="selection__content">&mdash;</div>
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
            <div className="selection__content selection__content-required">required</div>
        );
    };

    return (
        <div className="download-user-selections">
            <h3 className="download-user-selections__title">Your selected options are...</h3>
            <div className="download-user-selections__left-col">
                <div className="selection">
                    <div className="selection__heading">Award Types</div>
                    {generateAwardTypeString()}
                </div>
            </div>
            <div className="download-user-selections__left-col">
                <div className="selection">
                    <div className="selection__heading">Agency</div>
                    {generateAgencyTypeString()}
                    {generateAgencyString()}
                </div>
                <div className="selection">
                    <div className="selection__heading">Location</div>
                    {generateLocationTypeString()}
                    {generateLocationString()}
                </div>
                <div className="selection">
                    <div className="selection__heading">Date Type</div>
                    {generateDateTypeString()}
                </div>
                <div className="selection">
                    <div className="selection__heading">File Format</div>
                    {generateFileFormatString()}
                </div>
            </div>
            <div className="download-user-selections__right-col">
                <div className="selection">
                    <div className="selection__heading">Sub Agency</div>
                    {generateSubAgencyString()}
                </div>
                <div className="selection">
                    <div className="selection__heading">Date Range</div>
                    {generateDateRangeString()}
                </div>
            </div>
        </div>
    );
};

export default AwardsUserSelections;

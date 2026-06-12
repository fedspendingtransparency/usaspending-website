import React from "react";
import { awardDownloadOptions } from "dataMapping/bulkDownload/bulkDownloadOptions";

/* eslint-disable react/prop-types */
const AwardDataArchiveUserSelections = ({
    awardTypes = new Set(['primeAwards', ['contracts']]),
    agency = 'All Agencies',
    fy = '2026',
    archiveFiles
}) => {

    const generateFyString = () => {
        if (fy) {
            return (
                <div className="selection__content">FY {fy}</div>
            );
        }

        return (
            <div className="selection__content selection__content-required">required</div>
        );
    };

    const generateAgencyString = () => {
        if (agency.name !== 'Select an Agency') {
            return (
                <div className="selection__content">{agency.name}</div>
            );
        }

        return (
            <div className="selection__content selection__content-required">required</div>
        );
    };

    const generateAwardTypeString = () => {
        // Build an array of labels for the current selections
        const options = Object.assign(
            {},
            ...Object.entries(awardDownloadOptions.awardTypeLookups)
                .map(([key, value]) => ({ [key]: value.label }))
        );
        const currentAwardTypes = Object.values(awardTypes)
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

    const generateArchiveFiles = () => {
        if (archiveFiles) {
            return <div className="selection__content">{archiveFiles}</div>;
        }

        return (
            <div className="selection__content selection__content-required">required</div>
        );
    }

    return (
        <div className="download-user-selections">
            <h3 className="download-user-selections__title">Your selected options are...</h3>
            <div className="download-user-selections__left-col">
                <div className="selection">
                    <div className="selection__heading">Agency</div>
                    {generateAgencyString()}
                </div>
                <div className="selection">
                    <div className="selection__heading">Fiscal Year</div>
                    {generateFyString()}
                </div>
                <div className="selection">
                    <div className="selection__heading">Award Types</div>
                    {generateAwardTypeString()}
                </div>
                <div className="selection">
                    <div className="selection__heading">Archive File(s):</div>
                    {generateArchiveFiles()}
                </div>
            </div>
        </div>
    );
}

export default AwardDataArchiveUserSelections;

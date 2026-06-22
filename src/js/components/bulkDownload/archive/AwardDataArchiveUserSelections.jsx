import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* eslint-disable react/prop-types */
const AwardDataArchiveUserSelections = ({
    results,
    filters
}) => {
    const { agency, type, fy } = filters;

    const generateFyString = () => {
        if (fy) return (<div className="selection__content">FY {fy}</div>);
        return <div className="selection__content selection__content-required">required</div>;
    };

    const generateAgencyString = () => {
        if (agency.name !== 'Select an Agency') {
            return (<div className="selection__content">{agency.name}</div>);
        }

        return (<div className="selection__content selection__content-required">required</div>);
    };

    const generateAwardTypeString = () => {
        if (type.name !== 'Select an Award Type') {
            return (<div className="selection__content">{type.display}</div>);
        }

        return (<div className="selection__content selection__content-required">required</div>);
    };

    const generateArchiveFiles = () => {
        if (results.length > 0) {
            return (
                <div className="selection__content">
                    <ul>{results.map(({ fileName }) => <li key={fileName}>{fileName}</li>)}</ul>
                </div>);
        }

        return (
            <div className="selection__content selection__content-required">required</div>
        );
    }

    return (
        <div className="download-user-selections">
            <div className="header-bar" />
            <div className="download-user-selections__title-wrapper">
                <h3 className="download-user-selections__title">
                    <FontAwesomeIcon icon="file-arrow-down" className="title-icon" />
                    Download Summary
                </h3>
                <h5 className="download-user-selections__subtitle">Your selected options are...</h5>
            </div>
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

/**
 * NewDownloadSummary.jsx
 * Created by JD House 3/20/26
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'data-transparency-ui';

const propTypes = {
    goToStep: PropTypes.func,
    setDownloadType: PropTypes.func,
    hideModal: PropTypes.func,
    downloadData: PropTypes.object
};

const NewDownloadSummary = (props) => (
    <div className="download-level-screen">
        <div className="main-title">
            <h3>Below is a summary of the file(s) based on your selections:</h3>
        </div>
        <div className="download-summary-container">
            <p className="dowload-summary__heading">
                Download Summary
            </p>
            <table className="dowload-summary__details-table">
                <tbody>
                    <tr>
                        <th className="download-summary__th">File Name:</th>
                        <td className="download-summary__td">{props.downloadData.expectedFile}</td>
                    </tr>
                    <tr>
                        <th>Data Selections:</th>
                        <td>{props.downloadData.selections}</td>
                    </tr>
                    {props.downloadData.filters && props.downloadData.filters.map((filterGroup) => (
                        <tr>
                            <th>{filterGroup.type}:</th>
                            <td>{filterGroup.values}</td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>
        </div>

        <div className="download-button-container">
            <Button
                className="button-option"
                backgroundColor="light"
                buttonSize="sm"
                buttonTitle="Cancel"
                onClick={props.hideModal}
                onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        props.hideModal();
                    }
                }}
                buttonType="text"
                copy="Cancel" />
            <Button
                backgroundColor="light"
                buttonSize="sm"
                buttonTitle="Begin Download"
                buttonType="primary"
                copy="Begin Download"
                onClick={() => props.goToStep(3, true)}
                onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        props.goToStep(3, true);
                    }
                }} />
        </div>
    </div>
);

NewDownloadSummary.propTypes = propTypes;
export default NewDownloadSummary;

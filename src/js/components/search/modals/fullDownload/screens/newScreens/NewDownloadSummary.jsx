/**
 * NewDownloadSummary.jsx
 * Created by JD House 3/20/26
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'data-transparency-ui';
import { upperFirst } from 'lodash-es';
import DownloadFilterRow from './DownloadFilterRow';

const propTypes = {
    beginDownload: PropTypes.func,
    hideModal: PropTypes.func,
    downloadData: PropTypes.object
};

const NewDownloadSummary = ({
    beginDownload = () => {},
    hideModal,
    downloadData
}) => {
    const startDownload = () => {
        console.log("downloading ....... ");
        if (beginDownload) {
            beginDownload();
        }
    };

    return (
        <div className="download-level-screen">
            <div className="main-title">
                <h3>Below is a summary of the file(s) based on your selections:</h3>
            </div>
            <div className="download-summary-container">
                <p className="download-summary__heading">
                Download Summary
                </p>
                <table
                    className="download-summary__details-table">
                    <tbody>
                        <tr>
                            <th className="download-summary__th">File Name:</th>
                            <td className="download-summary__td">{downloadData.expectedFile}</td>
                        </tr>
                        <tr>
                            <th>Data Selections:</th>
                            <td>{downloadData.selections.map(upperFirst).join(", ")}</td>
                        </tr>
                        {downloadData.filters && downloadData.filters.map((filterGroup) => (
                            <DownloadFilterRow filter={filterGroup} />
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="download-button-container">
                <Button
                    className="button-option"
                    backgroundColor="light"
                    buttonSize="sm"
                    buttonTitle="Cancel"
                    onClick={hideModal}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            hideModal();
                        }
                    }}
                    buttonType="text"
                    copy="Cancel" />
                <Button
                    backgroundColor="light"
                    buttonSize="sm"
                    buttonTitle="Begin download"
                    buttonType="primary"
                    copy="Begin Download"
                    onClick={() => startDownload(false)}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            startDownload(false);
                        }
                    }} />
            </div>
        </div>
    );
};
NewDownloadSummary.propTypes = propTypes;
export default NewDownloadSummary;

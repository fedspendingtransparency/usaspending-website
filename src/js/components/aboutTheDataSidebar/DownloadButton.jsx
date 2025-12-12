/**
 * DownloadButton.jsx
 * Created by Andrea Blackwell 11/14/22
 */

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Analytics from '../../helpers/analytics/Analytics';


const DownloadButton = () => {
    const logDownloadButtonClick = () => {
        Analytics.event({
            event: "dap_event",
            category: "USAspending - About the Data Side Panel",
            action: "Download",
            label: "pdf"
        });
    };

    return (
        <div className="atd__download-wrapper">
            <a
                href="/data/about-the-data-download.pdf"
                target="_blank"
                aria-label="Download"
                rel="noopener noreferrer"
                className="atd__download-button"
                download
                onClick={logDownloadButtonClick()}>
                <FontAwesomeIcon data-href="/data/about-the-data-download.pdf" icon="file-download" className="atd__download-icon" />
            Download
            </a>
        </div>);
};

export default DownloadButton;

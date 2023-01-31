/**
 * DownloadButton.jsx
 * Created by Andrea Blackwell 11/14/22
 */

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";

const DownloadButton = () => (
    <div className="atd__download-wrapper">
        <a
            href="/data/about-the-data-download.pdf"
            target="_blank"
            aria-label="Download"
            rel="noopener noreferrer"
            className="atd__download-button"
            download>
            <FontAwesomeIcon data-href="/data/about-the-data-download.pdf" icon={faFileDownload} className="atd__download-icon" />
            Download
        </a>
    </div>);

export default DownloadButton;

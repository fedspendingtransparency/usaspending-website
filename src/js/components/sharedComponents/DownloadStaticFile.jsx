/**
 * DownloadStaticFile.jsx
 * Created by Brian Petway 01/12/23
 */

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const propTypes = {
    path: PropTypes.string
};

const DownloadStaticFile = ({ path }) => (
    <div className="download_static-file__container">
        <a
            href={path}
            target="_blank"
            aria-label="Download"
            title="Download"
            rel="noopener noreferrer"
            download>
            <div className="download_static-file__button-content">
                <FontAwesomeIcon data-href={path} icon={faFileDownload} />
                <span>Download</span>
            </div>
        </a>
    </div>);

DownloadStaticFile.propTypes = propTypes;
export default DownloadStaticFile;

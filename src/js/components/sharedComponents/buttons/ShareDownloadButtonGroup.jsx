/**
 * ShareDownloadButtonGroup.jsx
 * Created by JD House 6/22/2026
 **/

import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ShareIcon } from 'data-transparency-ui';

const propTypes = {
    url: PropTypes.string.isRequired,
    onShareClick: PropTypes.func.isRequired,
    classNames: PropTypes.string,
    dropdownDirection: PropTypes.string,
    hideDownload: PropTypes.bool,
    downloadLink: PropTypes.string
};

const ShareDownloadButtonGroup = ({
    url = '',
    onShareClick = () => {},
    classNames = '',
    dropdownDirection = 'left',
    hideDownload = false,
    downloadLink = ''
}) => {

    return (
        <div className="share-dl-group">
            {!hideDownload && <div className="share-dl-group__download-wrapper">
                <a
                    href={downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-dl-group__download-button"
                    aria-label="download"
                    download>
                    <FontAwesomeIcon
                        data-href={downloadLink}
                        icon="file-download"
                        className="share-dl-group__download-icon" />
                </a>
                <div>
                    <span>Download</span>
                </div>
            </div>}
            <div className="share-dl-group__share-wrapper">
                <ShareIcon
                    url={url}
                    onShareOptionClick={onShareClick}
                    colors={{
                        backgroundColor: "white",
                        color: "#0071bc",
                        confirmationBackgroundColor: "white"
                    }}
                    dropdownDirection={dropdownDirection}
                    pickerButtonClassNames="side-margin"
                    pickerListClassNames="padding top-margin min-width" />
            </div>
        </div>
    );
};

ShareDownloadButtonGroup.propTypes = propTypes;
export default ShareDownloadButtonGroup;

/**
 * ShareDownloadButtonGroup.jsx
 * Created by JD House 6/22/2026
 **/

import React, { useContext } from 'react';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ShareIcon } from 'data-transparency-ui';
import IsMobileContext from "context/IsMobileContext";
import DownloadIconButton508 from 'components/sharedComponents/buttons/DownloadButton508';

const propTypes = {
    url: PropTypes.string.isRequired,
    onShareClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    hideDownload: PropTypes.bool,
    downloadLink: PropTypes.string,
    showDownloadBtn: PropTypes.bool,
    onDownloadClick: PropTypes.func,
    downloadInFlight: PropTypes.bool,
    downloadIcon: PropTypes.string
};

const ShareDownloadButtonGroup = ({
    url = '',
    onShareClick = () => {},
    className = '',
    hideDownload = false,
    downloadLink = '',
    showDownloadBtn = false,
    onDownloadClick = () => {},
    downloadInFlight,
    downloadIcon
}) => {
    const { isMedium } = useContext(IsMobileContext);
    const dropdownDirection = isMedium ? 'right' : 'left';

    const getDownloadOption = () => {
        if (showDownloadBtn) {
            return (
                <div className="share-dl-group__download-wrapper">
                    <DownloadIconButton508
                        downloadInFlight={downloadInFlight}
                        onClick={onDownloadClick}
                        downloadIcon={downloadIcon}
                        className={className} />
                
                </div>
            );
        }

        return (
            <div className="share-dl-group__download-wrapper">
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
            </div>
        );
    };
    
    return (
        <div className="share-dl-group" data-testid="share-dl-group">
            {!hideDownload && getDownloadOption() }
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

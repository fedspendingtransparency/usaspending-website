/**
 * DownloadIconButton508.jsx
 * Created by JD House 3/4/2026
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
    onClick: PropTypes.func.isRequired,
    downloadInFlight: PropTypes.bool,
    isEnabled: PropTypes.bool,
    key: PropTypes.string,
    downloadIcon: PropTypes.string
};

const DownloadIconButton508 = ({
    onClick,
    downloadInFlight,
    isEnabled = true,
    key,
    downloadIcon="download"
}) => {
    const startDownload = (e) => {
        e.preventDefault();
        if (!downloadInFlight && isEnabled) {
            onClick();
        }
    };

    let wrapperclass = "usa-download-icon ";
    if (downloadInFlight || !isEnabled) {
        wrapperclass += " disabled";
    }
    const buttonText = downloadInFlight ? 'Preparing Download...' : 'Download';
    const icon = downloadInFlight ? "spinner" : downloadIcon;

    const downloadButton = () => (
        <button
            key={key}
            type="button"
            className="usa-button"
            title={buttonText}
            aria-label={!isEnabled ? buttonText : ''}
            disabled={downloadInFlight}
            onClick={startDownload}
            tabIndex={!isEnabled ? -1 : 0}
            aria-hidden={!isEnabled}>
            <FontAwesomeIcon icon={["fa", icon]} spin={downloadInFlight} />
            <span>{buttonText}</span>
        </button>
    );

    return (
        <div className={wrapperclass} >
            {downloadButton()}
        </div>
    );
};

DownloadIconButton508.propTypes = propTypes;
export default DownloadIconButton508;
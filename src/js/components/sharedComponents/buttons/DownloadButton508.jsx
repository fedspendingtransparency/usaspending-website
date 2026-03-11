/**
 * DownloadIconButton508.jsx
 * Created by JD House 3/4/2026
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faDownload } from '@fortawesome/free-solid-svg-icons';
import { TooltipWrapper } from 'data-transparency-ui';


// require('../styles/components/_downloadIconButton.scss');

const propTypes = {
    onClick: PropTypes.func.isRequired,
    downloadInFlight: PropTypes.bool,
    tooltipComponent: PropTypes.element,
    isEnabled: PropTypes.bool,
    key: PropTypes.string
};

const DownloadIconButton508 = ({
    onClick,
    downloadInFlight,
    tooltipComponent = null,
    isEnabled = true,
    key
}) => {
    const startDownload = (e) => {
        e.preventDefault();
        if (!downloadInFlight && isEnabled) {
            onClick();
        }
    };

    let wrapperclass = 'usa-download-icon';
    if (downloadInFlight || !isEnabled) {
        wrapperclass += " disabled";
    }
    const buttonText = downloadInFlight ? 'Preparing Download...' : 'Download';
    const icon = downloadInFlight ? faSpinner : faDownload;

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
            <FontAwesomeIcon icon={icon} spin={downloadInFlight} />
            <span>{buttonText}</span>
        </button>
    );

    if (tooltipComponent) {
        console.log("checking tooltipComponent");
        return (
            <TooltipWrapper
                className={wrapperclass}
                tooltipPosition="left"
                tooltipComponent={tooltipComponent} >
                {downloadButton()}
            </TooltipWrapper>
        );
    }
    return (
        <div className={wrapperclass} >
            {downloadButton()}
        </div>
    );
};

DownloadIconButton508.propTypes = propTypes;
export default DownloadIconButton508;

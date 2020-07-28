/**
 * DownloadIconButton.jsx
 * Created by Lizzie Salita 7/9/20
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
    onClick: PropTypes.func,
    downloadInFlight: PropTypes.bool,
    alternativeStyle: PropTypes.bool
};

const DownloadIconButton = ({ onClick, downloadInFlight, alternativeStyle }) => {
    const startDownload = (e) => {
        e.preventDefault();
        if (!downloadInFlight) {
            onClick();
        }
    };

    const disabledClass = downloadInFlight ? ' sticky-header__button_disabled' : '';
    const buttonText = downloadInFlight ? 'Preparing Download...' : 'Download';
    const icon = downloadInFlight ? 'spinner' : 'download';


    if (alternativeStyle) {
        const disabledAlternativeStyleClass = downloadInFlight ? ' download__button_disabled' : '';
        return (
            <div className="download__button-wrapper">
                <button
                    className={`download__button${disabledAlternativeStyleClass}`}
                    title={buttonText}
                    aria-label={buttonText}
                    disabled={downloadInFlight}
                    onClick={startDownload}>
                    <FontAwesomeIcon icon={icon} spin={!!downloadInFlight} />
                    &nbsp;
                    &nbsp;
                    <span>Download Data</span>
                </button>
            </div>
        );
    }
    return (
        <>
            <button
                className={`sticky-header__button${disabledClass}`}
                title={buttonText}
                aria-label={buttonText}
                disabled={downloadInFlight}
                onClick={startDownload}>
                <FontAwesomeIcon icon={icon} spin={!!downloadInFlight} />
            </button>
            <span>Download</span>
        </>
    );
};

DownloadIconButton.propTypes = propTypes;
export default DownloadIconButton;

/**
 * TableDownloadIconButton.jsx
 * Created by Lizzie Salita 7/9/20
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
    onClick: PropTypes.func,
    downloadInFlight: PropTypes.bool
};

const TableDownloadIconButton = ({ onClick, downloadInFlight }) => {
    const startDownload = (e) => {
        e.preventDefault();
        if (!downloadInFlight) {
            onClick();
        }
    };

    const disabledClass = downloadInFlight ? ' sticky-header__button_disabled' : '';
    const buttonText = downloadInFlight ? 'Preparing Download...' : 'Download';
    const icon = downloadInFlight ? 'spinner' : 'download';

    return (
        <div className="download__button-wrapper">
            <button
                className={`download__button${disabledClass}`}
                title={buttonText}
                aria-label={buttonText}
                disabled={downloadInFlight}
                onClick={startDownload}>
                <FontAwesomeIcon icon={icon} spin={!!downloadInFlight} />
                <span>Download Data</span>
            </button>
        </div>
    );
};

TableDownloadIconButton.propTypes = propTypes;
export default TableDownloadIconButton;

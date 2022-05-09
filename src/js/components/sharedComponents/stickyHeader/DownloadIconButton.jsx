/**
 * DownloadIconButton.jsx
 * Created by Lizzie Salita 7/9/20
 **/

// TODO: This code is in the component library. We can delete it once we import <DownloadIconButton /> everywhere this is used

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DownloadHover from 'components/covid19/DownloadHover';

const propTypes = {
    onClick: PropTypes.func,
    downloadInFlight: PropTypes.bool
};

const DownloadIconButton = ({ onClick, downloadInFlight }) => {
    const [showHover, setShowHover] = useState(false);
    const startDownload = (e) => {
        e.preventDefault();
        if (!downloadInFlight) {
            onClick();
        }
    };

    const onMouseEnter = () => setShowHover(true);
    const onMouseLeave = () => setShowHover(false);

    let hover = null;
    if (showHover && !downloadInFlight) {
        hover = (<DownloadHover />);
    }

    const disabledClass = downloadInFlight ? ' sticky-header__button_disabled' : '';
    const buttonText = downloadInFlight ? 'Preparing Download...' : 'Download';
    const icon = downloadInFlight ? 'spinner' : 'download';

    return (
        <div
            className="download-wrap"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onFocus={onMouseEnter}
            onBlur={onMouseLeave}>
            {hover}
            <button
                className={`sticky-header__button${disabledClass}`}
                title={buttonText}
                aria-label={buttonText}
                disabled={downloadInFlight}
                onClick={startDownload}>
                <FontAwesomeIcon icon={icon} spin={!!downloadInFlight} />
            </button>
            <span>Download</span>
        </div>
    );
};

DownloadIconButton.propTypes = propTypes;
export default DownloadIconButton;

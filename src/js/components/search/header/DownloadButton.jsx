/**
  * DownloadButton.jsx
  * Created by Kevin Li 11/10/16
  **/

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import NoDownloadHover from './NoDownloadHover';

const propTypes = {
    onClick: PropTypes.func,
    downloadAvailable: PropTypes.bool,
    downloadInFlight: PropTypes.bool,
    disableHover: PropTypes.bool
};

const DownloadButton = (props) => {
    const [showHover, setShowHover] = useState(false);

    const onMouseEnter = () => {
        setShowHover(true);
    };

    const onMouseLeave = () => {
        setShowHover(false);
    };

    const onClick = (e) => {
        e.preventDefault();
        if (props.downloadAvailable && !props.downloadInFlight) {
            props.onClick();
        }
    };

    let hover = null;
    if (showHover && !props.downloadAvailable
        && !props.disableHover && !props.downloadInFlight) {
        hover = (<NoDownloadHover />);
    }

    let disabled = '';
    if (!props.downloadAvailable || props.downloadInFlight) {
        disabled = 'disabled';
    }

    let buttonText = 'Download';
    if (props.downloadInFlight) {
        buttonText = 'Preparing Download...';
    }

    return (
        <div
            className="download-wrap"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onFocus={onMouseEnter}
            onBlur={onMouseLeave}>
            {hover}
            <button
                className={`download-button ${disabled}`}
                title="Download your data"
                aria-label="Download your data"
                aria-disabled={!props.downloadAvailable}
                onClick={onClick}>
                <div className="label">{buttonText}</div>
            </button>
        </div>
    );
};

DownloadButton.propTypes = propTypes;
export default DownloadButton;

/**
 * DownloadBottomBar.jsx
 * Created by Kevin Li 8/8/17
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { ExclamationCircle, CheckCircle } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    showError: PropTypes.bool,
    showSuccess: PropTypes.bool,
    title: PropTypes.string,
    descriptionOne: PropTypes.string,
    descriptionTwo: PropTypes.string,
    download: PropTypes.object
};

const Spinner = () => (
    <div className="spinner">
        <div className="double-bounce1" />
        <div className="double-bounce2" />
    </div>
);

const DownloadBottomBar = ({
    showError = false,
    showSuccess = false,
    title,
    descriptionOne,
    descriptionTwo,
    download
}) => {
    const [copied, setCopied] = useState(false);

    let leftIcon = <Spinner />;

    if (showError) {
        leftIcon = <ExclamationCircle alt="Error" />;
    }
    else if (showSuccess) {
        leftIcon = <CheckCircle alt="Ready for Download" />;
    }

    const icon = (
        <div className="icon valid">
            <CheckCircle />
        </div>
    );

    const onCopy = () => {
        setCopied(true);
    };

    return (
        <div className="floating-download-bottom-bar">
            <div className="bottom-bar-content">
                <div className="left-icon">
                    {leftIcon}
                </div>
                <div className="text-content">
                    <div className="title">
                        {title}
                    </div>
                    <p>
                        {`${descriptionOne} `}
                        {copied ? <span>{icon}</span> : null}
                        <CopyToClipboard
                            text={download.expectedUrl}
                            onCopy={onCopy}>
                            <button>{copied ? 'copied' : 'download link'}</button>
                        </CopyToClipboard>
                        {` ${descriptionTwo}`}
                    </p>
                </div>
            </div>
        </div>
    );
};

DownloadBottomBar.propTypes = propTypes;
export default DownloadBottomBar;

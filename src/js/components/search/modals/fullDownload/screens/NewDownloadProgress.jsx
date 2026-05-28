/**
 * NewDownloadProgress.jsx
 * Created by Nick Torres 5/8/2026
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { CheckCircle } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    setDownloadCollapsed: PropTypes.func,
    expectedUrl: PropTypes.string
};

const NewDownloadProgress = ({
    expectedUrl, setDownloadCollapsed
}) => {
    const [copied, setCopied] = useState(false);
    useEffect(() => {
        setDownloadCollapsed(true);
    }, [setDownloadCollapsed]);


    const onCopy = useCallback(() => {
        setCopied(true);
    }, []);


    const icon = (
        <div className="icon valid">
            <CheckCircle />
        </div>
    );
    return (
        <div className="download-progress-screen">
            <div className="main-title">
                <div className="details">
                        This may take a little while &mdash; wait times vary based on site traffic and file size.
                </div>
                <div className="link-box">
                    <p>Action Required: Once your download is ready, the link below is required to access your file. Be sure to copy your link; this download link is temporary and will expire.</p>
                    <div className="link">{expectedUrl}</div>

                    <CopyToClipboard
                        text={expectedUrl}
                        onCopy={onCopy}>
                        <button>
                            {copied ? <span>{icon}</span> : null}
                            {copied ? 'Copied' : 'Copy Link'}
                        </button>
                    </CopyToClipboard>
                </div>
                <div className="sub-details">
                        To keep browsing, copy the download link and close this window; your download status will appear at the bottom of the screen.
                </div>
            </div>
        </div>
    );
};

NewDownloadProgress.propTypes = propTypes;
export default NewDownloadProgress;

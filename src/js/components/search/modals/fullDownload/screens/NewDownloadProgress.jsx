/**
 * NewDownloadProgress.jsx
 * Created by Nick Torres 5/8/2026
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { CheckCircle } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    hideModal: PropTypes.func,
    setDownloadCollapsed: PropTypes.func,
    expectedFile: PropTypes.string,
    expectedUrl: PropTypes.string,
    download: PropTypes.object
};

const NewDownloadProgress = (props) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        props.setDownloadCollapsed(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.download?.expectedFile, props.download?.expectedUrl]);


    const onCopy = useCallback(() => {
        setCopied(true);
    });


    const icon = (
        <div className="icon valid">
            <CheckCircle />
        </div>
    );
    return (
        <div className="download-progress-screen">
            <div className="main-title">
                <h3 style={{ textAlign: 'center' }}>We&#8217;re preparing your download.</h3>
                <div className="details">
                        This may take a little while &mdash; wait times vary based on site traffic and file size.
                </div>
                <div className="link-box">
                    <p>Action Required: Once your download is ready, the link below is required to access your file. Be sure to copy your link; this download link is temporary and will expire.</p>
                    <div className="link">{props.expectedUrl}</div>

                    <CopyToClipboard
                        text={props.expectedUrl}
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

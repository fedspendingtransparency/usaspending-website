/**
 * DownloadHover.jsx
 * Created by James Lee 7/16/2020
 */

import React from 'react';
import { ExclamationTriangle } from 'components/sharedComponents/icons/Icons';

const DownloadHover = () => (
    <div className="download-hover-spacer">
        <div
            className="download-hover"
            id="no-download-hover"
            role="tooltip">
            <div className="download-hover-interior">
                <div className="hover-content">
                    <div className="icon">
                        <ExclamationTriangle alt="Download is not available" />
                    </div>
                    <div className="message">
                        <div>This download does not include Account Breakdowns by Award data (File C).</div>
                        <br />
                        <div>To download this data, please visit <br />the <a href="#/download_center/custom_account_data">Custom Account Data</a> page.</div>
                    </div>
                </div>
                <div className="tooltip-pointer right" />
            </div>
        </div>
    </div>
);

export default DownloadHover;

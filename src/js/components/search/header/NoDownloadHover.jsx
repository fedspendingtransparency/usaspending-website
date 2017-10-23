/**
 * NoDownloadHover.jsx
 * Created by Kevin Li 10/23/17
 */

import React from 'react';
import { ExclamationTriangle } from 'components/sharedComponents/icons/Icons';

const NoDownloadHover = () => (
    <div className="download-hover">
        <div className="hover-content">
            <div className="icon">
                <ExclamationTriangle alt="Download is not available" />
            </div>
            <div className="message">
                Download functionality is not available when there are more than 500,000 records. Please limit your results with additional filters to download.
            </div>
        </div>
        <div className="tooltip-pointer right" />
    </div>
);

export default NoDownloadHover;

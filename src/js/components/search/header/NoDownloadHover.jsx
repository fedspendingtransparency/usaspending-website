/**
 * NoDownloadHover.jsx
 * Created by Kevin Li 10/23/17
 */

import React from 'react';
import { ExclamationTriangle } from 'components/sharedComponents/icons/Icons';

const NoDownloadHover = () => (
    <div className="download-hover-spacer">
        <div className="download-hover">
            <div className="download-hover-interior">
                <div className="hover-content">
                    <div className="icon">
                        <ExclamationTriangle alt="Download is not available" />
                    </div>
                    <div className="message">
                        Please visit the <a href="#/bulk_download">Bulk Download</a> page to export
                        more than 500,000 records or limit your results with additional filters.
                    </div>
                </div>
                <div className="tooltip-pointer right" />
            </div>
        </div>
    </div>
);

export default NoDownloadHover;

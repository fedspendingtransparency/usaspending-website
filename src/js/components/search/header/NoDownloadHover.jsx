/**
 * NoDownloadHover.jsx
 * Created by Kevin Li 10/23/17
 */

import React from 'react';
import { ExclamationTriangle } from 'components/sharedComponents/icons/Icons';

const NoDownloadHover = () => (
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
                        Our Advanced Search limits downloads to 500,000 records.
                        Narrow your search using additional filters, or grab larger files from
                        our <a href="#/download_center/award_data_archive">Award Data Archive</a>.
                    </div>
                </div>
                <div className="tooltip-pointer right" />
            </div>
        </div>
    </div>
);

export default NoDownloadHover;

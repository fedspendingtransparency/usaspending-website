/**
 * DownloadPlaceholder.jsx
 * Created by Kevin Li 1/24/18
 */

import React from 'react';

const DownloadPlaceholder = () => (
    <div className="download-placeholder">
        <div className="download-placeholder__wrapper">
            <div className="download-placeholder__icon">
                <div className="download-placeholder__icon-caption">
                    Icon representing a generic download action
                </div>
            </div>
            <h2
                className="download-placeholder__title"
                tabIndex={-1}>
                Downloading our data is easy.
            </h2>

        </div>
    </div>
);

export default DownloadPlaceholder;

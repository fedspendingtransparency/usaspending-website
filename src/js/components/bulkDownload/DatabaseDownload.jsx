/**
 * DatabaseDownload.jsx
 * Created by Lizzie Salita 8/27/21
 * Temporary
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DatabaseDownload = () => (
    <div className="database-download">
        <h2>Database Download</h2>
        <div className="database-download-message">
            <h3 className="database-download-message__heading">
                <FontAwesomeIcon className="database-download-message__icon" icon="exclamation-triangle" />
                This page is unavailable while we are making updates to USAspending.
            </h3>
            <p className="database-download-message__description">
                Looking for USAspending data? For award-related data, visit the Custom Award Data download. For federal account-related data, visit the Custom Account Data download.
            </p>
        </div>
    </div>
);

export default DatabaseDownload;

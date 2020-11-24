/**
 * MetadataDownloadContainer.jsx
 * Created by Afna Saifudeen 11/19/20
 */

import React from 'react';
import kGlobalConstants from 'GlobalConstants';
import MetadataDownload from 'components/bulkDownload/MetadataDownload';

const MetadataDownloadContainer = () => {
    const downloadLocation = `${kGlobalConstants.FILES_SERVER_BASE_URL}/docs/USAspending-data-catalog.json`;

    return (
        <MetadataDownload
            downloadLocation={downloadLocation} />
    );
};

export default MetadataDownloadContainer;


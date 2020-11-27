/**
 * MetadataDownload.jsx
 * Created by Afna Saifudeen 11/19/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
    downloadLocation: PropTypes.string
};

const MetadataDownload = ({ downloadLocation }) => (
    <div className="metadata-dl">
        <h2 className="metadata__title">Dataset Metadata</h2>
        <p className="metadata__intro">
            This JSON file contains metadata for all datasets that are published on USAspending.gov,
            including information such as dataset description, file format, publishing agency, and keywords.
        </p>
        <div className="metadata-download-button">
            <a
                target="_blank"
                href={downloadLocation}
                rel="noopener noreferrer"
                aria-label="Dataset Metadata">
                <button
                    className="full-menu__item--button">
                    <FontAwesomeIcon icon="file-code" />
                    Download the Metadata JSON File
                </button>
            </a>
        </div>
    </div>
);

MetadataDownload.propTypes = propTypes;
export default MetadataDownload;

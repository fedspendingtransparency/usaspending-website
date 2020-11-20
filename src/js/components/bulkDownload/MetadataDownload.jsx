/**
 * MetadataDownload.jsx
 * Created by Afna Saifudeen 11/19/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

const propTypes = {
    downloadLocation: PropTypes.string
};

const MetadataDownload = ({
    downloadLocation
}) => (
    <div className="data-dictionary">
        <h2 className="data-dictionary__title">Metadata Download</h2>
        <p className="data-dictionary__intro">
            This JSON file contains metadata for all datasets that are published on USAspending.gov,
            including information such as dataset description, file format, publishing agency, and keywords.
        </p>
        <div className="data-dictionary__search-download">
            <div className="data-dictionary__download">
                <a
                    className="data-dictionary__download-link"
                    href={downloadLocation}>
                    <div className="data-dictionary__download-icon">
                        <button className="full-menu__item--button">
                            <FontAwesomeIcon icon={faEnvelope} />
                            Stay In Touch
                        </button>
                    </div>
                Download
                </a>
            </div>
        </div>
    </div>
);

MetadataDownload.propTypes = propTypes;
export default MetadataDownload;

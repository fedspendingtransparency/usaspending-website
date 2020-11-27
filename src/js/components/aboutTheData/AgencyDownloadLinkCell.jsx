import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import kGlobalConstants from 'GlobalConstants';

const propTypes = {
    file: PropTypes.string
};

const AgencyDownloadLinkCell = ({ file }) => (
    <div className="agency-table-download">
        <div className="usa-button-link">
            <span className="usa-button-link__download-icon">
                <FontAwesomeIcon
                    data-href={`${kGlobalConstants.FILES_SERVER_BASE_URL}/agency_submissions/${file}`}
                    icon="file-alt" />
            </span>
            <a
                target="_blank"
                href={`${kGlobalConstants.FILES_SERVER_BASE_URL}/agency_submissions/${file}`}
                rel="noopener noreferrer"
                aria-label="Raw quarterly submission files">
                Download
            </a>
        </div>
    </div>
);

AgencyDownloadLinkCell.propTypes = propTypes;
export default AgencyDownloadLinkCell;

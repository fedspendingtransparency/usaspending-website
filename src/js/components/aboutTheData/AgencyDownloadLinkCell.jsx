import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import kGlobalConstants from 'GlobalConstants';

const propTypes = {
    file: PropTypes.string
};

const AgencyDownloadLinkCell = ({ file }) => (
    <a
        className="agency-table-download"
        target="_blank"
        href={`${kGlobalConstants.FILES_SERVER_BASE_URL}/agency_submissions/${file}`}
        rel="noopener noreferrer"
        aria-label="Raw quarterly submission files">
        <FontAwesomeIcon icon="file-alt" />Download
    </a>
);

AgencyDownloadLinkCell.propTypes = propTypes;
export default AgencyDownloadLinkCell;

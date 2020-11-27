import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import kGlobalConstants from 'GlobalConstants';

const AgencyDownloadLinkCell = () => (
    <div className="agency-website">
        <div className="usa-button-link">
            <span className="usa-button-link__download-icon">
                <FontAwesomeIcon
                    data-href={`${kGlobalConstants.FILES_SERVER_BASE_URL}/agency_submissions/`}
                    icon="file-alt" />
            </span>
            <a
                target="_blank"
                href={`${kGlobalConstants.FILES_SERVER_BASE_URL}/agency_submissions/`}
                rel="noopener noreferrer"
                aria-label="Raw quarterly submission files">
                Download
            </a>
        </div>
    </div>
);

export default AgencyDownloadLinkCell;

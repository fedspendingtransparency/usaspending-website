/**
 * DataQuality.jsx
 * Created by Mike Bray 11/20/20178
 */

import React from 'react';
import kGlobalConstants from 'GlobalConstants';

export default class DataQuality extends React.Component {
    render() {
        return (
            <div
                className="about-section-wrapper"
                id="about-data-quality">
                <h2 className="about-section-title">
                    Data Quality
                </h2>
                <h3 className="about-subtitle">
                    A commitment to accuracy and completeness.
                </h3>
                <div className="about-section-content">
                    <p>
                        The Department of the Treasury, along with the federal agencies, is
                        committed to improving the accuracy and completeness of the data on
                        USAspending.gov. Our motto is Better Data, Better Government,
                        Better Decision-making.
                    </p>
                </div>
                <div className="about-subtitle">
                    <h3>How we achieve this:</h3>
                </div>
                <div className="about-section-content">
                    <p><strong>Agency Quarterly Data Certification</strong></p>
                    <ul>
                        <li>
                            Every agency has a Senior Accountable Official who must officially
                            certify that the quarterly financial data submitted by their agency
                            is accurate and complete. The agency&apos;s data is published on
                            USAspending.gov only after it has been certified.
                        </li>
                    </ul>
                    <p><strong>Data Validation</strong></p>
                    <ul>
                        <li>
                            Every grant, loan, direct payment, and other financial assistance
                            record submitted to the Financial Assistance Broker Submission
                            system must pass a series of validations before the data is
                            published on USAspending.gov.
                        </li>
                    </ul>
                    <p>
                        To ensure that contract data is accurate, the Office of Management and
                        Budget issues the&nbsp;
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://sam.gov/SAM/transcript/govt-wide_procurement_data_quality_summary.pdf">
                            Federal Government Procurement Data Quality Summary
                        </a>
                        &nbsp;about data submitted by the agencies to the Federal Procurement
                        Data System (FPDS). If there are any discrepancies in procurement data, FPDS
                        is the authoritative source. In addition, the federal agencies&apos;
                        raw quarterly submission files, including Quarterly Assurance Statements from Senior Accountable Officials of each agency about known data quality issues, are&nbsp;
                        <a
                            target="_blank"
                            href={`${kGlobalConstants.FILES_SERVER_BASE_URL}/agency_submissions/`}
                            rel="noopener noreferrer"
                            aria-label="Raw quarterly submission files">
                            available here
                        </a>.
                    </p>
                    <p>
                        Additionally, the Inspector General of each agency must issue reports to
                        Congress on the agency&apos;s compliance with DATA Act requirements.
                        Go to&nbsp;
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.oversight.gov/">
                            oversight.gov
                        </a>
                        &nbsp;to see these reports.
                    </p>
                </div>
            </div>
        );
    }
}

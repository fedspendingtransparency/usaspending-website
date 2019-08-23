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
                    <ul>
                        <li>
                            <span className="about-section-list-item-title">
                                Agency Quarterly Data Certification
                            </span>
                            Every agency has a Senior Accountable Official who must officially
                            certify that the quarterly financial data submitted by their agency
                            is accurate and complete. The agency&apos;s data is published on
                            USAspending.gov only after it has been certified.
                        </li>
                        <li>
                            <span className="about-section-list-item-title">
                                Data Validation
                            </span>
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
                            href="https://sam.gov/sam/transcript/FY2012-2017_govt-wide_procurement_data_quality_summary.pdf">
                            Federal Government Procurement Data Quality Summary
                        </a>
                        &nbsp;about data submitted by the agencies to the Federal Procurement
                        Data System (FPDS). If there are any discrepancies in procurement data, FPDS
                        is the authoritative source. In addition, the federal agencies&apos;
                        raw quarterly submission files, including Quarterly Assurance Statements from Senior Accountable Officials of each agency about known data quality issues, are&nbsp;
                        <a
                            target="_blank"
                            href={`https://files${kGlobalConstants.DEV ? '-nonprod' : ''}.usaspending.gov/agency_submissions/`}
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

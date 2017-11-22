/**
 * DataQuality.jsx
 * Created by Mike Bray 11/20/20178
 */

import React from 'react';

export default class DataQuality extends React.Component {
    constructor(props) {
        super(props);

        this.downloadDataElementMapping = this.downloadDataElementMapping.bind(this);
    }

    downloadDataElementMapping() {
        window.open('./data/Data Element Mapping.xlsx', '_self');
    }

    render() {
        return (
            <div
                className="about-section-wrapper"
                id="about-data-quality">
                <div className="about-section-title">
                    <h2>Data Quality</h2>
                </div>
                <div className="about-subtitle">
                    <h3>A commitment to accuracy and completeness.</h3>
                </div>
                <div className="about-section-content">
                    <p>The Department of the Treasury, along with the federal agencies, is
                        committed to improving the accuracy and completeness of the data on
                        USAspending.gov. Our motto is Better Data, Better Government,
                        Better Decision-making.</p>
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
                    <p>To ensure that contract data is accurate, the Office of Management and
                        Budget issues the&nbsp;
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="/data/Federal%20Government%20Data%20Quality%20Summary%20FY2011-2016.pdf">
                            Federal Government Procurement Data Quality Summary
                        </a>
                        &nbsp;about data submitted by the agencies to the Federal Procurement
                        Data System (FPDS).</p>
                    <p>Additionally, the Inspector General of each agency must issue reports to
                        Congress on the agency&apos;s compliance with DATA Act requirements.
                        Go to&nbsp;
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.oversight.gov/">
                            oversight.gov
                        </a>
                        &nbsp;to see these reports. </p>
                    <p>For more information about the data, see the&nbsp;
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://usaspending-help.zendesk.com/hc/en-us/sections/115000739433-Frequently-Ask-Questions-">
                            FAQs
                        </a>
                        &nbsp;and the&nbsp;
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://fedspendingtransparency.github.io/data-dictionary/">
                            Data Dictionary
                        </a>
                        . The federal agencies&apos; raw quarterly submission files,
                        including Qualification Statements about the data, are available&nbsp;
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="http://usaspending-submissions.s3-website-us-gov-west-1.amazonaws.com/">
                            here
                        </a>
                        .</p>
                </div>
                <div className="about-subtitle">
                    <h3>Data Element Mapping</h3>
                </div>
                <div className="about-section-content">
                    <p>In updating our system, the names of some of our data elements
                        may have changed. For a mapping of the updated element&apos;s new names and
                        legacy names, please refer to the link below.</p>
                    <div className="about-section-content-inline-buttons">
                        <div className="button-holder">
                            <button
                                className="usa-button-outline"
                                aria-label="Download Data Element Mapping"
                                title="Download Data Element Mapping"
                                onClick={this.downloadDataElementMapping}>
                                Download Data Element Mapping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

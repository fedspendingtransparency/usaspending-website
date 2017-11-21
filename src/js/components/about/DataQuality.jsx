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
                        USAspending.gov.  Our motto is Better Data, Better Government,
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
                            is accurate and complete. The agency’s data is published on
                            USAspending.gov only after it has been certified.
                        </li>
                        <li>
                            <span className="about-section-list-item-title">
                                Data Validation
                            </span>
                            Every grant, loan, direct payment, and other financial assistance
                            record submitted to the Financial Assistance Broker Submission system
                            must pass a series of validations before the data is published on
                            USAspending.gov.
                        </li>
                    </ul>
                    <p>To ensure that contract data is accurate, the Office of Management and
                        Budget issues the Federal Government Procurement Data Quality Summary
                        about data submitted by the agencies to the Federal Procurement Data System
                        (FPDS).</p>
                    <p>Additionally, the Inspector General of each agency must issue reports to
                        Congress on the agency’s compliance with DATA Act requirements.
                        Go to oversight.gov to see these reports.</p>
                    <p>For more information about the data, see the FAQs and the
                        Data Dictionary.</p>
                </div>
                <div className="about-subtitle">
                    <h3>Data Element Mapping</h3>
                </div>
                <div className="about-section-content">
                    <p>In updating our system, the names of some of our data elements
                        may have changed. For a mapping of the updated element’s new names and
                        legacy names, please refer to the link below.</p>
                    <button
                        className="usa-button-outline"
                        aria-label="Download Data Element Mapping"
                        title="Download Data Element Mapping"
                        onClick={this.downloadDataElementMapping}>
                        Download Data Element Mapping
                    </button>
                </div>
            </div>
        );
    }
}

/**
 * DataSources.jsx
 * Created by Mike Bray 11/20/20178
 */

import React from 'react';

export default class DataSources extends React.Component {
    render() {
        return (
            <div
                className="about-section-wrapper"
                id="about-data-sources">
                <div className="about-section-title">
                    <h2>Data Sources</h2>
                </div>
                <div className="about-subtitle">
                    <h3>Connecting the dots across government.</h3>
                </div>
                <div className="about-section-content">
                    <p>As you see in Exhibit 1 below, a lot of information is collected into
                        USAspending.gov from a variety of government systems.  Data is uploaded
                        directly from hundreds of federal agencies’ financial systems. Data is
                        also pulled or derived from other government systems.  For example,
                        contract award data is pulled into USAspending.gov daily from FPDS,
                        the Federal Procurement Data System; Financial Assistance award data is
                        loaded in from FABS – the Federal Assistance Broker Submission. In the
                        end, more than 400 points of data are collected.</p>
                    <p>And that’s not all. Entities receiving awards directly from federal agencies
                        submit data on their sub-awards to FSRS, the FFATA Sub-award Reporting
                        System. And the businesses that are required to report their Highly
                        Compensated Executives data do so to SAM – the System for
                        Award Management.</p>
                    <p>Federal agencies submit contract, grant, loan, and direct payments award
                        data at least twice a month. That data is published on USAspending.gov
                        daily. Federal agencies upload data from their financial systems and
                        link it to the award data quarterly.</p>
                    <p>For more specific information on the data, see the FAQs and the Glossary.</p>
                    <img src="img/data-sources.png" alt="Data Sources" />
                </div>
            </div>
        );
    }
}

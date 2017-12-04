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
                    <p>
                        As you see in Exhibit 1 below, many sources of information support
                        USAspending.gov, linking data from a variety of government systems
                        to improve transparency on federal spending for the public.  Data is
                        uploaded directly from more than a hundred federal agencies&apos; financial systems.
                        Data is also pulled or derived from other government systems.
                        For example, contract award data is pulled into USAspending.gov daily
                        from the Federal Procurement Data System Next Generation (FPDS-NG);
                        Financial Assistance award data is loaded in from the Federal Assistance
                        Broker Submission system (FABS). In the end, more than 400 points of data
                        are collected.
                    </p>
                    <p>
                        And that&apos;s not all. Entities receiving awards directly from federal
                        agencies submit data on their sub-awards to the FFATA Sub-award Reporting
                        System (FSRS). And businesses that are required to report their Highly
                        Compensated Executives data do so to the System for Award Management
                        (SAM).
                    </p>
                    <p>
                        Federal agencies submit contract, grant, loan, direct payment, and other
                        award data at least twice a month to be published on USAspending.gov.
                        Federal agencies upload data from their financial systems and link it
                        to the award data quarterly. This quarterly data must be certified by
                        the agency&apos;s Senior Accountable Official before it is displayed on
                        USAspending.gov.
                    </p>
                </div>
                <div className="about-subtitle">
                    <h3>Exhibit 1</h3>
                </div>
                <div className="about-section-content">
                    <img src="img/data-sources.png" alt="Data Sources" />
                </div>
            </div>
        );
    }
}

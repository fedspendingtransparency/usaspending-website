/**
 * DataSources.jsx
 * Created by Mike Bray 11/20/20178
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = { onExternalLinkClick: PropTypes.func.isRequired };

const DataSources = ({ onExternalLinkClick }) => (
    <div
        className="about-section-wrapper"
        id="about-data-sources">
        <h2 className="about-section-title">
            Data Sources
        </h2>
        <h3 className="about-subtitle">
            Connecting the dots across government.
        </h3>
        <div className="about-section-content">
            <p>
                As you see in Exhibit 1 below, many sources of information support
                USAspending.gov, linking data from a variety of government systems
                to improve transparency on federal spending for the public.  Data is
                uploaded directly from more than a hundred federal agencies&apos; financial systems.
                Data is also pulled or derived from other government systems.
                For example, contract award data is pulled into USAspending.gov daily
                from the&nbsp;
                <button
                    value="https://www.fpds.gov/fpdsng_cms/index.php/en/"
                    role="link"
                    className="usa-button-link"
                    onClick={onExternalLinkClick}>
                    Federal Procurement Data System Next Generation (FPDS-NG)
                    <span
                        data-href="https://www.fpds.gov/fpdsng_cms/index.php/en/"
                        className="usa-button-link__icon">
                        <FontAwesomeIcon data-href="https://www.fpds.gov/fpdsng_cms/index.php/en/" icon="external-link-alt" />
                    </span>
                </button>, which is the system of record for federal procurement data;
                Financial Assistance award data is loaded in from the Financial Assistance
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
        <div className="about-section-content">
            <img src="img/daims-information-flow-diagram-v2.0.jpg" alt="Data Sources" />
            <div className="center"><i>Exhibit 1</i></div>
        </div>
        <p>The timing of data updates is summarized below:</p>
        <div className="about-section-content">
            <p><strong>Account data:</strong></p>
            <ul>
                <li>
                    Effective for the June 2020 reporting period, agencies with COVID-19 relief funding must
                    submit their account data (Files A, B, and C) to the Treasury DATA Act Broker on a monthly basis.
                    This requirement affects most agencies that submit regular financial reports to USAspending.gov.
                    Beginning in Fiscal Year 2022 Quarter 1, the remaining agencies must report on a monthly basis
                    rather than on their current quarterly schedule. New or updated data appear on USAspending.gov the
                    day after they are submitted (i.e., published) by the agency. More information about the agency
                    account data reporting policy is found in&nbsp;
                    <button
                        className="usa-button-link"
                        role="link"
                        value="https://www.whitehouse.gov/wp-content/uploads/2020/04/Implementation-Guidance-for-Supplemental-Funding-Provided-in-Response.pdf"
                        onClick={onExternalLinkClick}>
                        OMB’s Memorandum M-20-21 (Appendix A, Section III)
                        <span
                            data-href="https://www.whitehouse.gov/wp-content/uploads/2020/04/Implementation-Guidance-for-Supplemental-Funding-Provided-in-Response.pdf"
                            className="usa-button-link__icon">
                            <FontAwesomeIcon
                                data-href="https://www.whitehouse.gov/wp-content/uploads/2020/04/Implementation-Guidance-for-Supplemental-Funding-Provided-in-Response.pdf"
                                icon="external-link-alt" />
                        </span>
                    </button>.
                    The full schedule for agency submissions is located&nbsp;
                    <a
                        href="https://fiscal.treasury.gov/data-transparency/resources.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="https://fiscal.treasury.gov/data-transparency/resources.html"
                        title="https://fiscal.treasury.gov/data-transparency/resources.html">
                        here
                        <span className="usa-button-link__icon"><FontAwesomeIcon icon="external-link-alt" /></span>
                    </a>.
                </li>
            </ul>
            <p><strong>Award and Sub-Award data:</strong></p>
            <ul>
                <li>
                  Procurement data from the General Service Administration’s (GSA) Federal Procurement Data System (FPDS)
                    is generally made available on USAspending.gov within five days of when a contract award or modification is made.&nbsp;
                    <button
                        className="usa-button-link"
                        role="link"
                        value="https://www.acquisition.gov/far/4.604"
                        onClick={onExternalLinkClick}>
                        Procurement policy
                        <span
                            data-href="https://www.acquisition.gov/far/4.604"
                            className="usa-button-link__icon">
                            <FontAwesomeIcon
                                data-href="https://www.acquisition.gov/far/4.604"
                                icon="external-link-alt" />
                        </span>
                    </button>
                    &nbsp;allows contracting officers three business days to submit a contract action report to FPDS; after
                    they do so, that data is made available to USAspending.gov on the following morning and automatically published to the
                    website the day after that.
                    <ul>
                        <li>
                        Example 1: A contract award or modification is made on a given Thursday. The award is reported to FPDS three business days later,
                        on the following Tuesday. It is then made available to USAspending.gov on Wednesday morning and published to the site on Thursday
                        after the nightly pipeline runs.
                        </li>
                        <li>
                        Example 2: A contract award or modification is made on a given Tuesday. The award is reported to FPDS three business days later,
                        on Friday. It is then made available to USAspending.gov on Saturday morning and published to the site on Sunday after the nightly
                        pipeline runs.
                        </li>
                    </ul>
                </li>
                <li>There are two exceptions to the three business day rule for contract/FPDS data:
                    <ul>
                        <li>
                            Publication of Department of Defense (DOD) and U.S. Army Corps of Engineers (USACE) data in FPDS is delayed 90 days.
                            For more on this delay, see the Data Quality section.
                        </li>
                        <li>
                            Per&nbsp;
                            <button
                                className="usa-button-link"
                                role="link"
                                value="https://www.acquisition.gov/far/4.604"
                                onClick={onExternalLinkClick}>
                                procurement policy
                                <span
                                    data-href="https://www.acquisition.gov/far/4.604"
                                    className="usa-button-link__icon">
                                    <FontAwesomeIcon
                                        data-href="https://www.acquisition.gov/far/4.604"
                                        icon="external-link-alt" />
                                </span>
                            </button>
                            , any contract award made in accordance with FAR&nbsp;
                            <button
                                className="usa-button-link"
                                role="link"
                                value="https://www.acquisition.gov/far/6.302-2#FAR_6_302_2"
                                onClick={onExternalLinkClick}>
                                6.302-2
                                <span
                                    data-href="https://www.acquisition.gov/far/6.302-2#FAR_6_302_2"
                                    className="usa-button-link__icon">
                                    <FontAwesomeIcon
                                        data-href="https://www.acquisition.gov/far/6.302-2#FAR_6_302_2"
                                        icon="external-link-alt" />
                                </span>
                            </button>
                            &nbsp;or pursuant to any of the authorities listed in subpart&nbsp;
                            <button
                                className="usa-button-link"
                                role="link"
                                value="https://www.acquisition.gov/far/subpart-18.2#FAR_Subpart_18_2"
                                onClick={onExternalLinkClick}>
                                18.2
                                <span
                                    data-href="https://www.acquisition.gov/far/subpart-18.2#FAR_Subpart_18_2"
                                    className="usa-button-link__icon">
                                    <FontAwesomeIcon
                                        data-href="https://www.acquisition.gov/far/subpart-18.2#FAR_Subpart_18_2"
                                        icon="external-link-alt" />
                                </span>
                            </button>
                            , must be submitted to FPDS within 30 days of the contract award.
                        </li>
                    </ul>
                </li>
                <li>
                    Assistance awards are reported by federal financial assistance officers to the Treasury DATA Act Broker within two weeks of issuance
                    of an assistance award or modification, as required by&nbsp;
                    <button
                        className="usa-button-link"
                        role="link"
                        value="https://www.whitehouse.gov/wp-content/uploads/2020/04/Implementation-Guidance-for-Supplemental-Funding-Provided-in-Response.pdf"
                        onClick={onExternalLinkClick}>
                        OMB’s Memorandum M-20-21 (Appendix A, Section III)
                        <span
                            data-href="https://www.whitehouse.gov/wp-content/uploads/2020/04/Implementation-Guidance-for-Supplemental-Funding-Provided-in-Response.pdf"
                            className="usa-button-link__icon">
                            <FontAwesomeIcon
                                data-href="https://www.whitehouse.gov/wp-content/uploads/2020/04/Implementation-Guidance-for-Supplemental-Funding-Provided-in-Response.pdf"
                                icon="external-link-alt" />
                        </span>
                    </button>
                    . The exception is loan awards,
                    which are reported within 30 days, following&nbsp;
                    <button
                        className="usa-button-link"
                        role="link"
                        value="https://uscode.house.gov/view.xhtml?path=/prelim@title31/subtitle5/chapter61&edition=prelim"
                        onClick={onExternalLinkClick}>
                        the statute
                        <span
                            data-href="https://uscode.house.gov/view.xhtml?path=/prelim@title31/subtitle5/chapter61&edition=prelim"
                            className="usa-button-link__icon">
                            <FontAwesomeIcon
                                data-href="https://uscode.house.gov/view.xhtml?path=/prelim@title31/subtitle5/chapter61&edition=prelim"
                                icon="external-link-alt" />
                        </span>
                    </button>
                    . Once new data is published in the Broker, the USAspending.gov website
                    is updated the following day.
                    <ul>
                        <li>
                            Example 1: A grant is issued on September 8. It must be reported to the Broker within 14 days, by September 22. If submitted on September 22,
                            the new data are published on USAspending.gov on September 23.
                        </li>
                        <li>
                            Example 2: A loan is issued on September 8. It must be reported to the Broker by October 8. If submitted on October 8, the new data are
                            published on USAspending.gov on October 9.
                        </li>
                    </ul>
                </li>
                <li>
                    Subawards are reported by prime award recipients to GSA’s FFATA Subaward Reporting System (FSRS) by the end of the month following the month the
                    subaward was made, following&nbsp;
                    <button
                        className="usa-button-link"
                        role="link"
                        value="https://www.fsrs.gov/documents/OMB_Guidance_on_FFATA_Subaward_and_Executive_Compensation_Reporting_08272010.pdf"
                        onClick={onExternalLinkClick}>
                        OMB subaward reporting guidance
                        <span
                            data-href="https://www.fsrs.gov/documents/OMB_Guidance_on_FFATA_Subaward_and_Executive_Compensation_Reporting_08272010.pdf"
                            className="usa-button-link__icon">
                            <FontAwesomeIcon
                                data-href="https://www.fsrs.gov/documents/OMB_Guidance_on_FFATA_Subaward_and_Executive_Compensation_Reporting_08272010.pdf"
                                icon="external-link-alt" />
                        </span>
                    </button>
                    .
                    <ul>
                        <li>
                            Example 1: A subaward is issued on September 1. It must be reported to FSRS by October 31. If submitted on October 31, the new data are
                            available to USAspending.gov on November 1 and published to the site on November 2.
                        </li>
                        <li>
                            Example 2: A subaward is issued on September 30. It must be reported to FSRS by October 31. If submitted on October 31, the new data are
                            available to USAspending.gov on November 1 and published to the site on November 2.
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
);

DataSources.propTypes = propTypes;
export default DataSources;

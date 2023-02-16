/**
 * DataQuality.jsx
 * Created by Mike Bray 11/20/20178
 */

import React from 'react';

const DataQuality = () => (
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
                Budget issues the{' '}
                <a
                    href="https://www.fsd.gov/gsafsd_sp?id=kb_article_view&sysparm_article=KB0048871"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="https://www.fsd.gov/gsafsd_sp?id=kb_article_view&sysparm_article=KB0048871"
                    title="https://www.fsd.gov/gsafsd_sp?id=kb_article_view&sysparm_article=KB0048871">
                    Federal Government Procurement Data Quality Summary
                </a>
                &nbsp;about data submitted by the agencies to the Federal Procurement
                Data System (FPDS). If there are any discrepancies in procurement data, FPDS
                is the authoritative source.
            </p>
            <p>
                Additionally, the Inspector General of each agency must issue reports to
                Congress on the agency&apos;s compliance with DATA Act requirements.
                Go to&nbsp;
                <a target="_blank" rel="noopener noreferrer" href="https://www.oversight.gov/">oversight.gov</a>
                &nbsp;to see these reports.
            </p>
            <div className="about-subtitle">
                <p>
                    <strong>
                        The Government Accountability Office (GAO) has&nbsp;
                        <a target="_blank" rel="noopener noreferrer" href="https://www.gao.gov/assets/710/702586.pdf">identified</a>
                        &nbsp;the need to disclose the following two items:
                    </strong>
                </p>
            </div>
            <div className="about-section-content">
                <ul>
                    <li>
                    GSA’s FPDS delays publishing procurement (i.e., contract and IDV) data for the Department of Defense
                    (DOD) and U.S. Army Corps of Engineers (USACE) in order to&nbsp;
                        <a target="_blank" rel="noopener noreferrer" href="https://www.acq.osd.mil/dpap/policy/policyvault/2006-2086-DPAP.pdf">address potential DOD operational tempo issues</a>
                    , delaying the availability of procurement, account breakdown by award (File C),
                    and subcontract data on USAspending.gov that pertain to DOD and USACE by 90 days as well. This
                    delay is acknowledged in a&nbsp;
                        <a target="_blank" rel="noopener noreferrer" href="https://media.defense.gov/2017/Nov/08/2001839818/-1/-1/1/DODIG-2018-020.PDF">2017 DOD Inspector General report</a>
                    . Account Balances (File A), Account
                    Breakdown by Program Activity &amp; Object Class (File B) data and assistance award data are unaffected
                    by this delay.
                    </li>
                    <li>
                    The Department of Health and Human Services (HHS) Centers for Medicare &amp; Medicaid Services (CMS)
                    reports financial assistance awards from Medicare programs (CFDA 93.773, 93.774, and 93.770) as
                    lump sum payments, with each record corresponding to the amount of money sent to a specific&nbsp;
                        <a target="_blank" rel="noopener noreferrer" href="https://www.cms.gov/Medicare/Medicare-Contracting/Medicare-Administrative-Contractors/What-is-a-MAC">Medicare Administrative Contractor (MAC)</a>
                        &nbsp;in a given month. The recipient location and primary place of
                    performance location fields in these records correspond to the county where the MAC is located. As
                    such, the location fields for these records do not reflect the places where Medicare beneficiaries
                    or provider physicians/hospitals are located (which are usually in different states than the
                    MAC’s location). Note that, per policy, the aggregate record format is solely intended to shield
                    personally-identifiable-information (PII) of individual citizens, rather than to anonymize the names
                    of companies like MACs.
                    </li>
                </ul>
            </div>
        </div>
    </div>
);

export default DataQuality;

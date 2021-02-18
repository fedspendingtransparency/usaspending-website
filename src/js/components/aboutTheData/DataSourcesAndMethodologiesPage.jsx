/**
 * Created by Max Kendall
 * 02/18/2021
 */

import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { covidPageDataSourcesMetaTags } from 'helpers/metaTagHelper';
import { stickyHeaderHeight } from 'dataMapping/covid19/covid19';
import {
    getStickyBreakPointForSidebar,
    createJumpToSectionForSidebar
} from 'helpers/covid19Helper';

import Footer from 'containers/Footer';
import Header from 'containers/shared/HeaderContainer';
import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';
import Sidebar from 'components/sharedComponents/sidebar/Sidebar';
import ExternalLink from 'components/sharedComponents/ExternalLink';
import ShareIcon from 'components/sharedComponents/stickyHeader/ShareIcon';

const sections = [
    {
        label: 'Using this Table',
        section: 'using_this_table',
        show: true
    },
    {
        label: 'Percent of Total Federal Budget',
        section: 'percent_of_total',
        show: true
    },
    {
        label: 'Most Recent Update',
        section: 'most_recent_update',
        show: true
    },
    {
        label: 'Number of TASs Missing from Account Balance Data',
        section: 'missing_tas',
        show: true
    },
    {
        label: 'Reporting Difference in Obligations',
        section: 'obligations_discrepancies',
        show: true
    },
    {
        label: 'Number of Unlinked Awards',
        section: 'unlinked_awards',
        show: true
    },
    {
        label: 'Agency Comments',
        section: 'agency_comments',
        show: true
    }
];

require('pages/data-sources/index.scss');

const jumpToSection = createJumpToSectionForSidebar("data-sources", sections.reduce((acc, obj) => ({
    ...acc,
    [obj.section]: { title: obj.label }
}), {}));

const getEmailSocialShareData = {
    subject: "Agency Submission Statistics: Data Sources & Methodology",
    body: `View Agency Submission Statistics: Data Sources & Methodology on USAspending.gov: ${"https://www.usaspending.gov/submission-statistics/"}`
};

export default () => {
    const [activeSection, setActiveSection] = useState(sections[0].section);
    const dataDisclaimerBannerRef = useRef(null);

    const jumpToDataSourcesSection = (section) => {
        // we've been provided a section to jump to
        // check if it's a valid section
        const matchedSection = sections.find((obj) => obj.section === section);
        jumpToSection(section);
        setActiveSection(matchedSection.section);
    };

    return (
        <div className="usa-da-dsm-page" ref={dataDisclaimerBannerRef}>
            {/* TODO: Update these meta tags */}
            <MetaTags {...covidPageDataSourcesMetaTags} />
            <Header />
            <StickyHeader>
                <>
                    <div className="sticky-header__title">
                        <h1 tabIndex={-1} id="main-focus">
                            Agency Submissions Statistics: Data Sources and Methodology
                        </h1>
                    </div>
                    <div className="sticky-header__toolbar">
                        <ShareIcon
                            slug="submission-statistics"
                            email={getEmailSocialShareData} />
                    </div>
                </>
            </StickyHeader>
            <main id="main-content" className="main-content">
                <div className="sidebar usda__flex-col">
                    <Sidebar
                        pageName="data-sources"
                        fixedStickyBreakpoint={getStickyBreakPointForSidebar()}
                        verticalSectionOffset={stickyHeaderHeight}
                        active={activeSection}
                        jumpToSection={jumpToDataSourcesSection}
                        detectActiveSection={setActiveSection}
                        sections={sections} />
                </div>
                <div className="about-content-wrapper">
                    <div className="about-content">
                        <div className="about-padded-content">
                            <div className="about-section-wrapper" id="data-sources-using_this_table">
                                <div className="back-link">
                                    <Link
                                        to="/submission-statistics"
                                        rel="noopener noreferrer">
                                        <FontAwesomeIcon icon="arrow-left" />
                                        Back to the Agency Submission Statistics Table
                                    </Link>
                                </div>
                                <h2 className="about-section-title">
                                    Using this Table
                                </h2>
                                <div className="about-section-content">
                                    <p>
                                        The following list contains the data sources that power the displays and calculations on our COVID-19 Spending profile page and associated API endpoints. The first two datasets are directly submitted to USAspending by federal agencies; the rest are regularly pulled from external source systems. Data on the COVID-19 Spending page will generally be refreshed at the end of each month, with each update adding the prior month&apos;s activity.
                                    </p>
                                </div>
                                <h3 className="about-subtitle">
                                    <a href="https://fiscal.treasury.gov/data-transparency/DAIMS-current.html"><strong>DATA Act Broker Submission (DABS, also known as &quot;Broker&quot;)</strong></a>
                                </h3>
                                <div className="about-section-content">
                                    <ul>
                                        <li>
                                            <strong>Responsible party:</strong> federal agency budget and financial reporting officers
                                        </li>
                                        <li>
                                            <strong>Frequency of updates:</strong> monthly
                                        </li>
                                        <li>
                                            <strong>Details:</strong> The Broker contains financial data sourced from agency financial systems. This information is submitted directly by federal agencies to the Broker on a monthly basis and is packaged with related award and subaward data by the Broker and certified by a Senior Accountable Official. Directly submitted financial data files cover: 1) Treasury Account Symbol (TAS) balances (in Broker File A); 2) breakdowns of TAS-level spending by several dimensions (in Broker File B); and 3) a further breakdown of the award component of that spending by each federal award (in Broker File C). The latter two of these files are used on this page; visit our <Link to="/download_center/custom_account_data">Custom Account Data</Link> page to download them: &quot;Account Breakdown by Program Activity &amp; Object Class&quot; (for File B) and &quot;Account Breakdown by Award&quot; (for File C).
                                        </li>
                                    </ul>
                                </div>
                                <h3 className="about-subtitle">
                                    <strong><a href="https://fiscal.treasury.gov/data-transparency/DAIMS-current.html">Financial Assistance Broker Submission (FABS)</a></strong>
                                </h3>
                                <div className="about-section-content">
                                    <ul>
                                        <li>
                                            <strong>Responsible party:</strong> federal assistance officers
                                        </li>
                                        <li>
                                            <strong>Frequency of updates:</strong> twice monthly
                                        </li>
                                        <li>
                                            <strong>Details:</strong> FABS contains financial data sourced from agency financial assistance systems and focuses on federal financial assistance awards. This information is submitted directly by federal agencies to the Broker twice a month. Data about financial assistance awards on the COVID-19 Spending profile page (except for obligation and outlay dollar amounts) is sourced from FABS.
                                        </li>
                                    </ul>
                                </div>
                                <h3 className="about-subtitle">
                                    <strong>Government wide Treasury Account Symbol Adjusted Trial Balance System (GTAS)</strong>
                                </h3>
                                <div className="about-section-content">
                                    <ul>
                                        <li>
                                            <strong>Responsible party:</strong> federal agency budget and financial reporting officers
                                        </li>
                                        <li>
                                            <strong>Frequency of updates:</strong> monthly
                                        </li>
                                        <li>
                                            <strong>Details:</strong> A data extract from GTAS is used to power the government-wide spending totals in the first two sections of the page (&quot;Overview&quot; and &quot;Total Spending by Budget Category&quot;). Certain DABS data are cross-validated against GTAS in the Broker submission process, including all of the Treasury Account Balance (File A) data.
                                        </li>
                                    </ul>
                                </div>
                                <h3 className="about-subtitle">
                                    <strong>Treasury Central Accounting Reporting System (CARS)</strong>
                                </h3>
                                <div className="about-section-content">
                                    <ul>
                                        <li>
                                            <strong>Responsible party:</strong> federal agency budget and financial reporting officers
                                        </li>
                                        <li>
                                            <strong>Frequency of updates:</strong> up to daily
                                        </li>
                                        <li>
                                            <strong>Details:</strong> CARS provides metadata concerning Treasury Accounts and Federal Accounts.
                                        </li>
                                    </ul>
                                </div>
                                <h3 className="about-subtitle">
                                    <strong>Federal Procurement Data System (FPDS)</strong>
                                </h3>
                                <div className="about-section-content">
                                    <ul>
                                        <li>
                                            <strong>Responsible party:</strong> federal procurement officers
                                        </li>
                                        <li>
                                            <strong>Frequency of updates:</strong> up to daily
                                        </li>
                                        <li>
                                            <strong>Details:</strong> FPDS is a government database for collecting contract data. Data about contract awards on the COVID-19 Spending profile page (except for obligation and outlay dollar amounts) is sourced from FPDS.
                                        </li>
                                    </ul>
                                </div>
                                <h3 className="about-subtitle">
                                    <strong>FFATA Subaward Reporting System (FSRS)</strong>
                                </h3>
                                <div className="about-section-content">
                                    <ul>
                                        <li>
                                            <strong>Responsible party:</strong> prime recipients of federal awards
                                        </li>
                                        <li>
                                            <strong>Frequency of updates:</strong> monthly
                                        </li>
                                        <li>
                                            <strong>Details:</strong> FSRS is a government database for collecting subcontract and subgrant information. It is not used in the COVID-19 Spending profile page&apos;s display, but is used to add subaward information to the page&apos;s download (specifically, all subawards associated with prime awards that were funded by COVID-19 supplemental appropriations).
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="about-section-wrapper" id="data-sources-percent_of_total">
                                <h2 className="about-section-title">
                                            Percent of Total Federal Budget
                                </h2>
                                <div className="about-section-content">
                                    <p>
                                        <strong>Use the COVID-19 Spending profile page &quot;Download&quot; button to find the data needed to recreate our COVID-19 calculations.</strong>
                                    </p>
                                    <p>
                                                This download includes 8 types of files:
                                    </p>
                                    <ul>
                                        <li>
                                                    Account Balances (sourced from GTAS)
                                        </li>
                                        <li>
                                                    Account Breakdown (sourced from Broker File B)
                                        </li>
                                        <li>
                                                    Contract Prime Award Summaries (sourced from FPDS, with some derived fields compiled from Broker File C; <strong>linked data only*</strong>)
                                        </li>
                                        <li>
                                                    Assistance Prime Award Summaries (sourced from FABS, with several derived fields compiled from Broker File C; <strong>linked data only*</strong>)
                                        </li>
                                        <li>
                                                    Contract Subawards (sourced from FSRS)
                                        </li>
                                        <li>
                                                    Assistance Subawards (sourced from FSRS)
                                        </li>
                                        <li>
                                                    COVID-19_download_readme.txt
                                        </li>
                                        <li>
                                                    Data_Dictionary_Crosswalk.xlsx
                                        </li>
                                    </ul>
                                    <p>
                                        <em>* See &quot;Linked and Unlinked Award Data&quot; below for information about linked awards</em>
                                    </p>
                                    <p>
                                                This download covers all data that is used on the COVID-19 Spending profile page, with the exception of granular Broker File C data, which is not included due to size considerations. While the &quot;Award Summaries&quot; files in this download will be sufficient for most users, the File C data has two main uses: 1) it provides access to both <strong>linked and unlinked</strong> data used in award spending totals on this page (the &quot;Award Summaries&quot; files in the profile page download only contain <strong>linked</strong> data — see &quot;Linked and Unlinked Award Data&quot; below for more information); 2) it provides a higher degree of granularity in breaking down award spending by several financial data dimensions (including the specific amount each award was funded by each Object Class, Program Activity, Disaster Emergency Fund Code (DEFC), and Treasury Account).
                                    </p>
                                    <p>
                                        <strong>Broker File C data can be downloaded from the <Link to="/download_center/custom_account_data">Custom Account Data</Link> page in the following manner:</strong>
                                    </p>
                                    <ol>
                                        <li>
                                                    Go to the <Link to="/download_center/custom_account_data">Custom Account Data download page</Link>
                                        </li>
                                        <li>
                                                    Select &quot;All&quot; for Budget Function
                                        </li>
                                        <li>
                                                    Select &quot;All&quot; for Agency
                                        </li>
                                        <li>
                                                    Select &quot;Treasury Account&quot; for Account Level
                                        </li>
                                        <li>
                                                    For File Type: Select &quot;Account Breakdown by Award&quot;
                                        </li>
                                        <li>
                                                    Select the latest period of FY20
                                        </li>
                                        <li>
                                                    Click &quot;Download&quot;
                                        </li>
                                        <li>
                                                    If it is after FY20, repeat this process for each FY after FY20 until you have reached the current FY (one file per FY)
                                        </li>
                                    </ol>
                                </div>
                            </div>
                            <div className="about-section-wrapper" id="data-sources-most_recent_update">
                                <h2 className="about-section-title">
                                    Most Recent Update
                                </h2>
                                <div className="about-section-content">
                                    <p>
                                        In accordance with the Office of Management and Budget (OMB)
                                        <ExternalLink
                                            url="https://www.whitehouse.gov/wp-content/uploads/2020/04/Implementation-Guidance-for-Supplemental-Funding-Provided-in-Response.pdf">
                                            Memorandum M-20-21
                                        </ExternalLink>, <strong>COVID-19 supplemental appropriations are identified by a Disaster Emergency Fund Code (DEFC)</strong>. The COVID-19 Spending profile page download is pre-filtered to include only spending data associated with COVID-19 DEFC values. If you use the <Link to="/download_center/custom_account_data">Custom Account Data</Link> page to download Broker File C data, be sure to filter for rows with DEFC values in the downloaded file.
                                    </p>
                                    <p>
                                        Note that the <strong>National Interest Action (NIA)</strong> code is also used to track COVID-19 spending. However, it only applies to procurement actions (i.e., contracts) and is not necessarily tied to COVID-19 supplemental appropriations. Thus, awards with the COVID-19 NIA value may not have a COVID-19 DEFC value, and vice versa.
                                    </p>
                                    <p>
                                        The relevant codes for COVID-19 response funding and their associated legislation are as follows:
                                    </p>
                                </div>
                            </div>
                            <div className="about-section-wrapper" id="data-sources-missing_tas">
                                <h2 className="about-section-title">
                                    Number of TASs Missing from Account Balance data
                                </h2>
                                <div className="about-section-content">
                                    <p>
                                            Loan Spending is more complicated than spending for other federal awards like contracts or grants. Loan spending has two components: 1) Face Value of Loans, which is the amount that agencies have directly issued (for direct loans) or facilitated by compensating the lender if the borrower defaults (for loan guarantees); and 2) Loan Subsidy Cost, which is the calculated net present value of the loan or loan guarantee to the government, taking into account the size of the loan (i.e., its face value), interest rate, and the modeled risk of the recipient failing to pay back the loan in part or full.
                                    </p>
                                    <p>
                                            From a budget perspective, Face Value of Loans is not considered federal spending, since it does not in itself represent a long-term cost to the government. As a result, <strong>Face Value of Loans is not included in any obligation or outlay figure</strong>. However, <strong>Loan Subsidy Cost does have direct budgetary impact and is factored into obligations and outlays when <em>it is positive</em></strong>. Subsidy costs can be positive (indicating that the government is likely to lose money on the loan) or negative (indicating that the government is likely to make money on the loan). Loan Subsidy Cost should never be larger in absolute value terms than the Face Value of Loans itself. Administrative costs of running the loan or loan guarantee program itself are excluded from Loan Subsidy Cost calculations.
                                    </p>
                                </div>
                            </div>
                            <div className="about-section-wrapper" id="data-sources-obligations_discrepancies">
                                <h2 className="about-section-title">
                                    Reporting Difference in Obligations
                                </h2>
                                <div className="about-section-content">
                                    <p>
                                        All calculations in this section can be recreated from the &quot;Account Balances&quot; file in the COVID-19 Spending profile page download.
                                    </p>
                                    <p>
                                        <strong>Total Budgetary Resources</strong> calculation:
                                    </p>
                                    <ul>
                                        <li>
                                            Sum together:
                                            <ul>
                                                <li>
                                                    Total Budgetary Resources for the latest accounting period (i.e., Current Period Ending, or CPE) for every Treasury Account Symbol (TAS) tagged with a COVID-19 DEFC value
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <p>
                                        <strong>Total Remaining Balance</strong> calculation:
                                    </p>
                                    <ul>
                                        <li>
                                            Sum together:
                                            <ul>
                                                <li>
                                                    Unobligated Balance for the latest accounting period (i.e., Current Period Ending, or CPE) for every Treasury Account Symbol (TAS) tagged with a COVID-19 DEFC value
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <p>
                                        <strong>Total Obligations</strong> calculation:
                                    </p>
                                    <ul>
                                        <li>
                                            Sum together:
                                            <ul>
                                                <li>
                                                    Obligations Incurred for the latest accounting period (i.e., Current Period Ending, or CPE) for every Treasury Account Symbol (TAS) tagged with a COVID-19 DEFC value
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <p>
                                        <strong>Total Outlays</strong> calculation:
                                    </p>
                                    <ul>
                                        <li>
                                            Sum together:
                                            <ul>
                                                <li>
                                                    Gross Outlay Amount by Treasury Account Symbol (TAS) for the latest accounting period (i.e., Current Period Ending, or CPE) for every Treasury Account Symbol (TAS) tagged with a COVID-19 DEFC value
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="about-section-wrapper" id="data-sources-unlinked_awards">
                                <h2 className="about-section-title">
                                    Number of Unlinked Awards
                                </h2>
                                <div className="about-section-content">
                                    <p>
                                        All high-level, boxed calculations in this section can be recreated using the &quot;Account Balances&quot; and &quot;Account Breakdown&quot; files in the COVID-19 Spending profile page download. <strong>These four amounts remain constant regardless of any spending type selection in the dropdown</strong>.
                                    </p>
                                    <p>
                                        <strong>Number of Agencies</strong> calculation:
                                    </p>
                                    <ul>
                                        <li>
                                            In &quot;Account Breakdown&quot; file:
                                            <ul>
                                                <li>
                                                    Count of distinct agencies as determined by Agency Identifier (AID) for every Treasury Account Symbol (TAS) tagged with a COVID-19 DEFC value
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <p>
                                        <strong>Number of Federal Accounts</strong> calculation:
                                    </p>
                                    <ul>
                                        <li>
                                            In &quot;Account Breakdown&quot; file:
                                            <ul>
                                                <li>
                                                    Count of distinct Federal Accounts for every Treasury Account Symbol (TAS) tagged with a COVID-19 DEFC value
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <p>
                                        <strong>Number of Object Classes</strong> calculation:
                                    </p>
                                    <ul>
                                        <li>
                                            In &quot;Account Breakdown&quot; file:
                                            <ul>
                                                <li>
                                                    Count of distinct Object Classes for every Treasury Account Symbol (TAS) tagged with a COVID-19 DEFC value
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <p>
                                        <strong>Total Budgetary Resources</strong> calculation:
                                    </p>
                                    <ul>
                                        <li>
                                            In &quot;Account Balances&quot; file, sum together:
                                            <ul>
                                                <li>
                                                    Total Budgetary Resources for the latest accounting period (i.e., Current Period Ending, or CPE) for every Treasury Account Symbol (TAS) tagged with a COVID-19 DEFC value
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <p>
                                        <strong>Total Obligations</strong> calculation:
                                    </p>
                                    <ul>
                                        <li>
                                            In &quot;Account Balances&quot; file, sum together:
                                            <ul>
                                                <li>
                                                    Obligations Incurred for the latest accounting period (i.e., Current Period Ending, or CPE) for every Treasury Account Symbol (TAS) tagged with a COVID-19 DEFC value
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <p>
                                        <strong>Total Outlays</strong> calculations:
                                    </p>
                                    <ul>
                                        <li>
                                            In &quot;Account Balances&quot; file, sum together:
                                            <ul>
                                                <li>
                                                    Gross Outlay Amount by Treasury Account Symbol (TAS) for the latest accounting period (i.e., Current Period Ending, or CPE) for every Treasury Account Symbol (TAS) tagged with a COVID-19 DEFC value
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="about-section-wrapper" id="data-sources-agency_comments">
                                <div className="about-section-content">
                                    <h2 className="about-section-title">
                                            Agency Comments
                                    </h2>
                                    <p>
                                            In order to understand the data surfaced in the &quot;Award Spending&quot; sections (detailed below), it is important to understand the concept of <strong>linking between Broker File C and FPDS/FABS award data</strong>. Broker File C serves as a bridge between data sourced from agency financial systems (i.e., the data in Broker File C itself) and award data sourced from FPDS and FABS. The actual link between these two datasets is an <strong>award ID</strong> (also known as <strong>&quot;award unique key&quot;</strong>). For various reasons, not every award ID in Broker File C has a corresponding award ID in FPDS or FABS data, which makes them unmatchable. If a Broker File C row cannot be matched to FPDS or FABS, we call it &quot;unlinked&quot;. Unlinked Broker File C data cannot be supplemented by metadata from FPDS or FABS (including recipient information, CFDA program, and funding agency).
                                    </p>
                                    <p>
                                        <strong>The rule of thumb for all award sections is to <em>use complete Broker File C data where possible</em> (containing both linked and unlinked awards); <em>where not possible, only linked data will be used</em> (representing a subset of the authoritative award spending total based on both linked and unlinked data in Broker File C).</strong>
                                    </p>
                                    <p>
                                            Note that even for sections that only display linked award data, <strong>Broker File C is always the basis for any obligated or outlayed dollar amount displayed for award data</strong>.
                                    </p>
                                    <p>
                                            As mentioned in the &quot;Download Instructions&quot; section above, <strong>linked</strong> data is compiled in the COVID-19 Spending profile page download. For <strong>linked and unlinked</strong> data, use the <Link to="/download_center/custom_account_data">Custom Account Data</Link> page.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

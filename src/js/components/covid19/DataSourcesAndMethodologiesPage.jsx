/**
 * Created by Marco Mendoza
 * 07/23/2020
 */

import React, { useState } from 'react';
import Cookies from 'js-cookie';
import kGlobalConstants from 'GlobalConstants';
import { covidPageDataSourcesMetaTags } from 'helpers/metaTagHelper';
import { scrollToY } from 'helpers/scrollToHelper';
import { scrollPositionOfSiteHeader } from 'dataMapping/covid19/covid19';

import Footer from 'containers/Footer';
import Header from 'containers/shared/HeaderContainer';
import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';
import Sidebar from 'components/sharedComponents/sidebar/Sidebar';
import ExternalLink from 'components/sharedComponents/ExternalLink';

const cookie = 'usaspending_covid_homepage';

let sections = [
    {
        label: 'Datasets',
        section: 'datasets',
        show: true
    },
    {
        label: 'Download Instructions',
        section: 'download-instructions',
        show: true
    },
    {
        label: 'Disaster Emergency Fund Code (DEFC)',
        section: 'DEFC',
        show: true
    },
    {
        label: 'Loan Spending',
        section: 'loan-spending',
        show: kGlobalConstants.CARES_ACT_RELEASED_2
    },
    {
        label: 'Overview Section',
        section: 'overview',
        show: true
    },
    {
        label: 'Total Spending Section',
        section: 'total-spending',
        show: true
    },
    {
        label: 'Linked and Unlinked Award Data',
        section: 'linked-and-unlinked',
        show: kGlobalConstants.CARES_ACT_RELEASED_2
    },
    {
        label: 'Award Spending Sections',
        section: 'award-spending',
        show: kGlobalConstants.CARES_ACT_RELEASED_2
    }
];

if (!kGlobalConstants.CARES_ACT_RELEASED_2) sections = sections.filter((x) => x.show);

require('pages/data-sources/index.scss');

export default () => {
    const [activeSection, setActiveSection] = useState(sections[0].section);

    const jumpToDataSourcesSection = (section) => {
        // we've been provided a section to jump to
        // check if it's a valid section
        const matchedSection = sections.find((obj) => obj.section === section);

        if (!matchedSection) {
            // no matching section
            return;
        }

        // scroll to the correct section
        const sectionDom = document.querySelector(`#data-sources-${section}`);

        if (!sectionDom) {
            return;
        }
        if (activeSection === 'overview') {
            scrollToY(sectionDom.offsetTop - 150, 700);
        }
        else {
            // scrollY set to the top of the section, subtracting the height of sticky elements + 20px of margin
            scrollToY(sectionDom.offsetTop - 86, 700);
        }

        setActiveSection(matchedSection.section);
    };

    return (
        <div className="usa-da-dsm-page">
            {/* TODO: Update these meta tags */}
            <MetaTags {...covidPageDataSourcesMetaTags} />
            <Header />
            <StickyHeader>
                <div className="sticky-header__title">
                    <h1 tabIndex={-1} id="main-focus">
                        COVID-19 Spending: Data Sources &amp; Methodology
                    </h1>
                </div>
            </StickyHeader>
            <main id="main-content" className="main-content">
                <div className="sidebar usda__flex-col">
                    <Sidebar
                        pageName="data-sources"
                        fixedStickyBreakpoint={scrollPositionOfSiteHeader(Cookies.get(cookie))}
                        active={activeSection}
                        jumpToSection={jumpToDataSourcesSection}
                        detectActiveSection={setActiveSection}
                        sections={sections} />
                </div>
                <div className="about-content-wrapper">
                    <div className="about-content">
                        <div className="about-padded-content">
                            <div className="about-section-wrapper" id="data-sources-datasets">
                                <h2 className="about-section-title">
                                    Datasets
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
                                            <strong>Details:</strong> The Broker contains financial data sourced from agency financial systems. This information is submitted directly by federal agencies to the Broker on a monthly basis and is packaged with related award and subaward data by the Broker and certified by a Senior Accountable Official. Directly submitted financial data files cover: 1) Treasury Account Symbol (TAS) balances (in Broker File A); 2) breakdowns of TAS-level spending by several dimensions (in Broker File B); and 3) a further breakdown of the award component of that spending by each federal award (in Broker File C). The latter two of these files are used on this page; visit our <a href="/#/download_center/custom_account_data">Custom Account Data</a> page to download them: &quot;Account Breakdown by Program Activity &amp; Object Class&quot; (for File B) and &quot;Account Breakdown by Award&quot; (for File C).
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
                            {
                                kGlobalConstants.CARES_ACT_RELEASED_2 ? (
                                    <div className="about-section-wrapper" id="data-sources-download-instructions">
                                        <h2 className="about-section-title">
                                            Download Instructions
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
                                                <strong>Broker File C data can be downloaded from the <a href="/#/download_center/custom_account_data">Custom Account Data</a> page in the following manner:</strong>
                                            </p>
                                            <ol>
                                                <li>
                                                    Go to the <a href="/#/download_center/custom_account_data">Custom Account Data download page</a>
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
                                                <li>
                                                    Filter for rows with DEFC values &quot;L&quot;, &quot;M&quot;, &quot;N&quot;, &quot;O&quot;, and &quot;P&quot; in the downloaded file
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                ) :
                                    (
                                        <div className="about-section-wrapper" id="data-sources-download-instructions">
                                            <h2 className="about-section-title">
                                                Download Instructions
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
                                                        Contract Prime Award Summaries (sourced from FPDS, with some derived fields compiled from Broker File C)
                                                    </li>
                                                    <li>
                                                        Assistance Prime Award Summaries (sourced from FABS, with several derived fields compiled from Broker File C)
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
                                                    This download covers all data that is used on the COVID-19 Spending profile page, with the exception of granular Broker File C data, which is not included due to size considerations.
                                                </p>
                                                <p>
                                                    <strong>Broker File C data can be downloaded from the <a href="/#/download_center/custom_account_data">Custom Account Data</a> page in the following manner:</strong>
                                                </p>
                                                <ol>
                                                    <li>
                                                        Go to the <a href="/#/download_center/custom_account_data">Custom Account Data download page</a>
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
                                                    <li>
                                                        Filter for rows with DEFC values &quot;L&quot;, &quot;M&quot;, &quot;N&quot;, &quot;O&quot;, and &quot;P&quot; in the downloaded file
                                                    </li>
                                                </ol>
                                            </div>
                                        </div>
                                    )
                            }
                            <div className="about-section-wrapper" id="data-sources-DEFC">
                                <h2 className="about-section-title">
                                    Disaster Emergency Fund Code (DEFC)
                                </h2>
                                <div className="about-section-content">
                                    <p>
                                        In accordance with the Office of Management and Budget (OMB)
                                        <ExternalLink
                                            url="https://www.whitehouse.gov/wp-content/uploads/2020/04/Implementation-Guidance-for-Supplemental-Funding-Provided-in-Response.pdf">
                                            Memorandum M-20-21
                                        </ExternalLink>, <strong>COVID-19 supplemental appropriations are identified by a Disaster Emergency Fund Code (DEFC)</strong>. The COVID-19 Spending profile page download is pre-filtered to include only spending data associated with COVID-19 DEFC values. If you use the <a href="/#/download_center/custom_account_data">Custom Account Data</a> page to download Broker File C data, be sure to filter for rows with DEFC values &quot;L&quot;, &quot;M&quot;, &quot;N&quot;, &quot;O&quot;, and &quot;P&quot; in the downloaded file.
                                    </p>
                                    <p>
                                        Note that the <strong>National Interest Action (NIA)</strong> code is also used to track COVID-19 spending. However, it only applies to procurement actions (i.e., contracts) and is not necessarily tied to COVID-19 supplemental appropriations. Thus, awards with the COVID-19 NIA value may not have a COVID-19 DEFC value, and vice versa.
                                    </p>
                                    <p>
                                        The relevant codes for COVID-19 response funding and their associated legislation are as follows:
                                    </p>
                                    <ul>
                                        <li>
                                            <strong>DEFC &quot;L&quot;</strong>:
                                            <ul>
                                                <li>
                                                    Designated as emergency
                                                </li>
                                                <li>
                                                    Public Law 116-123, CORONAVIRUS PREPAREDNESS AND RESPONSE SUPPLEMENTAL APPROPRIATIONS ACT, 2020
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <strong>DEFC &quot;M&quot;</strong>:
                                            <ul>
                                                <li>
                                                    Designated as emergency
                                                </li>
                                                <li>
                                                    Public Law 116-127, FAMILIES FIRST CORONAVIRUS RESPONSE ACT
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <strong>DEFC &quot;N&quot;</strong>:
                                            <ul>
                                                <li>
                                                    Designated as emergency
                                                </li>
                                                <li>
                                                    Public Law 116-136, Coronavirus Aid, Relief, and Economic Security Act (CARES Act)
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <strong>DEFC &quot;O&quot;</strong>:
                                            <ul>
                                                <li>
                                                    Not designated as emergency
                                                </li>
                                                <li>
                                                    Public Law 116-136, Coronavirus Aid, Relief, and Economic Security Act (CARES Act)
                                                </li>
                                                <li>
                                                    Public Law 116-139, PAYCHECK PROTECTION PROGRAM AND HEALTH CARE ENHANCEMENT ACT
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <strong>DEFC &quot;P&quot;</strong>:
                                            <ul>
                                                <li>
                                                    Designated as emergency
                                                </li>
                                                <li>
                                                    Public Law 116-139, PAYCHECK PROTECTION PROGRAM AND HEALTH CARE ENHANCEMENT ACT
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {
                                kGlobalConstants.CARES_ACT_RELEASED_2 &&
                                <div className="about-section-wrapper" id="data-sources-loan-spending">
                                    <h2 className="about-section-title">
                                        Loan Spending
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
                            }
                            <div className="about-section-wrapper" id="data-sources-overview">
                                <h2 className="about-section-title">
                                    Overview Section
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
                            <div className="about-section-wrapper" id="data-sources-total-spending">
                                <h2 className="about-section-title">
                                    Total Spending Section
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
                            {
                                kGlobalConstants.CARES_ACT_RELEASED_2 &&
                                <div className="about-section-wrapper" id="data-sources-linked-and-unlinked">
                                    <div className="about-section-content">
                                        <h2 className="about-section-title">
                                            Linked and Unlinked Award Data
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
                                            As mentioned in the &quot;Download Instructions&quot; section above, <strong>linked</strong> data is compiled in the COVID-19 Spending profile page download. For <strong>linked and unlinked</strong> data, use the <a href="/#/download_center/custom_account_data">Custom Account Data</a> page.
                                        </p>
                                    </div>
                                </div>
                            }
                            {
                                kGlobalConstants.CARES_ACT_RELEASED_2 &&
                                <div className="about-section-wrapper" id="data-sources-award-spending">
                                    <h2 className="about-section-title">
                                        Award Spending Sections
                                    </h2>
                                    <div className="about-section-content">
                                        <p>
                                            There are several sections devoted to Award Spending. Each &quot;Award Spending&quot; section contains four high-level, boxed calculations. Unlike the &quot;Total Spending by Budget Category&quot; section, these boxed calculations update based on filters chosen (here, award types).
                                        </p>
                                        <p>
                                            The first of these calculations is a count of an award attribute (such as the count of CFDA programs) that uses <strong>linked</strong> data. Records without an award ID (award unique key) that links across the two datasets will not be counted in these calculations.
                                        </p>
                                        <p>
                                            The remaining three calculations use <strong>linked</strong> data when a particular award type is selected (i.e., any selection besides &quot;All Awards&quot;). When &quot;All Awards&quot; is selected, they draw on all Broker File C award data (i.e., <strong>linked and unlinked</strong> data) because no linked data points are required.
                                        </p>
                                        <p>
                                            Across all &quot;Award Spending&quot; sections, <strong>the charts and tables below these four calculations all rely on linked data</strong>. We use linked data here because the award attributes displayed can only be found by linking the two datasets.
                                        </p>
                                        <p>
                                            The &quot;Recipient Location&quot; tab is based on &quot;Recipient Location&quot; data. There is currently no &quot;Primary Place of Performance&quot; data used on the profile page, though it is available in the &quot;Award Summaries&quot; files in the profile page download. Recipient Location is the legal business address of the recipient; Primary Place of Performance refers to where the work of an award is performed as determined by federal award reporting officers.
                                        </p>
                                        <p>
                                            Note that CFDA Programs apply only to financial assistance awards; the CFDA section of the profile page therefore excludes all contract data. If you are looking for CFDA information in the profile page download, see the &quot;Assistance Prime Award Summaries&quot; file.
                                        </p>
                                        <p>
                                            <strong>Number of Recipients</strong> calculations:
                                        </p>
                                        <ul>
                                            <li>
                                                Count of unique recipients (by Recipient name) for every award ID (award unique key) tagged with a COVID-19 DEFC value. Filter by any award type as desired.
                                                <ul>
                                                    <li>
                                                        The count of recipients in this section represents the number of distinct recipient names in the dataset. Because some names are anonymized or indicate that the associated award was aggregated from many individual recipients/awards to protect personally identifiable information (PII), the true count of recipients is likely significantly higher. Names that indicate anonymized or aggregated recipients include: Multiple Recipients, Multiple Foreign Recipients, Miscellaneous Foreign Awardees, Private Individual, Individual Recipient, and Redacted Due to PII.
                                                    </li>
                                                    <li>
                                                        Note also that these are only direct recipients: often federal awards are given to state, local, or tribal governments and then further redistributed to individual citizens by those governments; in our dataset, only the award to the state, local, or tribal government is noted (though subgrants are tracked in some cases and can be viewed in the &quot;Assistance Subawards&quot; download).
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <p>
                                            <strong>Number of Agencies</strong> calculations:
                                        </p>
                                        <ul>
                                            <li>
                                                Count of unique agencies based on Funding Agency Code in the FABS and FPDS data for every award ID (award unique key) tagged with a COVID-19 DEFC value. Filter by any award type as desired.
                                                <ul>
                                                    <li>
                                                        In contrast to the Number of Agencies in the &quot;Total Spending by Budget Category&quot; section, this count of agencies uses only <strong>linked</strong> data (from FABS/FPDS) rather than <strong>linked and unlinked</strong> data (from Broker File C).
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <p>
                                            <strong>Number of CFDA Programs</strong> calculations:
                                        </p>
                                        <ul>
                                            <li>
                                                Count of all distinct CFDA Programs (number or title) for every award ID (award unique key) tagged with a COVID-19 DEFC. Filter by any award type as desired.
                                            </li>
                                        </ul>
                                        <p>
                                            <strong>Award Obligations</strong> calculations:
                                        </p>
                                        <ul>
                                            <li>
                                                For <strong>Award Spending (including Loan Spending)</strong>, sum together:
                                                <ul>
                                                    <li>
                                                        Either Transaction Obligated Amount (TOA, for linked and unlinked data) or Obligated Amount Funded by COVID-19 Supplementals (for linked data only) for every award ID (award unique key) tagged with a COVID-19 DEFC.
                                                    </li>
                                                    <li>
                                                        Filter by any award type as desired.
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <p>
                                            <strong>Award Outlays</strong> calculations:
                                        </p>
                                        <ul>
                                            <li>
                                                For <strong>Award Spending (including Loan Spending)</strong>, sum together:
                                                <ul>
                                                    <li>
                                                        Either Gross Outlay Amount (for linked and unlinked data) or Outlayed Amount Funded by COVID-19 Supplementals (for linked data only) for every award ID (award unique key) tagged with a COVID-19 DEFC.
                                                    </li>
                                                    <li>
                                                        Filter by any award type as desired.
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <p>
                                            <strong>Number of Awards</strong> calculation:
                                        </p>
                                        <ul>
                                            <li>
                                                Count of all distinct award IDs (award unique keys) tagged with a COVID-19 DEFC. Filter by any award type as desired.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

/**
 * Created by Marco Mendoza
 * 07/23/2020
 */

import React from 'react';

import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'components/sharedComponents/header/Header';
import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';
import Footer from 'containers/Footer';
import { covidPageDataSourcesMetaTags } from 'helpers/metaTagHelper';

require('pages/about/aboutPage.scss');

export default class DataSourcesAndMethodologies extends React.Component {
    render() {
        return (
            <div className="usa-da-about-page">
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
                    <div className="about-content-wrapper">
                        <div className="about-content">
                            <div className="about-padded-content">
                                <div className="about-section-wrapper" id="data-sources-datasets">
                                    <h2 className="about-section-title">
                                        Datasets
                                    </h2>
                                    <div className="about-section-content">
                                        <p>
                                            The following list contains the data sources that power the displays and calculations on our COVID-19 Spending profile page and associated API endpoints. The first two datasets are directly submitted to USAspending by federal agencies; the rest are regularly pulled from external source systems. Data on the COVID-19 Spending page will generally be refreshed at the end of each month, with each update adding the prior month’s activity.
                                        </p>
                                    </div>
                                    <h3 className="about-subtitle">
                                        <a href="https://fiscal.treasury.gov/data-transparency/DAIMS-current.html"><strong>DATA Act Broker Submission (DABS, also known as ‘Broker’)</strong></a>
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
                                                <strong>Details:</strong> The Broker contains financial data sourced from agency financial systems. This information is submitted directly by federal agencies to the Broker on a monthly basis and is packaged with related award and subaward data by the Broker and certified by a Senior Accountable Official. Directly submitted financial data files cover: 1) Treasury Account Symbol (TAS) balances (in Broker File A); 2) breakdowns of TAS-level spending by several dimensions (in Broker File B); and 3) a further breakdown of the award component of that spending by each federal award (in Broker File C). The latter two of these files are used on this page; visit our <a href="/#/download_center/custom_account_data">Custom Account Data</a> page to download them: ‘Account Breakdown by Program Activity &amp; Object Class’ (for File B) and ‘Account Breakdown by Award’ (for File C).
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
                                        <strong>Governmentwide Treasury Account Symbol Adjusted Trial Balance System (GTAS)</strong>
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
                                                <strong>Details:</strong> A data extract from GTAS is used to power the government-wide spending totals in the first two sections of the page (‘Overview’ and ‘Total Spending by Budget Category’). Certain DABS data are cross-validated against GTAS in the Broker submission process, including all of the Treasury Account Balance (File A) data.
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
                                                <strong>Details:</strong> FSRS is a government database for collecting subcontract and subgrant information. It is not used in the COVID-19 Spending profile page’s display, but is used to add subaward information to the page’s download (specifically, all subawards associated with prime awards that were funded by COVID-19 supplemental appropriations).
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="about-section-wrapper" id="data-sources-download-instructions">
                                    <h2 className="about-section-title">
                                        Download Instructions
                                    </h2>
                                    <div className="about-section-content">
                                        <p>
                                            Use the COVID-19 Spending profile page ‘Download’ button to find the data needed to recreate our COVID-19 calculations. This download includes 8 types of files:
                                        </p>
                                        <ol>
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
                                        </ol>
                                        <p>
                                            <strong><em>* See ‘Linked and Unlinked Award Data’ below for information about linked awards</em></strong>
                                        </p>
                                        <p>
                                            This download covers all data that is used on the COVID-19 Spending profile page, with the exception of granular Broker File C data, which is not included due to size considerations. While the ‘Award Summaries’ files in this download will be sufficient for most users, the File C data has two main uses: 1) it provides access to both <strong>linked and unlinked</strong> data used in award spending totals on this page (the ‘Award Summaries’ files in the profile page download only contain <strong>linked</strong> data—see ‘Linked and Unlinked Award Data’ below for more information); 2) it provides a higher degree of granularity in breaking down award spending by several financial data dimensions (including the specific amount each award was funded by each Object Class, Program Activity, Disaster Emergency Fund Code (DEFC), and Treasury Account).
                                        </p>
                                        <p>
                                            Broker File C data can be downloaded from the <a href="/#/download_center/custom_account_data">Custom Account Data</a> page in the following manner:
                                        </p>
                                        <ul>
                                            <li>
                                                Go to the <a href="/#/download_center/custom_account_data">Custom Account Data download page</a>
                                            </li>
                                            <li>
                                                Select ‘All’ for Budget Function
                                            </li>
                                            <li>
                                                Select ‘All’ for Agency
                                            </li>
                                            <li>
                                                Select ‘Treasury Account’ for Account Level
                                            </li>
                                            <li>
                                                For File Type: Select ‘Account Breakdown by Award’
                                            </li>
                                            <li>
                                                Select the latest period of FY20
                                            </li>
                                            <li>
                                                Click ‘Download’
                                            </li>
                                            <li>
                                                If it is after FY20, repeat this process for each FY after FY20 until you have reached the current FY (one file per FY)
                                            </li>
                                            <li>
                                                Filter for rows with DEFC values ‘L’, ‘M’, ‘N’, ‘O’, and ‘P’ in the downloaded file
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="about-section-wrapper" id="data-sources-DEFC">
                                    <h2 className="about-section-title">
                                        Disaster Emergency Fund Code (DEFC)
                                    </h2>
                                    <div className="about-section-content">
                                        <p>
                                            In accordance with the Office of Management and Budget (OMB) <a href="https://www.whitehouse.gov/wp-content/uploads/2020/04/Implementation-Guidance-for-Supplemental-Funding-Provided-in-Response.pdf">Memorandum M-20-21</a>, <strong>COVID-19 supplemental appropriations are identified by a Disaster Emergency Fund Code (DEFC)</strong>. The COVID-19 Spending profile page download is pre-filtered to include only spending data associated with COVID-19 DEFC values. If you use the <a href="/#/download_center/custom_account_data">Custom Account Data</a> page to download Broker File C data, be sure to filter for rows with DEFC values ‘L’, ‘M’, ‘N’, ‘O’, and ‘P’ in the downloaded file.
                                        </p>
                                        <p>
                                            The relevant codes for COVID-19 response funding and their associated legislation are as follows:
                                        </p>
                                        <ul>
                                            <li>
                                                <strong>DEFC ‘L‘</strong>:
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
                                                <strong>DEFC ‘M‘</strong>:
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
                                                <strong>DEFC ‘N‘</strong>:
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
                                                <strong>DEFC ‘O‘</strong>:
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
                                                <strong>DEFC ‘P‘</strong>:
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
                                <div className="about-section-wrapper" id="data-sources-overview">
                                    <h2 className="about-section-title">
                                        Overview section
                                    </h2>
                                    <div className="about-section-content">
                                        <p>
                                            All calculations in this section can be recreated from the ‘Account Balances’ file in the COVID-19 Spending profile page download.
                                        </p>
                                        <p>
                                            <strong>Total Budgetary Resources</strong> calculation:
                                        </p>
                                        <ul>
                                            <li>
                                                Sum together these two elements:
                                                <ul>
                                                    <li>
                                                        Budget Authority Appropriated Amount for the latest accounting period (i.e., Current Period Ending, or CPE) for every Treasury Account Symbol (TAS) tagged with a COVID-19 DEFC value
                                                    </li>
                                                    <li>
                                                        Other Budgetary Resources Amount for the latest accounting period (i.e., Current Period Ending, or CPE) for every Treasury Account Symbol (TAS) tagged with a COVID-19 DEFC value
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
                                        Total Spending by Budget Category
                                    </h2>
                                    <div className="about-section-content">
                                        <p>
                                            All high-level, boxed calculations in this section can be recreated using the ‘Account Balances’ and ‘Account Breakdown’ files in the COVID-19 Spending profile page download. <strong>These four amounts remain constant regardless of any spending type selection in the dropdown</strong>.
                                        </p>
                                        <p>
                                            <strong>Number of Agencies</strong> calculation:
                                        </p>
                                        <ul>
                                            <li>
                                                In ‘Account Breakdown‘ file:
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
                                                In ‘Account Breakdown‘ file:
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
                                                In ‘Account Breakdown‘ file:
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
                                                In ‘Account Balances‘ file, sum together these two elements:
                                                <ul>
                                                    <li>
                                                        Budget Authority Appropriated Amount for the latest accounting period (i.e., Current Period Ending, or CPE) for every Treasury Account Symbol (TAS) tagged with a COVID-19 DEF Code
                                                    </li>
                                                    <li>
                                                        Other Budgetary Resources Amount for the latest accounting period (i.e., Current Period Ending, or CPE) for every Treasury Account Symbol (TAS) tagged with a COVID-19 DEF Code
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <p>
                                            <strong>Total Obligations</strong> calculation:
                                        </p>
                                        <ul>
                                            <li>
                                                In ‘Account Balances‘ file, sum together:
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
                                                In ‘Account Balances‘ file, sum together:
                                                <ul>
                                                    <li>
                                                        Gross Outlay Amount by Treasury Account Symbol (TAS) for the latest accounting period (i.e., Current Period Ending, or CPE) for every Treasury Account Symbol (TAS) tagged with a COVID-19 DEFC value
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="about-section-wrapper" id="data-sources-linked-and-unlinked">
                                    <h2 className="about-section-title">
                                        Linked and Unlinked Award Data
                                    </h2>
                                    <p>
                                        In order to understand the data surfaced in the ‘Award Spending’ sections (detailed below), it is important to understand the concept of <strong>linking between Broker File C and FPDS/FABS award data</strong>. Broker File C serves as a bridge between data sourced from agency financial systems (i.e., the data in Broker File C itself) and award data sourced from FPDS and FABS. The actual link between these two datasets is an <strong>award ID</strong> (also known as <strong>‘award unique key’</strong>). For various reasons, not every award ID in Broker File C has a corresponding award ID in FPDS or FABS data, which makes them unmatchable. If a Broker File C row cannot be matched to FPDS or FABS, we call it ‘unlinked’. Unlinked Broker File C data cannot be supplemented by metadata from FPDS or FABS (including recipient information, CFDA program, and funding agency).
                                    </p>
                                    <p>
                                        <strong>The rule of thumb for all award sections is to <em>use complete Broker File C data where possible</em> (containing both linked and unlinked awards); <em>where not possible, only linked data will be used</em> (representing a subset of the authoritative award spending total based on both linked and unlinked data in Broker File C).</strong>
                                    </p>
                                    <p>
                                        Note that even for sections that only display linked award data, <strong>Broker File C is always the basis for any obligated or outlayed dollar amount displayed for award data</strong>.
                                    </p>
                                    <p>
                                        As mentioned in the ‘Download Instructions’ section above, <strong>linked</strong> data is compiled in the COVID-19 Spending profile page download. For <strong>linked and unlinked</strong> data, use the <a href="/#/download_center/custom_account_data">Custom Account Data</a> page.
                                    </p>
                                </div>
                                <div className="about-section-wrapper" id="data-sources-award-spending">
                                    <h2 className="about-section-title">
                                        Award Spending
                                    </h2>
                                    <div className="about-section-content">
                                        <p>
                                            There are several sections devoted to Award Spending. Each ‘Award Spending’ section contains four high-level, boxed calculations. Unlike the ‘Total Spending by Budget Category’ section, these boxed calculations update based on filters chosen (here, award types).
                                        </p>
                                        <p>
                                            The first of these calculations is a count of an award attribute (such as the count of CFDA programs) that uses <strong>linked</strong> data. Records without an award ID (award unique key) that links across the two datasets will not be counted in these calculations.
                                        </p>
                                        <p>
                                            The remaining three calculations use <strong>linked</strong> data when a particular award type is selected (i.e., any selection besides ‘All Awards’). When ‘All Awards’ is selected, they draw on all Broker File C award data (i.e., <strong>linked and unlinked</strong> data) because no linked data points are required.
                                        </p>
                                        <p>
                                            Across all ‘Award Spending’ sections, <strong>the charts and tables below these four calculations all rely on linked data</strong>. We use linked data here because the award attributes displayed can only be found by linking the two datasets.
                                        </p>
                                        <p>
                                            The ‘Recipient Location’ tab is based on ‘Recipient Location’ data. There is currently no ‘Primary Place of Performance’ data used on the profile page, though it is available in the ‘Award Summaries’ files in the profile page download. Recipient Location is the legal business address of the recipient; Primary Place of Performance refers to where the work of an award is performed as determined by federal award reporting officers.
                                        </p>
                                        <p>
                                            Note that CFDA Programs apply only to financial assistance awards; the CFDA section of the profile page therefore excludes all contract data. If you are looking for CFDA information in the profile page download, see the ‘Assistance Prime Award Summaries’ file.
                                        </p>
                                        <p>
                                            <strong>Number of Recipients</strong> calculationsc:
                                        </p>
                                        <ul>
                                            <li>
                                                Count of unique recipients (by Recipient name) for every award ID (award unique key) tagged with a COVID-19 DEFC value. Filter by any award type as desired.
                                                <ul>
                                                    <li>
                                                        The count of recipients in this section represents the number of distinct recipient names in the dataset. Because some names are anonymized or indicate that the associated award was aggregated from many individual recipients/awards to protect personally identifiable information (PII), the true count of recipients is likely significantly higher. Names that indicate anonymized or aggregated recipients include: Multiple Recipients, Multiple Foreign Recipients, Miscellaneous Foreign Awardees, Private Individual, Individual Recipient, and Redacted Due to PII.
                                                    </li>
                                                    <li>
                                                        Note also that these are only direct recipients: often federal awards are given to state, local, or tribal governments and then further redistributed to individual citizens by those governments; in our dataset, only the award to the state, local, or tribal government is noted (though subgrants are tracked in some cases and can be viewed in the ‘Assistance Subawards’ download).
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
                                                        In contrast to the Number of Agencies in the ‘Total Spending by Budget Category’ section, this count of agencies uses only <strong>linked</strong> data (from FABS/FPDS) rather than <strong>linked and unlinked</strong> data (from Broker File C).
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
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}

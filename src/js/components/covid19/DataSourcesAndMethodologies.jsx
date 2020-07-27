/**
 * Created by Marco Mendoza
 * 07/23/2020
 */

import React from 'react';

import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'components/sharedComponents/header/Header';
import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';
import Footer from 'containers/Footer';
import { covidPageMetaTags } from 'helpers/metaTagHelper';

require('pages/about/aboutPage.scss');

export default class DataSourcesAndMethodologies extends React.Component {
    render() {
        return (
            <div className="usa-da-about-page">
                {/* TODO: Update these meta tags */}
                <MetaTags {...covidPageMetaTags} />
                <Header />
                <StickyHeader>
                    <div className="sticky-header__title">
                        <h1 tabIndex={-1} id="main-focus">
                            Data Sources and Methodologies
                        </h1>
                    </div>
                </StickyHeader>
                <main id="main-content" className="main-content">
                    <div className="about-content-wrapper">
                        <div className="about-content">
                            <div className="about-padded-content">
                                <div className="about-section-wrapper">
                                    <h2 className="about-section-title">
                                        Data Sets
                                    </h2>
                                    <div className="about-section-content">
                                        <p>
                                            The following list contains the data sources that power the displays and calculations on our COVID-19 Spending page and associated API endpoints. The first two datasets are directly submitted to USAspending by federal agencies; the rest are regularly pulled from external source systems. Data on the COVID-19 Spending page will generally be refreshed at the end of each month, with update adding the prior month’s activity.
                                        </p>
                                    </div>
                                    <h3 className="about-subtitle">
                                        DATA Act Broker Submission (DABS)
                                    </h3>
                                    <div className="about-section-content">
                                        <ul>
                                            <li>
                                                Responsible party: federal agency budget and financial reporting officers
                                            </li>
                                            <li>
                                                Frequency of updates: monthly
                                            </li>
                                            <li>
                                                Details:  DABS contains financial data sourced from agency financial systems. This information is submitted directly by federal agencies to the DATA Act Broker on a monthly basis and is packaged with related award and subaward data by the Broker and certified by a Senior Accountable Official. Directly-submitted financial data files cover: 1) Treasury Account Symbol (TAS) balances; 2) breakdowns of TAS-level spending by several dimensions; and 3) a further breakdown of the award component of that spending by each federal award. The latter two of these files are used on this page: Account Breakdown by Program Activity &amp; Object Class (File B) and Account Breakdown by Award (File C). DABS data is available in bulk from our Custom Account Download page.
                                            </li>
                                        </ul>
                                    </div>
                                    <h3 className="about-subtitle">
                                        Financial Assistance Broker Submission (FABS)
                                    </h3>
                                    <div className="about-section-content">
                                        <ul>
                                            <li>
                                                Responsible party: federal assistance officers
                                            </li>
                                            <li>
                                                Frequency of updates: twice monthly
                                            </li>
                                            <li>
                                                Details: FABS contains financial data sourced from agency financial assistance systems and focuses on federal financial assistance awards. This information is submitted directly by federal agencies to the DATA Act Broker twice a month. Data about financial assistance awards on the COVID-19 Spending profile page (except for obligation and outlay dollar amounts) is sourced from FABS.
                                            </li>
                                        </ul>
                                    </div>
                                    <h3 className="about-subtitle">
                                        Governmentwide Treasury Account Symbol Adjusted Trial Balance System (GTAS)
                                    </h3>
                                    <div className="about-section-content">
                                        <ul>
                                            <li>
                                                Responsible party: federal agency budget and financial reporting officers
                                            </li>
                                            <li>
                                                Frequency of updates: monthly
                                            </li>
                                            <li>
                                                Details: A data extract from GTAS is used to power the government-wide spending totals in the first two sections of the page (‘Overview’ and ‘Total Spending by Budget Category’). Certain DABS data is cross-validated against GTAS in the DABS submission process, including all of the Treasury Account Balance (File A) data.
                                            </li>
                                        </ul>
                                    </div>
                                    <h3 className="about-subtitle">
                                        Treasury Central Accounting Reporting System (CARS)
                                    </h3>
                                    <div className="about-section-content">
                                        <ul>
                                            <li>
                                                Responsible party: federal agency budget and financial reporting officers
                                            </li>
                                            <li>
                                                Frequency of updates: up to daily
                                            </li>
                                            <li>
                                                Details: CARS provides metadata concerning Treasury Accounts and Federal Accounts.
                                            </li>
                                        </ul>
                                    </div>
                                    <h3 className="about-subtitle">
                                        Federal Procurement Data System (FPDS)
                                    </h3>
                                    <div className="about-section-content">
                                        <ul>
                                            <li>
                                                Responsible party: federal procurement officers
                                            </li>
                                            <li>
                                                Frequency of updates: up to daily
                                            </li>
                                            <li>
                                                Details: FPDS is a government database for collecting contract data. Data about contract awards on the COVID-19 Spending profile page (except for obligation and outlay dollar amounts) is sourced from FPDS.
                                            </li>
                                        </ul>
                                    </div>
                                    <h3 className="about-subtitle">
                                        FFATA Subaward Reporting System (FSRS)
                                    </h3>
                                    <div className="about-section-content">
                                        <ul>
                                            <li>
                                                Responsible party: prime recipients of federal awards
                                            </li>
                                            <li>
                                                Frequency of updates: monthly
                                            </li>
                                            <li>
                                                Details: FSRS is a government database for collecting subcontract and subgrant information. It is not used in the COVID-19 Spending profile page’s display, but is used to add subaward information to the page’s download (specifically, all subawards associated with prime awards that were funded by COVID-19 supplemental appropriations).
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="about-section-wrapper">
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
                                                Account Breakdown (sourced from DABS File B)
                                            </li>
                                            <li>
                                                Contract Prime Award Summaries (sourced from FPDS with some derived fields compiled from File C; linked data only)
                                            </li>
                                            <li>
                                                Assistance Prime Award Summaries (sourced from FABS with several derived fields compiled from File C; linked data only)
                                            </li>
                                            <li>
                                                Contracts_Subawards (sourced from FSRS)
                                            </li>
                                            <li>
                                                Assistance_Subawards (sourced from FSRS)
                                            </li>
                                            <li>
                                                COVID-19_download_readme.txt
                                            </li>
                                            <li>
                                                Data_Dictionary_Crosswalk.xlsx
                                            </li>
                                        </ol>
                                        <p>
                                            This download covers all data that is used on the COVID-19 Spending profile page, with the exception of granular File C data, which is not directly included in the profile page download due to size considerations. While the Award Summary Files in the download will be sufficient for most users, the File C data has two main uses: 1) it provides access to the unlinked data used in award spending totals on this page (the Award Summary files in the download only contain linked data—see below for a discussion of linked and unlinked data); 2) it provides a higher degree of granularity in breaking down award spending by several financial data dimensions (including the specific amount each award was funded by each object class, program activity, disaster emergency fund code (DEFC), and treasury account). File C data can be downloaded from the Custom Account Data download page in the following manner:
                                        </p>
                                        <ul>
                                            <li>
                                                Go to the Custom Account Data download page
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
                                        </ul>
                                    </div>
                                </div>
                                <div className="about-section-wrapper">
                                    <h2 className="about-section-title">
                                        Disaster Emergency Fund Code (DEFC)
                                    </h2>
                                    <div className="about-section-content">
                                        <p>
                                            In accordance with the Office of Management and Budget (OMB) Memorandum M-20-21, COVID-19 supplemental appropriations are identified by a Disaster Emergency Fund Code (DEFC). The COVID-19 Spending profile page download is pre-filtered to include only spending data associated with COVID-19 DEFC values. If you use the Custom Account Data download for File C, be sure to filter for rows with DEFC values ‘L’, ‘M’, ‘N’, ‘O’, and ‘P’ in the downloaded file.
                                        </p>
                                        <p>
                                            The relevant codes for COVID-19 response funding and their associated legislation are as follows:
                                        </p>
                                        <ul>
                                            <li>
                                                DEF Code &quot;L&quot;:
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
                                                DEF Code &quot;M&quot;:
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
                                                DEF Code &quot;N&quot;:
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
                                                DEF Code &quot;O&quot;:
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
                                                DEF Code &quot;P&quot;:
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
                                <div className="about-section-wrapper">
                                    <h2 className="about-section-title">
                                        Note on Loan Spending
                                    </h2>
                                    <div className="about-section-content">
                                        <p>
                                            Loan Spending is more complicated than spending for other federal awards like contracts or grants. Loan spending has two components: 1) Face Value of Loans, which is the amount that agencies have directly issued (for direct loans) or facilitated (by compensating the lender if the borrower defaults for loan guarantees); and 2) Loan Subsidy Cost, which is the calculated net present value of the loan or loan guarantee to the government, taking into account the size of the loan (i.e., its face value), interest rate, and the modeled risk of the recipient failing to pay back the loan in part or full.
                                        </p>
                                        <p>
                                            From a budget perspective, Loan Face Value is not considered federal spending, since it does not in itself represent a long-term cost to the government. As a result, Loan Face Value amounts are not included in any Obligation or Outlay figure. However, Loan Subsidy Cost does have direct budgetary impact and is factored into Obligations and Outlays when it is positive. Subsidy costs can be positive (indicating that the government is likely to lose money on the loan) or negative (indicating that the government is likely to make money on the loan). Loan Subsidy Cost should never be larger in absolute value terms than the Face Value of Loans itself. Administrative costs of running the loan or loan guarantee program itself are excluded from Loan Subsidy Cost calculations.
                                        </p>
                                    </div>
                                </div>
                                <div className="about-section-wrapper">
                                    <h2 className="about-section-title">
                                        Overview section
                                    </h2>
                                    <div className="about-section-content">
                                        <p>
                                            All calculations in this section can be recreated from the ‘Account Balances’ file in the COVID-19 Spending profile page download.
                                        </p>
                                        <p>
                                            Total Budgetary Resources calculation:
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
                                            Total Unobligated Balance calculation:
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
                                            Total Obligations calculation:
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
                                            Total Outlays calculation:
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
                                <div className="about-section-wrapper">
                                    <h2 className="about-section-title">
                                        Total Spending by Budget Category section
                                    </h2>
                                    <div className="about-section-content">
                                        <p>
                                            All high-level, boxed calculations in this section can be recreated using the Account Balances and Account Breakdown files in the COVID-19 Spending profile page download. These four amounts remain constant regardless of any spending type selection in the dropdown.
                                        </p>
                                        <p>
                                            Number of Agencies calculation:
                                        </p>
                                        <ul>
                                            <li>
                                                In Account Breakdown file:
                                                <ul>
                                                    <li>
                                                        Count of distinct agencies as determined by Agency Identifier (AID) of all Treasury Account Symbol (TAS) tagged with a COVID-19 DEFC value
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <p>
                                            Number of Federal Accounts calculation:
                                        </p>
                                        <ul>
                                            <li>
                                                In Account Breakdown file:
                                                <ul>
                                                    <li>
                                                        Count of distinct Federal Accounts of all Treasury Account Symbol (TAS) tagged with a COVID-19 DEFC value
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <p>
                                            Number of Object Classes calculation:
                                        </p>
                                        <ul>
                                            <li>
                                                In Account Breakdown file:
                                                <ul>
                                                    <li>
                                                        Count of distinct Object Classes of all Treasury Account Symbol (TAS) tagged with a COVID-19 DEFC value
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <p>
                                            Total Budgetary Resources calculation:
                                        </p>
                                        <ul>
                                            <li>
                                                In Account Balances file, sum together:
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
                                            Total Obligations calculation:
                                        </p>
                                        <ul>
                                            <li>
                                                In Account Balances file, sum together:
                                                <ul>
                                                    <li>
                                                        Obligations Incurred by Program Object Class for the latest accounting period (i.e., Current Period Ending, or CPE) for every TAS tagged with a COVID-19 DEF Code
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <p>
                                            Total Outlays calculations:
                                        </p>
                                        <ul>
                                            <li>
                                                In Account Balances file, sum together:
                                                <ul>
                                                    <li>
                                                        Gross Outlay Amount by Program Object Class for the latest accounting period (i.e., Current Period Ending, or CPE) for every TAS tagged with a COVID-19 DEF Code
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="about-section-wrapper">
                                    <h2 className="about-section-title">
                                        Award Spending sections
                                    </h2>
                                    <div className="about-section-content">
                                        <p>
                                            There are several sections devoted to Award Spending.
                                        </p>
                                        <p>
                                            In order to understand the data surfaced in these sections, it is important to understand the concept of linking between File C and FPDS/FABS data. File C serves as a bridge between data sourced from agency financial systems (i.e., the data in File C itself) and award data sourced from FPDS and FABS. The actual link between these two data sets is a common award ID. For various reasons, not every award ID in file C has a corresponding award ID in FPDS or FABS data, which makes them unmatchable. If a File C row cannot be matched to FPDS or FABS, we call it ‘unlinked’. ‘Unlinked’ File C data cannot be supplemented by metadata from FPDS or FABS (including recipient information, CFDA, and funding agency).
                                        </p>
                                        <p>
                                            The rule of thumb for all award sections is to use complete File C data where possible (containing both linked and unlinked awards); where not possible, only linked data will be used (representing a subset of the authoritative award spending total based on both linked and unlinked data in File C).
                                        </p>
                                        <p>
                                            Note that even for sections that only display linked award data, File C is always the basis for any obligated or outlayed dollar amount displayed for award data.
                                        </p>
                                        <p>
                                            Each award spending section on this page contains four high-level, boxed calculations. Unlike the previous section, these boxed calculations update based on filters chosen (here, award types).
                                        </p>
                                        <p>
                                            The first of these calculations is a count of an award attribute (such as the count of CFDA programs) that uses linked data. Records without an Award ID that links across the two data sets will not be counted in these calculations.
                                        </p>
                                        <p>
                                            The remaining three calculations use linked data when a particular award type is selected (i.e., any selection besides ‘All Awards’). When ‘All Awards’ is selected, they draw on all File C award data (i.e., linked and unlinked data) because no linked data points are required; to recreate the ‘All Awards’ calculations, you will need to download the Custom Account Data ‘Account Breakdown by Award’ (File C) data as described above.
                                        </p>
                                        <p>
                                            Across all Award Spending sections, the charts and tables below these four calculations all rely on linked data. We use linked data here because the award attributes displayed can only be found by linking the two data sets.
                                        </p>
                                        <p>
                                            The Recipient Location tab is based on Recipient Location data. There is currently no Primary Place of Performance data used on this page, though it is available in the ‘Award Summary’ files in the profile page download. Recipient location is the legal business address of the recipient; Primary Place of Performance refers to where the work of an award is performed as determined by federal award reporting officers.
                                        </p>
                                        <p>
                                            Note that CFDA Programs apply only to financial assistance awards; the CFDA section of the page therefore excludes all contract data. If you are looking for CFDA information in the profile page download, see the Assistance Award Summary file.
                                        </p>
                                        <p>
                                            Number of Recipients calculation:
                                        </p>
                                        <ul>
                                            <li>
                                                Count of unique recipients (by Recipient name)
                                                <ul>
                                                    <li>
                                                        The count of recipients in this section represents the number of distinct recipient names in the data set. Because some of these names are anonymized or indicate that the associated award was aggregated from many individual recipients/awards to protect personally identifiable information (PII), the true count of recipients is likely significantly higher. Names that indicate anonymized or aggregated recipients include: Multiple Recipients, Multiple Foreign Recipients, Miscellaneous Foreign Awardees, Private Individual, Individual Recipient, and Redacted Due to PII.
                                                    </li>
                                                    <li>
                                                        Note also that these are only direct recipients: often federal awards are provided to state, local, or tribal governments and then further redistributed to individual citizens by those governments; in our dataset, only the award to the state, local, or tribal government is noted (though subgrants are tracked in some cases and can be viewed in the Assistance Subaward download).
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <p>
                                            Number of Agencies calculation:
                                        </p>
                                        <ul>
                                            <li>
                                                Count of unique agencies based on Funding Agency Code in the FABS and FPDS data for all awards tagged with a COVID-19 DEFC value
                                                <ul>
                                                    <li>
                                                        In contrast to the Number of Agencies in the ‘Total Spending by Budget Category’ section, this count of agencies uses linked data (from FABS/FPDS) rather than unlinked data (from File C)
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <p>
                                            Number of CFDA Programs calculation:
                                        </p>
                                        <ul>
                                            <li>
                                                Count of all distinct CFDA Programs (number or title) for every TAS tagged with a COVID-19 DEF Code. Filter by any Award Type as desired.
                                            </li>
                                        </ul>
                                        <p>
                                            Award Obligations calculations (using File C data in Custom Account Data download):
                                        </p>
                                        <ul>
                                            <li>
                                                For Award Spending, sum together:
                                                <ul>
                                                    <li>
                                                        Transaction Obligated Amount (TOA) for every TAS tagged with a COVID-19 DEFC. There may be several TOA for any given Award ID.
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                For Loan Spending (or any other Award Type), filter by ‘Loan’ (or any other desired Award Type) and sum together:
                                                <ul>
                                                    <li>
                                                        Transaction Obligated Amount (TOA) for every TAS tagged with a COVID-19 DEFC. There may be several TOA for any given Award ID.
                                                    </li>
                                                    <li>
                                                        See <a href="#">Note on Loan Spending</a> above
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <p>
                                            Award Outlays calculations (using File C data in Custom Account Data download):
                                        </p>
                                        <ul>
                                            <li>
                                                For Award Spending, sum together:
                                                <ul>
                                                    <li>
                                                        Gross Outlay Amount by Award for the latest accounting period (i.e., Current Period Ending, or CPE) for every TAS tagged with a COVID-19 DEF Code.
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                For Loan Spending (or any other Award Type), filter by ‘Loan’ (or any other desired Award Type) and sum together:
                                                <ul>
                                                    <li>
                                                        Gross Outlay Amount by Award for the latest accounting period (i.e., Current Period Ending, or CPE) for every TAS tagged with a COVID-19 DEF Code.
                                                    </li>
                                                    <li>
                                                        See <a href="#">Note on Loan Spending</a> above
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <p>
                                            Number of Awards calculation:
                                        </p>
                                        <ul>
                                            <li>
                                                Count of all distinct Award IDs for every TAS tagged with a COVID-19 DEF Code. Filter by any Award Type as desired.
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

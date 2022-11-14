/**
 * Created by Marco Mendoza
 * 07/23/2020
 */

import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { uniqueId } from 'lodash';
import { ShareIcon } from 'data-transparency-ui';

import { covidDataSourcesMetaTags } from 'helpers/metaTagHelper';
import { stickyHeaderHeight } from 'dataMapping/stickyHeader/stickyHeader';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';
import { dataDisclaimerHeight } from 'dataMapping/covid19/covid19';
import { getStickyBreakPointForSidebar, useDynamicStickyClass } from 'helpers/stickyHeaderHelper';
import {
    getStickyBreakPointForCovidBanner,
    createJumpToSectionForSidebar
} from 'helpers/covid19Helper';

import { useDefCodes } from 'containers/covid19/WithDefCodes';
import Sidebar from 'components/sharedComponents/sidebar/Sidebar';
import PageWrapper from 'components/sharedComponents/PageWrapper';
import ExternalLink from 'components/sharedComponents/ExternalLink';

const getEmailSocialShareData = {
    subject: "COVID-19 Spending: Data Sources and Methodology",
    body: "View COVID-19 Spending: Data Sources and Methodology on USAspending.gov: https://www.usaspending.gov/disaster/covid-19/data-sources"
};

const sections = [
    {
        label: 'What COVID-19 spending does USAspending track?',
        section: 'covered_funds'
    },
    {
        label: 'Datasets',
        section: 'datasets'
    },
    {
        label: 'Download Instructions',
        section: 'download_instructions'
    },
    {
        label: 'Disaster Emergency Fund Code (DEFC)',
        section: 'defc'
    },
    {
        label: 'Loan Spending',
        section: 'loan_spending'
    },
    {
        label: 'Overview Section',
        section: 'overview'
    },
    {
        label: 'Total Spending Section',
        section: 'total_spending'
    },
    {
        label: 'Linked and Unlinked Award Data',
        section: 'linked_and_unlinked'
    },
    {
        label: 'Award Spending Sections',
        section: 'award_spending'
    }
];

require('pages/data-sources/index.scss');

const getDefCValues = (errorMsg, isLoading, codes) => {
    if (isLoading) return "Loading...";
    if (errorMsg) return "There was an error fetching DEFC values";

    return (
        <span>
            {codes
                .reduce((acc, c, i, arr) => {
                    const isLast = i === arr.length - 1;
                    if (isLast) {
                        return `${acc} and "${c.code}"`;
                    }
                    return `${acc}"${c.code}", `;
                }, '')}
        </span>
    );
};

const renderDefCodes = (errorMsg, isLoading, codes) => {
    if (isLoading) {
        return <li>Loading...</li>;
    }
    if (errorMsg) {
        return <li>There was an error fetching DEFC values.</li>;
    }
    return codes
        .map(({ code, public_law: pl, title }) => (
            <li key={uniqueId()}>
                <strong>DEFC &quot;{code}&quot;</strong>:
                <ul>
                    <li key={uniqueId()}>
                        {pl.includes('Non-emergency') ? "Not designated as emergency" : "Designated as emergency"}
                    </li>
                    {pl
                        .split("|")
                        .map((str, i) => (
                            <li key={uniqueId()}>{str}, {title.split("|")[i]}</li>
                        ))
                    }
                </ul>
            </li>
        ));
};

const jumpToSection = createJumpToSectionForSidebar("data-sources", sections.reduce((acc, obj) => ({
    ...acc,
    [obj.section]: { title: obj.label }
}), {}));

export default () => {
    const [errorMsg, isLoading, defCodes] = useDefCodes();
    const [activeSection, setActiveSection] = useState(sections[0].section);
    const dataDisclaimerBannerRef = useRef(null);
    const [dataDisclaimerBanner, setDataDisclaimerBanner] = useState(Cookies.get('usaspending_data_disclaimer'));
    const [isBannerSticky, , , setBannerStickyOnScroll] = useDynamicStickyClass(dataDisclaimerBannerRef, getStickyBreakPointForCovidBanner(Cookies.get('usaspending_covid_homepage')));
    const [covidDefCodes, setCovidDefCodes] = useState();

    useEffect(() => {
        setCovidDefCodes(defCodes.filter((c) => c.disaster === 'covid_19'));
    }, [defCodes]);

    useEffect(() => {
        window.addEventListener('scroll', setBannerStickyOnScroll);
        return () => {
            window.removeEventListener('scroll', setBannerStickyOnScroll);
        };
    });

    const handleCloseBanner = () => {
        Cookies.set('usaspending_data_disclaimer', 'hide', { expires: 7 });
        setDataDisclaimerBanner('hide');
    };

    const jumpToDataSourcesSection = (section) => {
        // we've been provided a section to jump to
        // check if it's a valid section
        const matchedSection = sections.find((obj) => obj.section === section);
        jumpToSection(section);
        setActiveSection(matchedSection.section);
    };

    const handleShare = (name) => {
        handleShareOptionClick(name, "disaster/covid-19/data-sources", getEmailSocialShareData);
    };

    return (
        <PageWrapper
            pageName="COVID DS&M"
            classNames="usa-da-dsm-page"
            ref={dataDisclaimerBannerRef}
            overLine="Data Sources &amp; Methodology"
            title="COVID-19 Spending"
            metaTagProps={covidDataSourcesMetaTags}
            toolBarComponents={[
                <ShareIcon
                    onShareOptionClick={handleShare}
                    url={getBaseUrl("disaster/covid-19/data-sources")} />
            ]}>
            <>
                {dataDisclaimerBanner !== 'hide' && (
                    <div className={`info-banner data-disclaimer${isBannerSticky ? ' sticky-banner' : ''}`}>
                        <div className="info-top" />
                        <div className="info-banner__content">
                            <div className="info-banner__content--title">
                                <FontAwesomeIcon size="lg" icon="exclamation-triangle" color="#FDB81E" />
                                <h2>Known Data Limitations</h2>
                                <FontAwesomeIcon onClick={handleCloseBanner} size="lg" icon="times" color="black" />
                            </div>
                            <p>
                                USAspending is working with federal agencies to address known limitations in COVID-19 spending data. See <a target="_blank" href="data/data-limitations.pdf" rel="noopener noreferrer">a full description</a> of this issue.
                            </p>
                        </div>
                    </div>
                )}
                <main id="main-content" className="main-content">
                    <div className={`sidebar usda__flex-col${dataDisclaimerBanner !== 'hide' ? ' covid-sidebar-banner' : ''}`}>
                        <Sidebar
                            isGoingToBeSticky
                            pageName="data-sources"
                            fixedStickyBreakpoint={getStickyBreakPointForSidebar()}
                            verticalSectionOffset={dataDisclaimerBanner === 'hide'
                                ? stickyHeaderHeight
                                : stickyHeaderHeight + dataDisclaimerHeight}
                            active={activeSection}
                            jumpToSection={jumpToDataSourcesSection}
                            detectActiveSection={setActiveSection}
                            sections={sections} />
                    </div>
                    <div className="about-content-wrapper">
                        <div className="about-content">
                            <div className="about-padded-content">
                                <div className="about-section-wrapper" id="data-sources-covered_funds">
                                    <div className="back-link">
                                        <Link
                                            to="/disaster/covid-19"
                                            rel="noopener noreferrer">
                                            <FontAwesomeIcon icon="arrow-left" />
                                            Back to the COVID-19 Spending profile
                                        </Link>
                                    </div>
                                    <h2 className="about-section-title">
                                        What COVID-19 spending does USAspending track?
                                    </h2>
                                    <div className="about-section-content">
                                        <p>
                                            Congress introduced and defined the concept of &quot;covered funds&quot; in the
                                            CARES Act to make it clear which supplemental appropriation spending related to
                                            the coronavirus response they wanted to be tracked, audited, and published for
                                            transparency and accountability purposes. The act (as amended) defines covered funds
                                            as follows:
                                        </p>
                                        <ul className="about-section-content_custom-list">
                                            <li>
                                                (6) the term &quot;covered funds&quot; means any funds, including loans, that are made available in any form to any non-Federal entity, not including an individual, under&mdash;
                                                <ul className="about-section-content_custom-list">
                                                    <li>
                                                        (A) the Coronavirus Aid, Relief, and Economic Security Act (divisions A and B);
                                                    </li>
                                                    <li>
                                                        (B) the Coronavirus Preparedness and Response Supplemental Appropriations Act, 2020 (Public Law 116–123);
                                                    </li>
                                                    <li>
                                                        (C) the Families First Coronavirus Response Act (Public Law 116–127);
                                                    </li>
                                                    <li>
                                                        (D) the Paycheck Protection Program and Health Care Enhancement Act (Public Law 116–139); or
                                                    </li>
                                                    <li>
                                                        (E) divisions M and N of the Consolidated Appropriations Act, 2021;
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <p>
                                            Given the above, OMB centered their guidance in M-20-21 on the covered funds concept and elected to use
                                            the DEFC as the means to track these covered funds in USAspending. New DEFC (see below) were issued to
                                            track each component of covered funds, consistent with the original and continued purpose of the DEFC to
                                            track <em>Disaster</em>, <em>Emergency</em>, and <em>Wildfire Suppression </em>spending under BBEDCA; covered funds that fell outside
                                            of the BBEDCA categories (and the specific statutory language that triggers their use) were captured in a&nbsp;
                                            <em>Non-emergency</em> DEFC, O.
                                        </p>
                                        <p>
                                            One result of the covered funds concept and M-20-21 is that some spending that is clearly associated with the coronavirus response is not
                                            tracked as &#8216;COVID-19 spending&#8217; on our site. Examples include:
                                        </p>
                                        <ol>
                                            <li>
                                                Any spending funded from general appropriations (rather than the supplemental appropriations that constitute &quot;covered funds&quot;). Examples
                                                include any contracts with a National Interest Action code (NIA) of &quot;P20C&quot; (indicating a COVID-19 related purpose) that are funded by
                                                general appropriations only and not &#8216;covered funds&#8217; and that therefore do not appear on this page. The NIA is assigned by contracting officers
                                                based on spending purpose and has nothing to do with funding; in contrast, the CARES Act and M-20-21 are concerned with tracking spending
                                                from specific funding sources and not based on purpose alone. The NIA has no direct bearing on whether a contract is considered &#8216;COVID-19 spending&#8217;
                                                on our site.
                                            </li>
                                            <li>
                                                Any spending from entities that were appropriated covered funds from Congress but that do not report to USAspending under the DATA Act. M-20-21 was an expansion
                                                of existing DATA Act reporting requirements but did not change the population of federal agencies or other entities subject to those requirements. Examples include
                                                any component of the legislative and judicial branches (though GAO does voluntarily report).
                                            </li>
                                            <li>
                                                Any spending from the Consolidated Appropriations Act, 2021 (PL 116-260) outside of Division M and N. Per the covered funds definition, Congress only
                                                intended these two divisions to be tracked under the requirements of the CARES Act. An example that is arguably &#8216;coronavirus-related&#8217;; but is not
                                                tracked and displayed as such on USAspending is the $635,000,000 appropriated in Division A &quot;for necessary expenses for salary and related costs associated
                                                with Agriculture Quarantine and Inspection Services [...] to offset the loss resulting from the coronavirus pandemic of quarantine and inspection fees.&quot;
                                            </li>
                                        </ol>
                                    </div>
                                </div>
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
                                <div className="about-section-wrapper" id="data-sources-download_instructions">
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
                                            <li>
                                                Filter for rows with DEFC values {getDefCValues(errorMsg, isLoading, covidDefCodes)} in the downloaded file
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                                <div className="about-section-wrapper" id="data-sources-defc">
                                    <h2 className="about-section-title">
                                        Disaster Emergency Fund Code (DEFC)
                                    </h2>
                                    <div className="about-section-content">
                                        <p>
                                            In accordance with the Office of Management and Budget (OMB)
                                            <ExternalLink
                                                url="https://www.whitehouse.gov/wp-content/uploads/2020/04/Implementation-Guidance-for-Supplemental-Funding-Provided-in-Response.pdf">
                                                Memorandum M-20-21
                                            </ExternalLink>, <strong>COVID-19 supplemental appropriations are identified by a Disaster Emergency Fund Code (DEFC)</strong>. The COVID-19 Spending profile page download is pre-filtered to include only spending data associated with COVID-19 DEFC values. If you use the <Link to="/download_center/custom_account_data">Custom Account Data</Link> page to download Broker File C data, be sure to filter for rows with DEFC values {getDefCValues(errorMsg, isLoading, covidDefCodes)} in the downloaded file.
                                        </p>
                                        <p>
                                            Note that the <strong>National Interest Action (NIA)</strong> code is also used to track COVID-19 spending. However, it only applies to procurement actions (i.e., contracts) and is not necessarily tied to COVID-19 supplemental appropriations. Thus, awards with the COVID-19 NIA value may not have a COVID-19 DEFC value, and vice versa.
                                        </p>
                                        <p>
                                            The relevant codes for COVID-19 response funding and their associated legislation are as follows:
                                        </p>
                                        <ul>
                                            {renderDefCodes(errorMsg, isLoading, covidDefCodes)}
                                        </ul>
                                    </div>
                                </div>
                                <div className="about-section-wrapper" id="data-sources-loan_spending">
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
                                        Overview Section
                                    </h2>
                                    <div className="about-section-content">
                                        <p>
                                            All calculations in this section can be recreated from the “Disaster and Emergency Funding Tracking SF-133 Report on Budget Execution & Budgetary Resources” Files on
                                            <ExternalLink url="https://portal.max.gov/portal/document/SF133/Budget/FACTS II - SF 133 Report on Budget Execution and Budgetary Resources.html">this</ExternalLink>
                                            page.
                                        </p>
                                        <p>
                                            <strong>Total Budgetary Resources</strong> calculation:
                                        </p>
                                        <ul>
                                            <li>
                                                Locate the Disaster and Emergency Funding Tracking SF-133 Report on Budget Execution & Budgetary Resources on
                                                <ExternalLink url="https://portal.max.gov/portal/document/SF133/Budget/FACTS II - SF 133 Report on Budget Execution and Budgetary Resources.html">this</ExternalLink>
                                                page for all Fiscal Years back to FY20
                                            </li>
                                            <li>
                                                Calculate SUM[Total Budgetary Resources – (Unobligated Balance Brought Forward + Adjustment to Unobligated Balance Brought Forward + Recoveries of Prior Year Unpaid Obligations + Recoveries of Prior Year Paid Obligations + Anticipated Recoveries of Prior Year Unpaid and Paid Obligations)]
                                            </li>
                                            <li>
                                                The calculation mapped to the Line Items in the SF-133 is:
                                                <ul>
                                                    <li>
                                                        SUM[1910 – (1000 + 1020 + 1021 + 1033 + 1061)]
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                Note: SUM[] should be read as “the sum of this calculation for COVID-19 DEFC across P12 of every closed fiscal year back to FY20, plus the sum of this calculation for COVID-19 DEFC from the latest accounting period of the current fiscal year
                                            </li>
                                        </ul>
                                        <p>
                                            <strong>Total Remaining Balance</strong> calculation:
                                        </p>
                                        <ul>
                                            <li>
                                                Total Budgetary Resources – Total Obligations
                                            </li>
                                            <li>
                                                The calculation mapped to the Line Items in the SF-133 is:
                                                <ul>
                                                    <li>
                                                        SUM[1910 – (1000 + 1020 + 1021 + 1033 + 1061)] - SUM[2190 – (1020 + 1021 + 1033)]
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <p>
                                            <strong>Total Obligations</strong> calculation:
                                        </p>
                                        <ul>
                                            <li>
                                                Locate the Disaster and Emergency Funding Tracking SF-133 Report on Budget Execution & Budgetary Resources on
                                                <ExternalLink url="https://portal.max.gov/portal/document/SF133/Budget/FACTS II - SF 133 Report on Budget Execution and Budgetary Resources.html">this</ExternalLink>
                                                page for all Fiscal Years back to FY20
                                            </li>
                                            <li>
                                                SUM[New Obligations and Upward Adjustments – (Adjustment to Unobligated Balance Brought Forward + Recoveries of Prior Year Unpaid Obligations + Recoveries of Prior Year Paid Obligations)]
                                            </li>
                                            <li>
                                                The calculation mapped to the Line Items in the SF-133 is:
                                                <ul>
                                                    <li>
                                                        SUM[2190 – (1020 + 1021 + 1033)]
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                Note: SUM[] should be read as “the sum of this calculation for COVID-19 DEFC across P12 of every closed fiscal year back to FY20, plus the sum of this calculation for COVID-19 DEFC from the latest accounting period of the current fiscal year.
                                            </li>
                                        </ul>
                                        <p>
                                            <strong>Total Outlays</strong> calculation:
                                        </p>
                                        <ul>
                                            <li>
                                                Locate the Disaster and Emergency Funding Tracking SF-133 Report on Budget Execution & Budgetary Resources on
                                                <ExternalLink url="https://portal.max.gov/portal/document/SF133/Budget/FACTS II - SF 133 Report on Budget Execution and Budgetary Resources.html">this</ExternalLink>
                                                page for all Fiscal Years back to FY20
                                            </li>
                                            <li>
                                                SUM[Gross Outlays + Recoveries of Prior Year Paid Obligations ]
                                            </li>
                                            <li>
                                                The calculation mapped to the Line Items in the SF-133 is:
                                                <ul>
                                                    <li>
                                                        SUM[3020 + 1033]
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                Note: SUM[] should be read as “the sum of this calculation for COVID-19 DEFC across P12 of every closed fiscal year back to FY20, plus the sum of this calculation for COVID-19 DEFC from the latest accounting period of the current fiscal year.”
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="about-section-wrapper" id="data-sources-total_spending">
                                    <h2 className="about-section-title">
                                        Total Spending Section
                                    </h2>
                                    <div className="about-section-content">
                                        <p>
                                            All high-level, boxed calculations in this section can be recreated using the &quot;Disaster and Emergency Funding Tracking SF-133 Report on Budget Execution & Budgetary Resources&quot; Files on
                                            <ExternalLink url="https://portal.max.gov/portal/document/SF133/Budget/FACTS II - SF 133 Report on Budget Execution and Budgetary Resources.html">this</ExternalLink>
                                            page and the &quot;Account Breakdown&quot; files in the COVID-19 Spending profile page download. <strong>These four amounts remain constant regardless of any spending type selection in the dropdown.</strong>
                                        </p>
                                        <p>When the “Total Spending” dropdown is selected in this section, you will see a row for “unreported” data as the last row of the table. The “unreported” data row displays the difference between the high-level, boxed figure above the table versus the sum of all the rows in the table itself. The reason why a difference exists between the high-level figure and the sum of the table rows is because these data come from different systems with different reporting requirements, timing, and practical execution by submitting agencies. As mentioned at the beginning of this section, the high-level figures come from SF-133, whereas the table rows come from agency-submitted data to USAspending.gov (specifically File B).</p>
                                        <p>
                                            <strong>Number of Agencies</strong> calculation:
                                        </p>
                                        <ul>
                                            <li>
                                                In &quot;Account Breakdown&quot; file:
                                                <ul>
                                                    <li>
                                                        Count of distinct agencies as determined by Agency Identifier (AID)
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
                                                        Count of distinct Federal Accounts
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
                                                        Count of distinct Object Classes
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <p>
                                            <strong>Total Budgetary Resources, Total Obligations, and Total Outlays calculations:</strong>
                                        </p>
                                        <ul>
                                            <li>
                                                Refer to the calculations in the “Overview Section” above; these amounts are calculated in the exact same way as in that section.
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="about-section-wrapper" id="data-sources-linked_and_unlinked">
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
                                            As mentioned in the &quot;Download Instructions&quot; section above, <strong>linked</strong> data is compiled in the COVID-19 Spending profile page download. For <strong>linked and unlinked</strong> data, use the <Link to="/download_center/custom_account_data">Custom Account Data</Link> page.
                                        </p>
                                    </div>
                                </div>
                                <div className="about-section-wrapper" id="data-sources-award_spending">
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
                                                        Outlayed Amount Funded by COVID-19 Supplementals for every award ID (award unique key) tagged with a COVID-19 DEFC [for Linked Awards only].
                                                    </li>
                                                    <li>
                                                        Gross Outlay Amount, Downward Adjustments of Prior Year Prepaid Advanced Undelivered Orders and Obligation Refunds Collected, and Downward Adjustments of Prior Year Paid Delivered Orders and Obligations Refunds Collected for every award ID (award unique key) tagged with a COVID-19 DEFC [for Linked and Unlinked Awards].
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
            </>
        </PageWrapper>
    );
};

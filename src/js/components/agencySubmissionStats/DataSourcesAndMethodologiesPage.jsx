/**
 * Created by Max Kendall
 * 02/18/2021
 */

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { find, throttle } from 'lodash';
import { useQueryParams, combineQueryParams, getQueryParamString } from 'helpers/queryParams';
import { ShareIcon } from 'data-transparency-ui';
import { agencySubmissionDataSourcesMetaTags } from 'helpers/metaTagHelper';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';
import PageWrapper from 'components/sharedComponents/PageWrapper';
import { stickyHeaderHeight } from 'dataMapping/stickyHeader/stickyHeader';
import { getStickyBreakPointForSidebar } from 'helpers/stickyHeaderHelper';

require('pages/data-sources/index.scss');

const emailData = {
    subject: "Agency Submission Statistics: Data Sources and Methodology",
    body: "View Agency Submission Statistics: Data Sources and Methodology on USAspending.gov: https://www.usaspending.gov/submission-statistics/data-sources"
};

const DataSourcesAndMethodologiesPage = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [activeSection, setActiveSection] = useState('using_this_table');
    const query = useQueryParams();
    const history = useNavigate();
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
    const handleShare = (name) => {
        handleShareOptionClick(name, `submission-statistics/data-sources`, emailData);
    };
    const jumpToSection = (section = '') => {
        // we've been provided a section to jump to
        // check if it's a valid section
        const sectionObj = find(sections, ['section', section]);
        if (!sectionObj) return;

        // find the section in dom
        const sectionDom = document.querySelector(`#submissions-statistics-dsm-${sectionObj.section}`);
        if (!sectionDom) return;

        // add section to url
        const newQueryParams = combineQueryParams(query, { section: `${section}` });
        history({
            path: `${getQueryParamString(newQueryParams)}`
        }, { replace: true });

        setActiveSection(section);
        // add offsets
        const conditionalOffset = window.scrollY < getStickyBreakPointForSidebar() ? stickyHeaderHeight + 40 : 10;
        const sectionTop = (sectionDom.offsetTop - stickyHeaderHeight - conditionalOffset);

        window.scrollTo({
            top: sectionTop - 25,
            left: 0,
            behavior: 'smooth'
        });
    };
    useEffect(() => {
        if (query.section) {
            jumpToSection(query.section);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query.section]);
    useEffect(throttle(() => {
        // prevents a console error about react unmounted component leak
        let isMounted = true;
        if (isMounted) {
            const urlSection = query.section;
            if (urlSection) {
                setActiveSection(urlSection);
                jumpToSection(urlSection);
            }
        }
        return () => {
            isMounted = false;
        };
    }, 100), [history, query.section]);
    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);


    return (
        <PageWrapper
            pageName="submissions-statistics-dsm"
            overLine="Data Sources and Methodology"
            title="Agency Submissions Statistics"
            classNames="usa-da-dsm-page"
            metaTagProps={agencySubmissionDataSourcesMetaTags}
            toolBarComponents={[
                <ShareIcon
                    url={getBaseUrl('submission-statistics')}
                    onShareOptionClick={handleShare} />
            ]}
            sections={sections}
            activeSection={activeSection}
            jumpToSection={jumpToSection}
            inPageNav>
            <main id="main-content" className="main-content">
                <div className="about-content-wrapper">
                    <div className="about-content">
                        <div className="about-padded-content">
                            <section className="about-section-wrapper" key="submissions-statistics-dsm-using_this_table" id="submissions-statistics-dsm-using_this_table">
                                <div className="back-link">
                                    <Link
                                        to="/submission-statistics"
                                        rel="noopener noreferrer">
                                        <FontAwesomeIcon icon="arrow-left" />
                                        Back to the Agency Submission Statistics Table
                                    </Link>
                                </div>
                                <h2 className="about-section-title">Using this Table</h2>
                                <div className="about-section-content">
                                    <p>
                                        The USAspending.gov team created the submissions statistics table in response to user feedback requesting greater transparency into the completeness of agency data available on the site. The table provides information on the timing and content of agency data submissions per the Digital Accountability and Transparency Act of 2014 (DATA Act) requirements. This table only represents data since the DATA Act reporting requirements began in FY17Q2.
                                    </p>
                                    <h3 className="about-subtitle">
                                        Owning versus Reporting Agencies
                                    </h3>
                                    <p>
                                        For various reasons, agencies sometimes submit financial data covering Treasury Account Symbols (TAS) they do not own. Numeric figures in this table are calculated based on the set of TAS owned by each agency, as opposed to the set of TAS that the agency directly reported to USAspending.gov. In the vast majority of cases, these are exactly the same (upwards of 95% of TAS—with these TAS representing over 99% of spending—are submitted and owned by the same agency). This display decision is consistent with our practice throughout the website of grouping TAS by owning agency rather than the reporting agency. While reporting agencies are not identified in this table, they are available in the Custom Account Download in the reporting_agency_name field.
                                    </p>
                                    <p>
                                        Note that this means when you see a reference to a file (e.g., “File A”), the reference is to the dataset produced from files of that type and not necessarily to that agency’s specific file submission. For example, the USDA value in the “Reporting Difference in Obligations” column compares obligations associated with USDA-owned TASs found in any agency’s File A with those found in any agency’s File B (not just USDA’s File A and File B).  Note also that by “File D1” and “File D2” specifically, we mean the up-to-date set of procurement and assistance data (respectively) that pertains to the agency and relevant submission period, not the award data as it existed at the time of the financial data submission.
                                    </p>
                                </div>
                            </section>
                            <section className="about-section-wrapper" key="submissions-statistics-dsm-percent_of_total" id="submissions-statistics-dsm-percent_of_total">
                                <h2 className="about-section-title">Percent of Total Federal Budget</h2>
                                <div className="about-section-content">
                                    <p>
                                        This column shows what percent of the total federal budget the agency’s spending is for the selected fiscal year. This gives users context for the relative size of each agency’s spending.
                                    </p>
                                    <p>
                                        It should be noted that Treasury’s percentage may be larger than expected; this is because a significant portion of budgetary resources associated with Treasury TASs (e.g., those for interest paid on the national debt, tax refunds, and tax credits) are often separated from Treasury’s budget in other publications. For most years, excluding such spending would shrink Treasury’s share of the federal budget below other agencies’.
                                    </p>
                                    <p><strong>Calculation:</strong></p>
                                    <p>
                                        The percentages are based on the total budgetary resources for all TAS submitted in File A that matches the Agency Identifier (AID) divided by the total budgetary resources reported in GTAS (Line 1910 of the SF-133).
                                    </p>
                                </div>
                            </section>
                            <section className="about-section-wrapper" key="submissions-statistics-dsm-most_recent_update" id="submissions-statistics-dsm-most_recent_update">
                                <h2 className="about-section-title">Most Recent Update</h2>
                                <div className="about-section-content">
                                    <p>
                                        This column shows the most recent date on which the agency reported financial data to USAspending.gov for the selected submission period. The column shows “—” for agencies that did not submit or have not yet submitted data for that period. For example, if an agency submits quarterly (i.e., one cumulative submission for the three months) then you will see “—” in the first two periods of the quarter.
                                    </p>
                                    <p>
                                        The modal provides a detailed record of all publication and certification dates for the selected submission period. The publication date is the date when the agency submits its data for publication (it appears on the website the following day), and the certification date is the date when an agency’s Senior Accountable Official (SAO) confirms that the financial data submission is valid and reliable.
                                    </p>
                                    <p>
                                        You may find the column helpful if you are interested in seeing if the agency’s data has been updated since the last time you viewed it, or if the submission has been certified by the agency. The modal adds a layer of detail which may be helpful if you wish to see all dates on which updates were made to the agency’s data for that period.
                                    </p>
                                    <p>
                                        The table will update for a new period/quarter on the day after that period/quarter submission deadline passes. This timing matches when USAspending.gov reveals the new data across the site. If an agency publishes data ahead of the deadline, the table will show that early publication date once the new period/quarter appears on the table (i.e., on the day after the submission deadline).
                                    </p>
                                    <p>
                                        The submission deadline for the third monthly submission period of a quarter is often earlier than the quarterly submission deadline; thus, quarterly data will be slightly delayed and will be missing if you view the table in the few days between the deadlines. For example, Fiscal Year (FY) 2020 Period 09 data was due on July 30, 2020. Thus, the column would have populated for monthly reporting agencies on July 31. The analogous FY 2020 Q3 data was due on August 14, 2020 and thus, the table would not have populated for quarterly reporting agencies until August 15, 2020. This gap will only exist until FY 2022 at which point the few agencies still reporting on a quarterly basis will transition to reporting monthly.
                                    </p>
                                    <p>
                                        The policy governing which agencies submit quarterly vs. monthly is found in
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href="https://www.whitehouse.gov/wp-content/uploads/2020/04/Implementation-Guidance-for-Supplemental-Funding-Provided-in-Response.pdf">
                                            OMB’s Memorandum M-20-21 (Appendix A, Section III).
                                        </a>
                                        The full schedule of deadlines for agency submissions is found on the{' '}
                                        <a
                                            className="usda-external-link"
                                            href="https://fiscal.treasury.gov/data-transparency/resources.html"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="https://fiscal.treasury.gov/data-transparency/resources.html"
                                            title="https://fiscal.treasury.gov/data-transparency/resources.html">
                                            ‘Resources for Federal Agencies and Data Analysts’ page.&nbsp;
                                            <FontAwesomeIcon icon="external-link-alt" />
                                        </a>
                                    </p>
                                    <p><strong>Calculation:</strong></p>
                                    <p>The data in the column reflects the most recent date that the agency published a financial data submission for the selected fiscal year and period.</p>
                                </div>
                            </section>
                            <section className="about-section-wrapper" key="submissions-statistics-dsm-missing_tas" id="submissions-statistics-dsm-missing_tas">
                                <h2 className="about-section-title">Number of TASs Missing from Account Balance data</h2>
                                <div className="about-section-content">
                                    <p>
                                        This column shows how many Treasury Account Symbols (TAS) are missing from that agency’s Account Balance data reported to USAspending.gov in File A as compared to that agency’s data in the Governmentwide Treasury Account Symbol Adjusted Trial Balance System (GTAS), a separate Treasury system that is the authoritative source of governmentwide TAS account balances. While reported Account Balance dollars must match GTAS at the TAS level, sometimes there are fewer TAS reported to USAspending than to GTAS; this column captures that gap and the modal shows the specific TASs.
                                    </p>
                                    <p><strong>Calculation:</strong></p>
                                    <p>
                                        The numbers in the column are based on the difference between the count of the agency’s (non-financing account) TASs in GTAS and the count of the agency’s TASs in File A. Note that financing TASs are excluded from this calculation as they do not involve budgetary spending; thus, while present in GTAS, they are not appropriate for publication on USAspending.gov.
                                    </p>
                                </div>
                            </section>
                            <section className="about-section-wrapper" key="submissions-statistics-dsm-obligations_discrepancies" id="submissions-statistics-dsm-obligations_discrepancies">
                                <h2 className="about-section-title">
                                    Reporting Difference in Obligations
                                </h2>
                                <div className="about-section-content">
                                    <p>
                                        This column shows the total difference in agency spending (i.e., obligations) between two sets of data submitted to USAspending.gov (i.e., File A and File B). The accompanying modal provides the exact difference per TAS.
                                    </p>
                                    <p>
                                        You may find this column and related modal helpful if you notice discrepancies when comparing different parts of USAspending.gov. On some pages, high-level spending visuals use File A data, while those that dive into program activities or object classes use File B data. For example, you may notice differences within some Federal Account profiles given that the “Snapshot” and “Spending Over Time” sections draw on File A, while “Spending by Category” draws on File B.
                                    </p>
                                    <p>
                                        File A data is validated against GTAS to ensure it matches at the TAS level. While File B data is intended to match the TAS-level totals in the File A and GTAS data, it can diverge. Agencies are presented with warning notifications when submitting data that does not match, and they can provide explanations to delineate the source of the discrepancy. If provided, those explanations can be found within the downloads in the “Agency Comments” column.
                                    </p>
                                    <p><strong>Calculation:</strong></p>
                                    <p>
                                        The numbers in this column are based on the difference between obligations for the agency’s TASs in File A and File B for the current reporting period. This can be replicated by comparing obligations_incurred for the agency’s TASs in the Account Balances (File A) and Account Breakdown by Program Activity & Object Class (File B) in the Custom Account Download.
                                    </p>
                                </div>
                            </section>
                            <section className="about-section-wrapper" key="submissions-statistics-dsm-unlinked_awards" id="submissions-statistics-dsm-unlinked_awards">
                                <h2 className="about-section-title">Number of Unlinked Awards</h2>
                                <div className="about-section-content">
                                    <p>These columns show how many awards that pertain to the selected submission period are “unlinked.” Unlinked awards lack a shared award ID that allows two systems to match their records. Agencies submit two distinct datasets to USAspending for awards—File C and File D, parts 1 and 2. File C is submitted and published on the site on a monthly or quarterly basis from audited agency financial systems. File D1 (procurement) and File D2 (financial assistance) data is separately submitted (ingested from the Federal Procurement Data System, in the case of procurement data) and published on the site up to daily from agency assistance or procurement systems. Because these data originate from different communities and different systems within agencies that are subject to different policies and reporting requirements, there are sometimes gaps between the awards captured in each dataset. </p>
                                    <p>When an award is linked, USAspending uses each dataset to add context both on-screen and in downloads. Examples: </p>
                                    <ul>
                                        <li>
                                            On the Award Summary pages we leverage linked account data from File C and D1/D2 to display the federal accounts, object classes, and program activities that funded an award.
                                        </li>
                                        <li>
                                            The Account Breakdown by Award data that can be found in Custom Account Downloads page includes information about the award recipient sourced from the Contract Awards and Assistance Awards data.
                                        </li>
                                    </ul>
                                    <p>In contrast, an unlinked award (e.g., a financial assistance award that is present in File C but cannot be linked to File D2) will not have an Award Summary page or recipient information in the download.</p>
                                    <p>
                                        You may find this column useful if you seek to determine how complete an agency’s award information is on the site. As explained above, unlinked awards only show up in some parts of the site and are missing their full context.
                                    </p>
                                    <p><strong>Calculation:</strong></p>
                                    <p>For each column, the numbers are based on the sum of two counts:</p>
                                    <ol className="about-section-content__numbered-list">
                                        <li>
                                            The count of the agency’s D1 or D2 awards with activity in the selected submission period (i.e., action_date in the period) that aren’t linked to any of the agency’s File C awards across all time.
                                        </li>
                                        <li>
                                            The count of the agency’s File C awards with obligation activity in the selected submission period that aren’t linked to any D1 or D2 awards across all time. Obligation activity is defined as having non-null values in the Transaction Obligated Amount column. (Note that rows with null obligation activity are rows with outlay balance data.)
                                        </li>
                                    </ol>
                                    <p>
                                        For financial assistance data, this calculation excludes loans with total_subsidy_cost that is less than or equal to zero, since such loans have no budgetary cost to the government and therefore should not be reported in File C. Note that this column is concerned with unlinked awards that had obligation activity in the selected period or quarter, but the linkage itself occurs at the Award ID level across time. This means that if there is a time gap between when an award is reported between these two datasets, it will not prevent an award from being linked; such awards will show up in this count.
                                    </p>
                                </div>
                            </section>
                            <section className="about-section-wrapper" key="submissions-statistics-dsm-agency_comments" id="submissions-statistics-dsm-agency_comments">
                                <div className="about-section-content">
                                    <h2 className="about-section-title">Agency Comments</h2>
                                    <p>
                                        This column provides a download link for agency comments for the selected period’s submission. When agencies publish their data, they have the option to provide comments to explain nuances in their submissions (e.g., why some TAS were excluded, why some discrepancies exist between files). There are numerous acceptable and known reasons for why data may be (or appear to be) incomplete, some of which are allowed by policy; these comment files often shed light on those reasons. Comments that address ‘timing differences’ as a cause for unlinked data can be ignored in the context of this table except for the most recent submission period, since the unlinked data columns in this table are across time and ignore timing differences.
                                    </p>
                                    <p>
                                        You may find this download helpful if you wish to learn additional context for the values you see in the preceding columns.
                                    </p>
                                    <p>
                                        Refer to the table below to determine which file’s comments may provide additional context for a column:
                                    </p>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Column Name</th>
                                                <th>Relevant File</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Number of TASs Missing from Account Balance Data</td>
                                                <td>File A</td>
                                            </tr>
                                            <tr>
                                                <td>Reporting Difference in Obligations</td>
                                                <td>File A, File B</td>
                                            </tr>
                                            <tr>
                                                <td>Number of Unlinked Contract Awards</td>
                                                <td>File C, File D1</td>
                                            </tr>
                                            <tr>
                                                <td>Number of Unlinked Assistance Awards</td>
                                                <td>File C, D2</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </PageWrapper>
    );
};

export default DataSourcesAndMethodologiesPage;

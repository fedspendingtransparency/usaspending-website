import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAtdDefcText } from "helpers/aboutTheDataSidebarHelper";
import { Link, useLocation } from "react-router";
import GlossaryLink from "../../../sharedComponents/GlossaryLink";
import { showSlideout } from "../../../../helpers/slideoutHelper";
import GlobalConstants from "../../../../GlobalConstants";

const TimeDsm = ({ subaward, spendingLevel }) => {
    const reduxFilters = useSelector((state) => state.appliedFilters.filters);
    const isDefCodeInFilter = reduxFilters?.defCodes?.counts;
    const [displayCopy, setDisplayCopy] = useState();
    const { pathname } = useLocation();

    const openAboutTheDataSidebar = (e, entry) => {
        showSlideout('atd', { url: entry });
        e.preventDefault();
    };

    const v2Copy =
        <>
            <h4>What's included in this view of the data?</h4>
            <p style={{ marginBottom: '8px' }}>
            Spot trends in spending over your chosen time period. Break down your results by years, quarters, or months.
            </p>
            {subaward &&
                <>
                    {getAtdDefcText(isDefCodeInFilter?.length > 0, true)}
                    <p className="award-search__body-text">The data represent
                        {<span className="award-search__glossary-term"> sub-awards</span>}{' '}
                        {<GlossaryLink term="sub-award" />} that meet the selected filter criteria. The results do not
                        reflect sub-awards whose
                        {<span className="award-search__glossary-term"> prime awards</span>}{' '}{<GlossaryLink
                            term="prime-award" />}{' '}
                        meet the selected filter criteria. For example, if you filter by Fiscal Year 2019, you will see
                        only sub-awards with Action Dates in Fiscal Year 2019, but you will not see all sub-awards whose
                        prime award overlaps with Fiscal Year 2019.
                    </p>
                    <p className="award-search__body-text">Sub-award amounts are funded by prime award obligations and outlays.
                    In theory, the total value of all sub-award amounts for any given prime award is a subset of the Current Award Amount for that prime award;
                    sub-award amounts generally should not exceed the Current Award Amount for their associated prime award.
                    To avoid double-counting the overall value of a prime award, do not sum up sub-award amounts and prime award obligations or outlays.
                    <span className="award-search__subaward-note"> Note that there are several documented issues related to&nbsp;
                        <Link
                            to=""
                            aria-label="Open the About the Data"
                            onClick={(e) => openAboutTheDataSidebar(e, 'subaward-data-quality')}>subaward data quality
                        </Link> in our About the Data module.
                    </span>
                    </p>
                </>}
            {spendingLevel === 'awards' &&
                <>
                    {getAtdDefcText(isDefCodeInFilter?.length > 0, true)}
                    <p className="award-search__body-text">The data in the chart represent
                        {<span className="award-search__glossary-term"> federal action</span>}
                        {' '}{<GlossaryLink term="federal-action-obligation" />}
                        {<span className="award-search__glossary-term"> obligation </span>}
                        {' '}{<GlossaryLink term="obligation" />} amounts for prime award summaries within the selected filters.
                    If you selected any Time Period filter, your results include all awards that overlap with the selected time period,
                     even if there are no new
                        {<span className="award-search__glossary-term"> transactions </span>}
                        {' '}{<GlossaryLink term="transaction" />}{' '}within that time period. For example, for the selected time period of Mar. 1-31, 2022, you would see results for an award with a base transaction action date of Jan. 1, 2022 and a latest transaction action date of Dec. 31, 2022, even if there is no transaction activity for that award within the period of Mar. 1-31, 2022.
                    </p>
                    <p className="award-search__body-text">
                        Obligations across the life of the award are aggregated and displayed under the latest month, quarter, or year of the latest transaction action date for each award.
                For example, an award with obligations in FY 2023, 2024, and 2025 will aggregate all its obligations under FY 2025, the year that the award’s latest transaction action date falls under.
                (Note: These obligations will appear under FY 2025 even if the selected filtered time period does not include FY 2025.) To examine spending over time based on transaction dates, adjust your page-wide filter to the "Transactions" view.
                    </p>
                    <p className="award-search__body-text">
                        Loan awards use the
                        {<span className="award-search__glossary-term"> subsidy cost</span>}
                        {' '}{<GlossaryLink term="loan-subsidy-cost" />}{' '}rather than the obligated amount to sum up the
                        {<span className="award-search__glossary-term"> value of the loan</span>}
                        {' '}{<GlossaryLink term="face-value-of-loan" />}.
                    </p>
                </>}
            {spendingLevel === 'transactions' &&
            <>
                <p className="award-search__body-text">The data in the chart represent
                    {<span className="award-search__glossary-term"> federal action</span>}
                    {' '}{<GlossaryLink term="federal-action-obligation" />}
                    {<span className="award-search__glossary-term"> obligation </span>}
                    {' '}{<GlossaryLink term="obligation" />} amounts for prime award transactions within the selected filters. If you selected any Time Period filter, your results include transactions with an action date within your selected time period.
                </p>
            </>}

        </>;

    const legacyCopy = <>
        <h4>What's included in this view of the data?</h4>
        <p style={{ marginBottom: '8px' }}>
            Spot trends in spending over your chosen time period.
            Break down your results by years, quarters, or months.
        </p>
        {subaward ?
            <>
                {getAtdDefcText(isDefCodeInFilter?.length > 0, true)}
                <p className="award-search__body-text">The data represent
                    {<span className="award-search__glossary-term"> sub-awards</span>}{' '}
                    {<GlossaryLink term="sub-award" />} that meet the selected filter criteria. The results do not
                    reflect sub-awards whose
                    {<span className="award-search__glossary-term"> prime awards</span>}{' '}{<GlossaryLink
                        term="prime-award" />}{' '}
                    meet the selected filter criteria. For example, if you filter by Fiscal Year 2019, you will see
                    only sub-awards with Action Dates in Fiscal Year 2019, but you will not see all sub-awards whose
                    prime award overlaps with Fiscal Year 2019.
                </p>
                <p className="award-search__body-text">Sub-award amounts are funded by prime award obligations and outlays.
                    In theory, the total value of all sub-award amounts for any given prime award is a subset of the Current Award Amount for that prime award;
                    sub-award amounts generally should not exceed the Current Award Amount for their associated prime award.
                    To avoid double-counting the overall value of a prime award, do not sum up sub-award amounts and prime award obligations or outlays.
                <span className="award-search__subaward-note"> Note that there are several documented issues related to&nbsp;
                    <Link
                        to=""
                        aria-label="Open the About the Data"
                        onClick={(e) => openAboutTheDataSidebar(e, 'subaward-data-quality')}>subaward data quality
                    </Link> in our About the Data module.
                </span>
                </p>
            </> :
            <>
                {getAtdDefcText(isDefCodeInFilter?.length > 0, true)}
                <p>The data in the chart represent
                    <span className="award-search__glossary-term"> federal action
                    </span>{' '}<GlossaryLink
                        term="federal-action-obligation" />
                    <span className="award-search__glossary-term"> obligation </span>{' '}<GlossaryLink
                        term="obligation" /> amounts for prime award
                    <span className="award-search__glossary-term"> transactions</span>{' '}<GlossaryLink
                        term="transaction" /> within the selected filters. Loan awards use the
                    {<span className="award-search__glossary-term"> subsidy cost</span>}{' '}{<GlossaryLink
                        term="loan-subsidy-cost" />} rather than the obligated amount to sum up the value of the
                    loan.
                    Prime award transactions with the same unique award ID are grouped under a single prime award
                    summary.
                </p>
            </>
        }
    </>;


    useEffect(() => {
        if (pathname === GlobalConstants.SEARCH_V2_PATH) {
            setDisplayCopy(v2Copy);
        }
        else {
            setDisplayCopy(legacyCopy);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (<>{displayCopy}</>);
};

export default TimeDsm;

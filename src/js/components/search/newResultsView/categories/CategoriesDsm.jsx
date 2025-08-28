import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAtdDefcText } from "helpers/aboutTheDataSidebarHelper";
import { Link, useLocation } from "react-router";
import GlossaryLink from "../../../sharedComponents/GlossaryLink";
import { showSlideout } from "../../../../helpers/slideoutHelper";
import GlobalConstants from "../../../../GlobalConstants";

const CategoriesDsm = ({ subaward }) => {
    const [displayCopy, setDisplayCopy] = useState();
    const reduxFilters = useSelector((state) => state.appliedFilters.filters);
    const isDefCodeInFilter = reduxFilters?.defCodes?.counts;
    const { pathname } = useLocation();

    const openAboutTheDataSidebar = (e, entry) => {
        showSlideout('atd', { url: entry });
        e.preventDefault();
    };

    const v2Copy = <>
        <h4>What's included in this view of the data?</h4>
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
                    {<span className="award-search__glossary-term"> federal action</span>}
                    {' '}<GlossaryLink term="federal-action-obligation" />
                    {<span className="award-search__glossary-term"> obligation </span>}
                    {' '}<GlossaryLink term="obligation" /> amounts for prime award summaries within the selected filters. Loan awards use the
                    {<span className="award-search__glossary-term"> subsidy cost</span>}
                    {' '}{<GlossaryLink term="loan-subsidy-cost" />} rather than the obligated amount to sum up
                    {<span className="award-search__glossary-term"> value of the loan</span>}
                    {' '}{<GlossaryLink term="face-value-of-loan" />}.
                </p>
            </>
        }
        <h4>Awarding Agency</h4>
        <p>
            View a list of the top Agencies from highest to lowest.
            View your results by Awarding Agency.
        </p>
        <h4>Recipient</h4>
        <p>
            View a list of the top Recipients from highest to lowest.
            View your results by Parent Recipient or Recipient.
        </p>
        <h4>North American Industry Classification System (NAICS) and Product or Service Code (PSC)</h4>
        <p>
            View a list of the top Industry Codes from highest to lowest.
            View your results by
            {<span className="award-search__glossary-term"> NAICS Code</span> }
            {' '}{<GlossaryLink term="naics" />} or
            {<span className="award-search__glossary-term"> PSC Code</span> }
            {' '}{<GlossaryLink term="product-or-service-code-psc" />}.
        </p>
        <h4>Assistance Listing</h4>
        <p>
            View a list of the top
            {<span className="award-search__glossary-term"> CFDA Programs</span> }
            {' '}{<GlossaryLink term="assistance-listings-cfda-program" />} from highest to lowest.
        </p>
    </>;

    const legacyCopy =
        <>
            <h4>What's included in this view of the data?</h4>
            {subaward ?
                <>
                    <p style={{ marginBottom: '8px' }}>
                        View a list of sub-award transactions based on your selected filters.
                        Click the Sub-Award ID or Prime Award ID for additional details on the prime award.
                        You can also learn more about the prime award’s recipient by clicking the Prime Recipient Name.
                    </p>
                    <p className="award-search__body-text">The rows in the table represent {<span className="award-search__glossary-term"> sub-awards </span>}{' '}{<GlossaryLink
                        term="sub-award" />} that meet the selected filter criteria. The results do not reflect
                        sub-awards whose {<span className="award-search__glossary-term"> prime awards</span>}{' '}{<GlossaryLink
                        term="prime-award" />}
                    {' '}meet the selected filter criteria. For example, if you filter by Fiscal Year 2019, you will
                        see only sub-awards with Action Dates in Fiscal Year 2019, but you will not see all sub-awards
                        whose prime award overlaps with Fiscal Year 2019.
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
                    <p style={{ marginBottom: '8px' }}>
                        View a list of award summaries based on your selected filters.
                        Click the Award ID, Recipient Name, or Awarding Agency to find more detailed information on
                        individual awards including transaction history, subawards, and more.
                    </p>
                    <p className="award-search__body-text">The rows in the table represent award summaries for {
                        <span className="award-search__glossary-term"> prime awards</span>}{' '}{<GlossaryLink
                        term="prime-award" />}.
                        Award summaries contain all the individual transactions and modifications that share the same
                        unique award ID.
                        If you selected any Time Period filter, your results will include prime awards where the{<span className="award-search__glossary-term"> earliest </span>}{' '}{<GlossaryLink
                        term="base-transaction-action-date" />} and {<span className="award-search__glossary-term"> latest</span>}{' '}{<GlossaryLink
                        term="latest-transaction-action-date" />}{' '}
                        transactions overlap with your selected time period (regardless of whether any transactions
                        occur within that period).
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

export default CategoriesDsm;

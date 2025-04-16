import React from "react";
import { useSelector } from "react-redux";
import { getAtdDefcText } from "helpers/aboutTheDataSidebarHelper";
import { Link } from "react-router-dom";
import GlossaryLink from "../../../sharedComponents/GlossaryLink";
import { showSlideout } from "../../../../helpers/slideoutHelper";

const CategoriesDsm = ({ subaward }) => {
    const reduxFilters = useSelector((state) => state.appliedFilters.filters);
    const isDefCodeInFilter = reduxFilters?.defCodes?.counts;

    const openAboutTheDataSidebar = (e, entry) => {
        showSlideout('atd', { url: entry });
        e.preventDefault();
    };
    return (
        <>
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
        </>
    );
};

export default CategoriesDsm;

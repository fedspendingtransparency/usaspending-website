import React from "react";
import { useSelector } from "react-redux";
import { getAtdDefcText } from "helpers/aboutTheDataSidebarHelper";

import GlossaryLink from "../../../sharedComponents/GlossaryLink";

const CategoriesDsm = ({ subaward }) => {
    const reduxFilters = useSelector((state) => state.appliedFilters.filters);
    const isDefCodeInFilter = reduxFilters?.defCodes?.counts;

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
                    <p>
                        Sub-award amounts are funded by prime award obligations and outlays. In theory, the total value
                        of all sub-award amounts for any given prime award is a subset of the Current Award Amount for
                        that prime award; sub-award amounts generally should not exceed the Current Award Amount for
                        their associated prime award. To avoid double-counting the overall value of a prime award, do
                        not sum up sub-award amounts and prime award obligations or outlays.
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
            <h4>Awarding Agency and Awarding Subagency</h4>
            <p>
                View a list of the top Agencies from highest to lowest.
                View your results by Awarding Agency or Sub Agency.
            </p>
            <h4>Recipient</h4>
            <p>
                View a list of the top Recipients from highest to lowest.
                View your results by Parent Recipient or Recipient.
            </p>
            <h4>North American Industry Classification System (NAICS) and Product or Service Code (PSC)</h4>
            <p>
                View a list of the top Industry Codes from highest to lowest.
                View your results by NAICS Code or PSC Code.
            </p>
            <h4>Assistance Listing</h4>
            <p>
                View a list of the top CFDA Programs from highest to lowest.
            </p>
        </>
    );
};

export default CategoriesDsm;

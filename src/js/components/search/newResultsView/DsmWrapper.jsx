import React from "react";
import { getAtdDefcText } from "helpers/aboutTheDataSidebarHelper";
import { useSelector } from 'react-redux';

import GlossaryLink from "../../sharedComponents/GlossaryLink";

export const TempPlaceholderComponent = () => (
    <div style={{
        border: '2px solid pink',
        height: '800px',
        margin: '40px 40px',
        textAlign: 'center',
        fontSize: '24px'
    }}>
        PLACEHOLDER COMPONENT
    </div>
);

export const DsmWrapper = ({ heading, description }) => (
    <>
        <h4>{heading}</h4>
        <p>{description}</p>
    </>
);

export const DsmCategoriesAgency = ({ subaward }) => {
    const reduxFilters = useSelector((state) => state.appliedFilters.filters);
    const isDefCodeInFilter = reduxFilters?.defCodes?.counts;
    // placeholder
    return (
        <>
            <h4>Awarding Agency: What's included in this view of the data?</h4>
            <p>
                View a list of the top Agencies from highest to lowest.
                View your results by Awarding Agency, Sub Agency, or Office, and hover over the bars
                for more detailed information.
            </p>
            {subaward ?
                <>
                    {getAtdDefcText(isDefCodeInFilter?.length > 0)}
                    <p>The data below represent
                        {<span className="award-search__glossary-term"> sub-awards</span>}{' '}
                        {<GlossaryLink term="sub-award" />} that meet the selected filter criteria. The results do not reflect sub-awards whose
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
                    {getAtdDefcText(isDefCodeInFilter?.length > 0)}
                    <p>The data in the chart below represent
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
                        summary. Prime award summaries can be viewed in the Table tab.
                    </p>
                </>
            }
        </>
    );
};

import React from "react";

import GlossaryLink from "../../../sharedComponents/GlossaryLink";

const TableDsm = ({ subaward }) => (
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
                <p className="award-search__body-text">Sub-award amounts are funded by prime award obligations and
                        outlays. In theory, the total value of all sub-award amounts for any given prime award is a
                        subset of the Current Award Amount for that prime award; sub-award amounts generally should not
                        exceed the Current Award Amount for their associated prime award. To avoid double-counting the
                        overall value of a prime award, do not sum up sub-award amounts and prime award obligations or
                        outlays.
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
    </>
);

export default TableDsm;

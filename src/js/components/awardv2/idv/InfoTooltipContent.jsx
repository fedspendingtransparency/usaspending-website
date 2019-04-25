import React from 'react';

// Mapping of section identifier to tooltip content JSX

export const transactionHistoryInfo = (
    <div className="transaction-history-tt">
        <div className="info-tooltip__title">
            Transaction History
        </div>
        <div className="info-tooltip__text">
            <p>
               The Transaction History tab displays modification records
               for an award.
            </p>
            <p>
               Each modification appears as a row in the table below.
               Here&apos;s what each of the columns for each modification
               (row) tell you:
            </p>
            <ul>
                <li>
                    <strong>Modification Number</strong> – This number
                 identifies the modification with the lowest number
                 representing the beginning of the award.
                </li>
                <li>
                    <strong>Action Date</strong> – This is when the
                 modification was obligated.
                </li>
                <li>
                    <strong>Amount</strong> – This refers to the amount of
                 money added, or subtracted, from the initial awarded
                 amount.
                </li>
            </ul>
            <p>
                <strong>Action Type</strong> – This column describes the
               reason behind a modification. It uses a letter code system
               that maps to the following descriptions:
            </p>
            <ul className="info-tooltip__list">
                <li>
                    <strong>A</strong> – Additional Work
                </li>
                <li>
                    <strong>B</strong> – Supplemental Agreement for work
                 within scope
                </li>
                <li>
                    <strong>C</strong> – Funding Only Action
                </li>
                <li>
                    <strong>D</strong> – Change Order
                </li>
                <li>
                    <strong>E</strong> – Terminate for Default (complete or
                 partial)
                </li>
                <li>
                    <strong>F</strong> – Terminate for Convenience (complete
                 or partial)
                </li>
                <li>
                    <strong>G</strong> – Exercise an Option
                </li>
                <li>
                    <strong>H</strong> – Definitize Letter Contract
                </li>
                <li>
                    <strong>J</strong> – Novation Agreement
                </li>
                <li>
                    <strong>K</strong> – Close Out
                </li>
                <li>
                    <strong>L</strong> – Definitize Change Order
                </li>
                <li>
                    <strong>M</strong> – Other Administrative Action
                </li>
            </ul>
            <p>
                <strong>Description</strong> – This is additional
               information typically about the effects of the
               modifications on the contract.
            </p>
        </div>
    </div>
);

export const federalAccountFundingInfo = (
    <div>
        <div className="info-tooltip__title">
            Federal Account Funding
        </div>
        <div className="info-tooltip__text">
            <p>
                Each row in this table represents a submission of a transaction by the awarding agency  that commits a specific amount of funding to this award. The columns in this table represent the following:
            </p>
            <ul>
                <li>
                    <strong>Submission Date</strong> – When the transaction from the awarding agency was submitted to our system.
                </li>
                <li>
                    <strong>Award ID</strong> – The ID number of the award that is being funded in this transaction.
                </li>
                <li>
                    <strong>Agency</strong> – The awarding agency reporting the funding transaction.
                </li>
                <li>
                    <strong>Federal Account</strong> –The Treasury account group that is providing the funds of the transaction.
                </li>
                <li>
                    <strong>Program Activity</strong> – The specific activity or project (program) that this transaction&apos;s funds are for.
                </li>
                <li>
                    <strong>Object Class</strong> – A broad category of spending this transaction has been categorized in.
                </li>
                <li>
                    <strong>Funding Obligated</strong> – The amount funded in this transaction by the awarding agency.
                </li>
            </ul>
        </div>
    </div>
);

export const relatedAwardsInfo = (
    <div className="related-awards-tt">
        <div className="info-tooltip__title">
             Award Orders Made Under this IDV
        </div>
        <div className="info-tooltip__text">
            <p>
               This section displays the awards that have been made under
               this Indefinite Delivery Vehicle (IDV). IDV contracts are
               a special kind of contract which aren&apos;t directly
               associated with award amounts. This is because IDV
               contracts merely act as a means, or vehicle, for agencies
               to procure an indefinite amount of goods and services from
               vendors within a specific time frame. For this reason, the
               awards made under the IDV are where the agency&apos;s
               spending actually occurs, not the IDV itself.
            </p>
            <p>
               The awards under an IDV are sometimes known or referred to
               as:
            </p>
            <ul className="info-tooltip__list">
                <li>Task Order</li>
                <li>Delivery Order</li>
                <li>Purchase Order</li>
                <li>Blanket Purchase Agreement (BPA) Calls</li>
            </ul>
            <p>
               The awards under an IDV can also sometimes be yet another
               IDV. We show both IDV contracts and (non-IDV) contracts
               made under this IDV in the two tabs below, respectively.
            </p>
        </div>
    </div>
);

export const awardAmountsOverspendingInfo = (
    <div>
        <div className="info-tooltip__title">
            Exceeds Combined Current Award Amount
        </div>
        <div className="info-tooltip__text">
            <p>
            The award orders underneath this IDV have a combined
            obligated amount that exceeds their combined current award
            amount. In other words, collectively speaking, the award
            orders under this IDV have obligated more money than what
            was made available to spend at this time (their combined
            current awards amounts).
            </p>
            <p>
            This can occur because of missing data, errors in the
            data, or violations of procurement policy.
            </p>
        </div>
    </div>
);

export const awardAmountsExtremeOverspendingInfo = (
    <div>
        <div className="info-tooltip__title">
             Exceeds Combined Potential Award Amounts
        </div>
        <div className="info-tooltip__text">
            <p>
                The award orders made underneath this IDV have a combined obligated amount that exceeds their combined potential award amounts. In other words, collectively speaking, the award orders underneath this IDV have obligated more money than what they reported would ultimately be available to spend (their collective potential award amount).
            </p>
            <p>
                This can occur because of missing data, errors in the data, or violations of procurement policy.
            </p>
        </div>
    </div>
);

export const summaryRelatedAwardsInfo = (
    <div>
        <div className="info-tooltip__title">
            Related Awards
        </div>
        <div className="info-tooltip__text">
            <p>
                Related Awards refers to two possible types of awards related to this IDV:
            </p>
            <ul>
                <li>
                    <strong>Parent Award</strong> – The parent award is an IDV award that this contract was made under.  Click on the link to view more information on this award&apos;s parent.
                </li>
                <li>
                    <strong>Award Orders Under this IDV</strong> – This is a count of how many awards were made under this IDV.  Click on the link to see more information about all of those orders.
                </li>
            </ul>
        </div>
    </div>
);

export const descriptionInfo = (
    <div>
        <div className="info-tooltip__title">
            Description
        </div>
        <div className="info-tooltip__text">
            <p>
                The description of the award is provided by the contract officer who submitted this award data. The quality of these descriptions can vary as they are largely dependent on their author and agency standards.
            </p>
            <p>
                Also shown below are codes from two sets, North American Industry Classification System (NAICS) and Product Service Codes (PSC), used to categorize awards by what they are or are for.
            </p>
            <p>
                Click on the glossary icons for more information on those systems.
            </p>
        </div>
    </div>
);

export const awardAmountsInfo = (
    <div>
        <div className="info-tooltip__title">
            Award Amounts
        </div>
        <div className="info-tooltip__text">
            <p>
                This section provides information on the value of the award at two different levels, shown separately under the following tabs:
            </p>
            <ul>
                <li>
                    <strong>Award Orders Made Under this IDV</strong> – The information within this tab is derived from the data of every award made under this IDV, not the IDV award itself. This is done because award amount data is not typically found in IDV award records themselves. In order to provide a better idea of the actual value of the IDV as a whole, award amounts are taken from every award made under the IDV and then aggregated (or summed together) and presented here.
                </li>
                <li>
                    <strong>This IDV</strong> – This tab contains data that is directly attributed to the IDV record summarized on this page. This data does not include the data attributed to the awards made under it.  In many cases, the data directly attributed to an IDV record does not show actual award amounts, which is why the amounts in this tab are often $0.
                </li>
            </ul>
        </div>
    </div>
);

export const awardHistoryInfo = (
    <div>
        <div className="info-tooltip__title">
            Award History
        </div>
        <div className="info-tooltip__text">
            <p>
                <strong>Transaction History</strong> – This table contains historical changes made to this award, shown as individual modification records. This information is reported by the Awarding Agency&apos;s contracting office.
            </p>
            <p>
                <strong>Federal Account Funding</strong> – The data documenting the funding, or the actual transactions made my an agency to obligate money, of an award can be found in this table. This data comes from the Awarding Agency&apos;s financial accounting offices.
            </p>
        </div>
    </div>
);

export const datesInfo = (
    <div>
        <div className="info-tooltip__title">
            Dates
        </div>
        <div className="info-tooltip__text">
            <p>The dates below are described in more detail:</p>
            <ul>
                <li>
                    <strong>Start Date</strong> – This is the effective date, or when the IDV was made available for use by agencies.
                </li>
                <li>
                    <strong>End Date</strong> – This is the last date for agencies to make purchases under this IDV.
                </li>
            </ul>
        </div>
    </div>
);

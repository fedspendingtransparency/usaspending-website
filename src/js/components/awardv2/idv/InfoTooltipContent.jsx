import React from 'react';

// Mapping of section identifier to tooltip content JSX

export const transactionHistoryInfo = (
    <div>
        <div className="info-tooltip__title">Transaction History</div>
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
               Action Type – This column describes the reason behind a
               modification. It uses a letter code system that maps to
               the following descriptions:
            </p>
            <ul className="info-tooltip__text__list">
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
        <div className="info-tooltip__title">Federal Account Funding</div>
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
    <div>
        <div className="info-tooltip__title">
             Awards Under this IDV
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
               spending actually occurs, not the IDV itself. The awards
               under an IDV are sometimes known or referred to as:
            </p>
            <ul>
                <li>
                    <strong>Task Order</strong>
                </li>
                <li>
                    <strong>Delivery Order</strong>
                </li>
                <li>
                    <strong>Purchase Order</strong>
                </li>
                <li>
                    <strong>Blanket Purchase Agreement (BPA) Calls</strong>
                </li>
            </ul>
            <p>
               Calls The awards under an IDV can also sometimes be yet
               another IDV. We show both IDV contracts and (non-IDV)
               contracts made under this IDV in the two tabs below,
               respectively.
            </p>
        </div>
    </div>
);

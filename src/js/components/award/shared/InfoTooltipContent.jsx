import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import * as Icons from 'components/sharedComponents/icons/Icons';

// Mapping of section identifier to tooltip content JSX
export const transactionHistoryInfoGeneric = (
    <div className="award-summary-tooltip transaction-history-tt">
        <div className="tooltip__text">
            <p>
               The Transaction History tab displays modification records
               for an award.
            </p>
            <p className="tooltip__text-section">
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
            <p className="tooltip__text-section">
                <strong>Description</strong> – This is additional
               information typically about the effects of the
               modifications on the contract.
            </p>
        </div>
    </div>
);

export const transactionHistoryInfoContract = (
    <div className="award-summary-tooltip transaction-history-tt">
        <div className="tooltip__title">Transaction History</div>
        <div className="tooltip__text">
            <p>
                The Transaction History tab displays all modification records for
                this contract. Most of these are financial in nature, but some may
                be administrative only with no financial implications
                (e.g., noting an address change by the recipient).
            </p>
            <p className="tooltip__text-section">
                Each modification appears as a row in the table below.
                Here&apos;s what the columns for each modification (row) tell you:
            </p>
            <ul>
                <li>
                    <strong>Modification Number</strong> – This number
                    identifies the modification. Modification numbers increment
                    from lower to higher as more mods are made.
                </li>
                <li>
                    <strong>Action Date</strong> – This is when the
                    modification was issued.
                </li>
                <li>
                    <strong>Amount</strong> – This refers to the amount of
                money added or subtracted from the initial awarded
                amount by the modification, if any.
                </li>
            </ul>
            <p>
                <strong>Action Type</strong> – This column describes the
              type of modification. It uses a letter code system
              that maps to the following descriptions. For more on the
              meaning of these descriptions, refer to Acquisition.gov:
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
                <strong>Description</strong> – Describes the modification,
                typically covering its effect on the contract.
            </p>
        </div>
    </div>
);

export const transactionHistoryInfoFinancialAssistance = (
    <div className="award-summary-tooltip transaction-history-tt">
        <div className="tooltip__title">Transaction History</div>
        <div className="tooltip__text">
            <p>
                The Transaction History tab displays all modification
                records for this award. Most of these are financial in
                nature, but some may be administrative only with no
                financial implications (e.g., noting an address change by the recipient).
            </p>
            <p>
                Each modification appears as a row in the table below.
                Here&apos;s what the columns for each modification (row) tell you:
            </p>
            <ul>
                <li>
                    <strong>Modification Number</strong> – This number
                    identifies the modification. Modification numbers increment
                    from lower to higher as more mods are made.
                </li>
                <li>
                    <strong>Action Date</strong> – This is when the
                    modification was issued.
                </li>
                <li>
                    <strong>Amount</strong> – This refers to the amount of
                money added or subtracted from the initial awarded
                amount by the modification, if any.
                </li>
            </ul>
            <p>
                <strong>Action Type</strong> – This column describes the
              type of modification. It uses a letter code system
              that maps to the following descriptions:
            </p>
            <ul className="info-tooltip__list">
                <li>
                    <strong>A</strong> – New assistance award
                </li>
                <li>
                    <strong>B</strong> – Continuation
                </li>
                <li>
                    <strong>C</strong> – Revision
                </li>
                <li>
                    <strong>D</strong> – Funding adjustment to a completed project
                </li>
            </ul>
            <p>
                <strong>Description</strong> – Describes the modification,
                typically covering its effect on the award.
            </p>
            <p>
                <strong>Loan Face Value</strong> - The Face Value of a loan represents how much has actually been lent out to
                the entity that received the loan dollars. Sometimes loans are financed by a
                financial institution (with the Federal government merely providing a &#39;loan
                guarantee&#39; to the financial institution and reimbursement in cases where the
                loan isn&#39;t paid back), and other times they are financed by the Federal
                government directly (direct loans). Regardless of how it is financed,
                a loan&#39;s face value is not considered Federal spending, because
                it does not, in itself, represent a long-term cost to the government. The
                estimated long-term cost to the government of a loan is captured
                in the subsidy cost field.
            </p>
            <p>
                <strong>Loan Subsidy Cost (Total Obligations To Date)</strong> - The implications of a loan or loan guarantee for the Federal Budget (and thus the
            loan version of spending/obligations) are known as the loan&#39;s subsidy
            cost. Subsidy cost is the calculated net present value of the loan to the
            government, taking into account the interest rate and the modeled risk of the
            recipient failing to pay back the loan in part or full; subsidy cost can be
            positive (indicating that the government is likely to lose money on the loan) or
            negative (indicating that the government is likely to make money on the
            loan). Subsidy cost should never be larger in absolute value terms than
            the face value itself. Administrative costs of running the loan or loan
            guarantee program itself are excluded from subsidy cost calculations. Note
            that a loan&#39;s face value is not considered Federal spending, since it
            does not in itself represent a long-term cost to the government.
            </p>
        </div>
    </div>
);

export const federalAccountFundingInfoIDV = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">
            Federal Account Funding
        </div>
        <div className="tooltip__text">
            <p>
                Each row in this table shows a transaction in the awarding agency&rsquo;s financial system that promises spending for the award from a federal account (a rollup of TAS, or Treasury accounts), broken down by program activity and object class.
            </p>
        </div>
    </div>
);

export const federalAccountFundingInfoGeneric = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">
            Federal Account Funding
        </div>
        <div className="tooltip__text">
            <p>
                Each row in this table shows a transaction in the awarding agency&rsquo;s financial system that promises spending for the award from a federal account (a rollup of TAS, or Treasury accounts), broken down by program activity and object class.
            </p>
        </div>
    </div>
);

export const relatedAwardsInfo = (
    <div className="award-summary-tooltip related-awards-tt">
        <div className="tooltip__title">
             Orders Made Under this IDV
        </div>
        <div className="tooltip__text">
            <p>
                This section displays the child award orders*, child IDV orders*,
                and grandchild award orders that have been made under this Indefinite
                Delivery Vehicle (IDV).
            </p>
            <p>
                IDVs are a special kind of contract which usually aren&rsquo;t directly
                associated with award amounts. This is because IDVs merely act as
                a means, or “vehicle”, for agencies to purchase an indefinite amount
                of goods or services from vendors within a specific time frame.
                For this reason, the award orders made under the IDV are where all
                (or most) of the agency&rsquo;s spending related to an IDV occurs, not
                the IDV itself*.
            </p>
            <p>
                The award orders made under an IDV are sometimes known or referred
                to as:
            </p>
            <ul className="info-tooltip__list">
                <li>&bull; Task Order</li>
                <li>&bull; Delivery Order</li>
                <li>&bull; Purchase Order</li>
                <li>&bull; Blanket Purchase Agreement (BPA) Calls</li>
            </ul>
            <p>
                Another thing to note is that sometimes an IDV order can be made
                under an IDV (and in turn, have award orders made under it). We
                show child award orders*, child IDV orders*, and grandchild award
                orders* made under this IDV in the three tabs below, respectively.
            </p>
            <ul>
                <li>
                    <em>
                        <strong>*Child award order</strong> refers to award orders made
                        directly under this IDV (IDV &gt; Award).
                    </em>
                </li>
                <li>
                    <em>
                        <strong>*Child IDV order</strong> refers to IDVs made directly
                        under this IDV (IDV &gt; IDV).
                    </em>
                </li>
                <li>
                    <em>
                        <strong>*Grandchild award order</strong> refers to award orders
                        made within a child IDV order (IDV &gt; IDV &gt;
                          Award).
                    </em>
                </li>
                <li>
                    <em>
                        <strong>*IDV itself</strong> refers to the top-level IDV this
                        page is summarizing, not including any of its child award orders
                        or child IDV orders.
                    </em>
                </li>
            </ul>
        </div>
    </div>
);

export const summaryRelatedAwardsInfo = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">
            Related Awards
        </div>
        <div className="tooltip__text">
            <strong>Parent Award</strong>
            <p className="tooltip__text-section">A parent award, or parent indefinite delivery vehicle (IDV), is any award that has other prime awards made under it.</p>
            <p className="tooltip__text-section">The contract summarized on this page is a “child” prime award of the parent IDV indicated here.</p>
            <p className="tooltip__text-section">Click on the parent award ID to view the summary page of this award&apos;s parent award, which details all of that parent award&apos;s “child” and “grandchild” awards.</p>
            <strong>Sub-Awards</strong>
            <p className="tooltip__text-section">
                This is the count of sub-awards (in this case, sub-contracts to furnish supplies or services to advance the prime contract) issued and reported directly
                by the prime recipient. For more details, click on the count to scroll to the Sub-Awards tab within the Award History section of this page.
                Sub-awards are always referred to as such and are independent of the ‘child&apos; and ‘grandchild&apos; prime award structure discussed above.
            </p>
        </div>
    </div>
);

export const summaryRelatedAwardsInfoIdv = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">
            Related Awards
        </div>
        <div className="tooltip__text">
            <p>
                Related Awards refers to two possible types of awards related to
                this indefinite delivery vehicle (IDV):
            </p>
            <ul>
                <li>
                    <strong>Parent Award</strong> – The parent award is the IDV
                    award that this IDV was made under.  Click on the link to view
                    more information on this IDV&rsquo;s parent award.
                </li>
                <li>
                    <strong>Child Award Order</strong> – This refers to the count
                    of award orders made directly under this IDV (IDV &gt; Award).
                     Click on the count to view the child award orders of this IDV.
                </li>
                <li>
                    <strong>Child IDV Order</strong> – This refers to the count
                    of IDVs made directly under this IDV (IDV &gt; IDV). Click
                     on this count to view the child IDV orders of this IDV.
                </li>
                <li>
                    <strong>Grandchild Award Order</strong> – This refers to the
                    count of award orders made within child IDV Orders under this
                    IDV (IDV &gt; IDV &gt; Award). Click on this count to view
                     the grandchild award orders of this IDV.
                </li>
            </ul>
        </div>
    </div>
);

export const descriptionInfoAsst = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">
            Description
        </div>
        <div className="tooltip__text">
            <p className="tooltip__text-section">
                The description of this award is provided by the financial assistance manager who submitted its data. The level of detail in descriptions varies and is dependent on the author and the standards of the agencies involved. The description featured here comes from the base award. Modifications have their own descriptions which can differ from the description of the base award; these can be viewed in the Transaction History tab of the Award History section below or by downloading the data via the top-right “DOWNLOAD” button.
            </p>
            <p className="tooltip__text-section">Additional contextual information on the purpose of this award can be gleaned from the Assistance Listing (CFDA Program) module below.</p>
        </div>
    </div>
);

export const descriptionInfoContract = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">
            Description
        </div>
        <div className="tooltip__text">
            <p>
                The description of the award is provided by the contracting officer who submitted this contract data. The level of detail in
                descriptions varies and is dependent on the author and the standards of the agencies involved. The description featured here comes
                from the base award of the contract.  Contract transactions (also known as modifications) have their own descriptions available.
                These transaction descriptions and other details can be viewed in the Transaction History tab of the Award History section located
                further down this page, or by downloading the data via the top-right “DOWNLOAD” button.
            </p>
            <p>
                Also shown below the description are groups of codes from two systems of classification:
            </p>
            <ul className="info-tooltip__list award-desciption-section">
                <li>
                    <strong>North American Industry Classification System (NAICS) Code</strong>
                    <p>This code describes the primary industrial activity of the recipient of this award. It is six digits and has three levels of embedded granularity:</p>
                    <ul className="info-tooltip__list">
                        <li>&bull; The first two-digits indicate the sector (general).</li>
                        <li>&bull; The first four-digits indicate the industry group.</li>
                        <li>&bull; The full six-digits indicate the sub-industry group (specific).</li>
                    </ul>
                    <p style={{ marginBottom: 0 }} >These three levels are displayed hierarchically below for this recipient.</p>
                </li>
                <li>
                    <strong>Product and Service Codes (PSC)</strong>
                    <p>These codes are used to categorize awards by the type of product, service, or research and development (R&D) procured. The code is 4 characters and has up to four levels of embedded granularity:</p>
                    <ul className="info-tooltip__list">
                        <li>&bull; The first level classifies what was procured as a product, service or R&D .</li>
                        <li>&bull; The second level indicates the top level category of what was procured.</li>
                        <li>&bull; The third level indicates the detailed level category subdivision of what was procured.</li>
                        <li>&bull; The fourth level exists for R&D and services only. For R&D, it specifies the stage of the R&D process involved. For services, it specifies a further subdivision of the third level code.</li>
                    </ul>
                    <p>Each of these levels is displayed hierarchically below for this recipient.</p>
                    <p>Click on the glossary icons for more information on NAICS and PSC.</p>
                </li>
            </ul>
        </div>
    </div>
);

export const descriptionInfo = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">
            Description
        </div>
        <div className="tooltip__text">
            <p>
                The description of the award is provided by the contract officer
                who submitted this award data. The quality of these descriptions
                can vary as they are largely dependent on their author and agency
                standards.
            </p>
            <p>
                Also shown below are codes from two sets, North American Industry
                Classification System (NAICS) and Product Service Codes (PSC), used
                to categorize awards by what they are or are for.
            </p>
            <p>
                Click on the glossary icons for more information on those systems.
            </p>
        </div>
    </div>
);

export const awardAmountsInfo = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">
            Award Amounts
        </div>
        <div className="tooltip__text">
            <p>
                This section provides information on the value of this indefinite
                delivery vehicle (IDV) at two different levels, shown separately
                under the following tabs:
            </p>
            <ul>
                <li>
                    <p>
                        <strong>Award Orders Made Under this IDV</strong> – The
                        information within this tab is derived from the spending
                        data of every award order made under this IDV, including
                        child award orders* and grandchild award orders*.  It does
                        not include the spending data of the IDV itself* or its
                        child IDV orders*. This is because award amount data is
                        not typically found in IDVs themselves. In order to provide
                        a better idea of the actual value of the IDV as a whole,
                        award amounts are taken from its award orders and then aggregated
                        (or summed together) and then presented here.
                    </p>
                    <p>
                        Counts of the total amount of orders as well as the child
                        award orders and grandchild award orders are also displayed
                        in a table below the bar chart.
                    </p>
                </li>
                <li>
                    <strong>This IDV</strong> – This tab contains spending data
                    that is directly attributed to the IDV record summarized on
                    this page. This data does not include the spending data attributed
                    to any awards or IDVs made under it.  In many cases, the data
                    directly attributed to an IDV record does not show actual award
                    amounts, which is why the amounts in this tab are often $0.
                </li>
                <li>
                    <em>
                        <strong>*Child award order</strong> refers to award orders made
                        directly under this IDV (IDV &gt; Award).
                    </em>
                </li>
                <li>
                    <em>
                        <strong>*Child IDV order</strong> refers to IDVs made directly
                        under this IDV (IDV &gt; IDV).
                    </em>
                </li>
                <li>
                    <em>
                        <strong>*Grandchild award order</strong> refers to award orders
                        made within a child IDV order (IDV &gt; IDV &gt; Award).
                    </em>
                </li>
                <li>
                    <em>
                        <strong>*IDV itself</strong> refers to the top-level IDV this
                        page is summarizing, not including any of its child award orders
                        or child IDV orders.
                    </em>
                </li>
            </ul>
        </div>
    </div>
);

export const awardHistoryIdv = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">
            Award History
        </div>
        <div className="tooltip__text">
            <p>
                <strong>Transaction History</strong> – This table contains historical
                changes made to this award, shown as individual modification records.
                This information is reported by the Awarding Agency&apos;s contracting
                office.
            </p>
            <p>
                <strong>Federal Account Funding</strong> – The data documenting
                the funding, or the actual transactions made my an agency to obligate
                money, of an award can be found in this table. This data comes from
                the Awarding Agency&apos;s financial accounting offices.
            </p>
        </div>
    </div>
);

export const awardHistoryContract = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">
            Award History
        </div>
        <div className="tooltip__text">
            <p>
                This section displays all of this award&apos;s transactions
                (also known as modifications), sub-awards, and federal
                account funding data in tabs and rows. Please note that
                the tables displayed here only feature a small set of the
                available data fields.  To download the full set, including
                data attributes not displayed here and all related sub-awards
                and federal account data, click the “DOWNLOAD” button at the
                top-right of this page.
            </p>
            <div>
                <strong>Transaction History</strong>
                <p className="tooltip__text-section">
                    This table contains historical changes made to this award,
                    shown as individual modification records. This information
                    is reported by the awarding agency&apos;s contracting or grants officer.
                </p>
            </div>
            <div>
                <strong>Sub-Awards</strong>
                <p className="tooltip__text-section">
                    This table contains any sub-awards reported by this recipient.
                </p>
            </div>
            <div>
                <strong>Federal Account Funding</strong>
                <p className="tooltip__text-section">
                    This table contains funding data directly submitted from agency financial
                    accounting systems, also known as “Award Financial” or “Account
                    Breakdown by Award” data. This data, which links each Treasury account to
                    each award transaction it funds, connects award spending to the
                    appropriation, budgeting, and allocation processes, which channel
                    Congressional and Administration intent and determine how much money
                    is assigned to each federal account.
                </p>
            </div>
        </div>
    </div>
);

export const awardHistoryFinancialAssistanceGeneric = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">
            Award History
        </div>
        <div className="tooltip__text">
            <p>
                This section displays all of this award&apos;s transactions (modifications)
                and federal account funding data in tabs and rows. The tables display
                only a small set of the available data fields.  To download the full set,
                including data attributes not displayed here and federal account data,
                click the “DOWNLOAD” button at the top-right of this page.
            </p>
            <div>
                <strong>Transaction History</strong>
                <p className="tooltip__text-section">
                    This table contains historical changes made to this award,
                    shown as individual modification records. This information is
                    reported by the awarding agency&apos;s officer.
                </p>
            </div>
            <div>
                <strong>Federal Account Funding</strong>
                <p className="tooltip__text-section">
                    This table contains funding data directly submitted from agency financial
                    accounting systems, also known as “Award Financial” or “Account
                    Breakdown by Award” data. This data, which links each Treasury account to
                    each award transaction it funds, connects award spending to the
                    appropriation, budgeting, and allocation processes, which channel
                    Congressional and Administration intent and determine how much money
                    is assigned to each federal account.
                </p>
            </div>
        </div>
    </div>
);

export const awardHistoryFinancialAssistanceLoan = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">
            Award History
        </div>
        <div className="tooltip__text">
            <p>
                This section displays all of this award&apos;s transactions (modifications)
                and federal account funding data in tabs and rows. The tables display
                only a small set of the available data fields.  To download the full set,
                including data attributes not displayed here and federal account data,
                click the “DOWNLOAD” button at the top-right of this page.
            </p>
            <div>
                <strong>Transaction History</strong>
                <p className="tooltip__text-section">
                    This table contains historical changes made to this loan award,
                    shown as individual modification records. This information is
                    reported by the awarding agency&apos;s loan officer.
                </p>
            </div>
            <div>
                <strong>Federal Account Funding</strong>
                <p className="tooltip__text-section">
                    This table contains funding data directly submitted from agency financial
                    accounting systems, also known as “Award Financial” or “Account
                    Breakdown by Award” data. This data, which links each Treasury account to
                    each award transaction it funds, connects award spending to the
                    appropriation, budgeting, and allocation processes, which channel
                    Congressional and Administration intent and determine how much money
                    is assigned to each federal account.
                </p>
            </div>
        </div>
    </div>
);

export const datesInfoAsst = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">
            Dates
        </div>
        <div className="tooltip__text">
            <strong>Start Date</strong>
            <p className="tooltip__text-section">
                The start date marks when the awarded recipient&apos;s work begins or when the award is otherwise effective.  This is also called the period of performance start date.
            </p>
            <strong>End Date</strong>
            <p className="tooltip__text-section">
                The end date marks the end of the award&apos;s period of performance, when the recipient will finish its work or the award will otherwise end.
            </p>
            <p className="tooltip__text-section">
                Note that administrative actions related to this award may continue to occur after this date.
            </p>
            <p className="tooltip__text-section">
                Assistance awards are sometimes subject to extensions, noncompetitive continuations, or early termination; if any of these occur, they will be indicated by a modification that alters the end date.
            </p>
        </div>
    </div>
);

export const datesInfo = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">
            Dates
        </div>
        <div className="tooltip__text">
            <strong>Start Date</strong>
            <p className="tooltip__text-section">
                The start date marks when the awarded recipient&apos;s work begins or when the award is otherwise effective.
                This is also called the period of performance start date or effective date of the contract.
            </p>
            <strong>Current End Date</strong>
            <p className="tooltip__text-section">
                The current end date marks the end of the contract&apos;s current period of performance or when the recipient will finish its work.
                This date factors in only currently-exercised contract extension options.
            </p>
            <p className="tooltip__text-section">Note that administrative actions related to this contract may continue to occur after this date.</p>
            <strong>Potential End Date</strong>
            <p className="tooltip__text-section">
                The potential end date marks the end of the contract&apos;s potential period of performance or when the recipient will finish its work if all remaining contract extension options are exercised.
            </p>
            <p className="tooltip__text-section">Note that administrative actions related to this contract may continue to occur after this date.</p>
        </div>
    </div>
);

export const datesInfoIdv = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">
            Dates
        </div>
        <div className="tooltip__text">
            <p>The dates below are described in more detail:</p>
            <ul>
                <li>
                    <strong>Start Date</strong> – This is the effective date, or
                    when the IDV was made available for use by agencies.
                </li>
                <li>
                    <strong>Ordering Period End Date</strong> – This is the last date for agencies
                    to make purchases under this IDV.
                </li>
            </ul>
        </div>
    </div>
);

export const contractActivityGrants = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">
            Grant Activity
        </div>
        <div className="tooltip__text">
            <p>This chart displays modifications made over the course of this grant&apos;s period of performance.  It gives you a sense of how obligations on this grant were made over time, and how they changed the value of the grant.</p>
            <div>
                <strong>Grant Transactions</strong>
                <p className="tooltip__text-section">
                    Each transaction is marked by a dot.  You can hover your cursor over each dot to get more information for that particular transaction.
                </p>
                <p className="tooltip__text-section">
                    The vertical placement of each dot (transaction) represents the total amount obligated at that time (up to and including that transaction) and the horizontal placement represents the transaction&apos;s action date.
                </p>
            </div>
            <div>
                <strong>Start Date</strong>
                <p className="tooltip__text-section">The start date marks when the awarded recipient&apos;s work begins or when the award is otherwise effective.  This is also called the period of performance start date. </p>

            </div>
            <div>
                <strong>End Date</strong>
                <p className="tooltip__text-section">The end date marks the end of the grant&apos;s period of performance or when the recipient will finish its work.</p>
                <p className="tooltip__text-section">Administrative actions related to this grant may continue to occur after this date.</p>
            </div>
        </div>
    </div>
);

export const contractActivityInfoContracts = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">
            Contract Activity
        </div>
        <div className="tooltip__text">
            <p>
                This chart displays modifications made over the course of this contract&apos;s period of performance.
                It gives you a sense of how obligations on this contract were made over time and how they changed the value of the contract.
            </p>
            <div>
                <strong>Contract Transactions</strong>
                <p className="tooltip__text-section">
                    Each transaction is marked by a dot.  You can hover your cursor over each dot to get more information for that particular transaction.
                </p>
                <p className="tooltip__text-section">
                    The vertical placement of each dot (transaction) represents the total amount obligated at that time (up to and including that transaction) and the horizontal placement represents the transaction&apos;s action date.
                </p>
            </div>
            <div>
                <strong>Potential Award Amount</strong>
                <p className="tooltip__text-section">
                    The horizontal line at the top of the chart represents the potential award amount, or contract ceiling, of this contract.
                </p>
            </div>
            <div>
                <strong>Start Date</strong>
                <p className="tooltip__text-section">
                    The start date marks when the awarded recipient&apos;s work begins or when this contract is otherwise effective.  This is also called the period of performance start date or effective date.
                </p>
            </div>
            <div>
                <strong>Current End Date</strong>
                <p className="tooltip__text-section">
                    The current end date marks the end of this contract&apos;s current period of performance or when the recipient will finish its work.  This date factors in only currently-exercised contract extension options.
                </p>
                <p className="tooltip__text-section">
                    Note that administrative actions related to this contract may continue to occur after this date.
                </p>
            </div>
            <div>
                <strong>Potential End Date</strong>
                <p className="tooltip__text-section">
                    The potential end date marks the end of this contract&apos;s potential period of performance or when the recipient will finish its work if all remaining contract extension options are exercised.
                </p>
                <p className="tooltip__text-section">
                    Note that administrative actions related to this contract may continue to occur after this date.
                </p>
            </div>
        </div>
    </div>
);

export const idvActivityInfo = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">
            IDV Activity
        </div>
        <div className="tooltip__text">
            <p>
                <strong>How to read this visual:</strong><br />
                Each bar represents a <strong>child award order*</strong> or
                <strong> grandchild award order* </strong>
                made underneath this indefinite delivery vehicle (IDV). Each bar&rsquo;s
                position on the vertical axis indicates its <strong>obligated amount</strong>.
                Where the left side of each bar begins on the horizontal axis indicates
                the start date of its period of performance. Where the right side
                of each bar ends on the horizontal axis indicates the end date of
                its period of performance. The green part of each bar shows how
                much of the award order&rsquo;s potential award amount has been obligated.
                For example, a green bar reaching half of the width of the grey
                bar means the award has obligated half of its potential award amount.
            </p>
            <p>
                <strong>Data shown in this visual:</strong><br />
                This visual shows the award orders made under this IDV. This includes
                <strong> child award orders*</strong> made directly underneath this IDV, as well
                as <strong>grandchild award orders* </strong>
                made under <strong>child IDV orders*</strong>.
            </p>
            <p>
                <strong>Data not shown in this visual:</strong><br />
                This visual does not show the <strong>IDV itself*</strong> nor does it show the
                <strong> child IDV orders*</strong> made under this IDV.
                If an award has a zero or negative obligated amount,
                or is missing an end date, it is not displayed.
            </p>
            <p>
                <strong>Options when viewing the awards:</strong><br />
                Awards orders are shown 10, 50, or 100 at a time (user choice)
                and in descending order according to their respective
                <strong> obligated amounts</strong>. Use the page number links at the top-right
                of this section to view more.
            </p>
            <p>
                You can get more details on each award order by hovering your cursor
                over the award order&rsquo;s bar.
            </p>
            <ul>
                <li>
                    <em>
                        <strong>*Child award order</strong> refers to award orders made
                        directly under this IDV (IDV =&gt; <strong>Award</strong>).
                    </em>
                </li>
                <li>
                    <em>
                        <strong>*Child IDV order</strong> refers to IDVs made directly
                        under this IDV (IDV =&gt; <strong>IDV</strong>).
                    </em>
                </li>
                <li>
                    <em>
                        <strong>*Grandchild award order</strong> refers to award orders
                        made within a child IDV order (IDV =&gt; IDV =&gt; <strong>Award</strong>).
                    </em>
                </li>
                <li>
                    <em>
                        <strong>*IDV itself</strong> refers to the top-level IDV this
                        page is summarizing, not including any of its child award orders
                        or child IDV orders.
                    </em>
                </li>
            </ul>
        </div>
    </div>
);
export const federalAccountsInfoContract = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">
            Federal Accounts
        </div>
        <div className="tooltip__text">
            <p className="tooltip__text-section">
                The funding committed by the government to an award is stored in federal accounts.  The federal accounts and the amounts they have committed to this award are displayed here.
            </p>
            <strong>Viewing Options for this Visual: </strong>
            <p className="tooltip__text-section">
                You can view federal account data as a list or as a treemap by clicking on the buttons at the top right corner of this section. The chart below this data provides a Summary of All Federal Accounts Used by this Award.
            </p>
            <p className="tooltip__text-section">
                In the list view, a summary table displays the total reported funding committed to this award from each contributing federal account, as well as associated funding agencies and awarding agencies.
            </p>
            <p className="tooltip__text-section">
                In the treemap view, each proportionately-sized rectangle represents a different federal account&apos;s portion of the total funding for this award.
            </p>
            <strong>Data Shown in this Visual</strong>
            <p className="tooltip__text-section">
                This visual leverages funding data directly submitted from agency financial accounting systems, also known as “Award Financial” or “Account Breakdown by Award” data. This data, which links each Treasury account to each Award transaction it funds, connects award spending to the appropriation, budgeting, and allocation processes, which channel Congressional and Administration intent and determine how much money is assigned to each federal account.
            </p>
        </div>
    </div>
);

export const federalAccountsInfoIdv = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">
            Federal Accounts
        </div>
        <div className="tooltip__text">
            <p>
                <strong>How to read this visual:</strong><br />
                The funding committed to the award orders made under this indefinite
                delivery vehicle (IDV) is shown here. Each rectangle represents a
                different federal account. The size of each rectangle indicates the
                fraction of the total funding for this IDV provided by that federal
                account.
            </p>
            <p>
                <strong>Data shown in this visual:</strong><br />
                Funding data* from all child award orders* and grandchild award orders*
                are summed and categorized by the federal account it came from.
            </p>
            <p>
                <strong>Data not shown in this visual:</strong><br />
                This section does not show any federal account funding directly attached
                to the IDV itself* (if any) nor funding directly attached to its child
                IDV orders* (if any).
            </p>
            <p>
                <strong>Viewing options for this visual:</strong><br />
                You can view this data as a treemap or as a list by clicking on the
                buttons at the top right corner of this section.
            </p>
            <p>
                <strong>Summary table:</strong><br />
                Also included is a summary table showing the total federal account
                funding committed across all award orders made underneath this IDV,
                as well as the counts of federal funding accounts and awarding agencies
                involved with these award orders.
            </p>
            <ul>
                <li>
                    <em>
                        <strong>*Funding data</strong> refers to award-level accounting/financial
                        data submitted by government agencies which is linked to complementary
                        data they previously submitted from their award systems. . This
                        is the same data available for download in the Download Center,
                        under Custom Account Download by selecting “Account Breakdown by
                        Award” within the “File Type” section.
                    </em>
                </li>
                <li>
                    <em>
                        <strong>*Child award order</strong> refers to award orders made
                        directly under this IDV (IDV &gt; Award).
                    </em>
                </li>
                <li>
                    <em>
                        <strong>*Child IDV order</strong> refers to IDVs made directly
                        under this IDV (IDV &gt; IDV).
                    </em>
                </li>
                <li>
                    <em>
                        <strong>*Grandchild award order</strong> refers to award orders
                        made within a child IDV order (IDV &gt; IDV &gt; Award).
                    </em>
                </li>
                <li>
                    <em>
                        <strong>*IDV itself</strong> refers to the top-level IDV this
                        page is summarizing, not including any of its child award orders
                        or child IDV orders.
                    </em>
                </li>
            </ul>
        </div>
    </div>
);

export const subAwardsTabContract = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">Sub-Awards</div>
        <div className="tooltip__text">
            <p>
                The Sub-Awards tab displays any sub-contracts reported by this contract&apos;s
                recipient (the ‘prime recipient&apos; in a sub-award context). Sub-contracts are
                contractual agreements that a prime recipient makes with another entity
                (sub-recipient) to furnish supplies or services for the prime contract.
            </p>
            <p>
                Above the Sub-Award table, we display the total number of reported
                sub-contract actions and their total value.
            </p>
            <p>
                Here&apos;s what the columns for each sub-contract action tell you:
            </p>
            <ul>
                <li>
                    <strong>Sub-Award ID</strong> – The sub-award ID number chosen
                    by the prime recipient for this transaction.
                </li>
                <li>
                    <strong>Sub-Recipient Name</strong> – The name of the sub-recipient.
                </li>
                <li>
                    <strong>Action Date</strong> - The date when the sub-contract was issued.
                </li>
                <li>
                    <strong>Amount</strong> – The amount of money involved
                    in the sub-contract action.
                </li>
                <li>
                    <strong>Description</strong> – The description of the sub-contract
                    provided by the prime recipient.
                    The level of detail in descriptions varies and is dependent on the author.
                </li>
            </ul>
        </div>
    </div>
);

export const subAwardsTabGrant = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">Sub-Awards</div>
        <div className="tooltip__text">
            <p>
            The Sub-Awards tab displays any sub-grants reported by this grant&apos;s
            recipient (the “prime recipient” in a sub-award context). Sub-grants
            are awards of financial assistance made under a grant by
            a prime grantee to an eligible subgrantee.
            </p>
            <p>
                Above the Sub-Award table, we display the total number of reported
                sub-grant actions and their total value.
            </p>
            <p>
                Here&apos;s what the columns for each sub-grant action tell you:
            </p>
            <ul>
                <li>
                    <strong>Sub-Award ID</strong> – The sub-award ID number chosen
                    by the prime recipient for this transaction.
                </li>
                <li>
                    <strong>Sub-Recipient Name</strong> – The name of the sub-recipient.
                </li>
                <li>
                    <strong>Action Date</strong> - The date when the sub-grant was issued.
                </li>
                <li>
                    <strong>Amount</strong> – The amount of money involved
                    in the sub-grant action.
                </li>
                <li>
                    <strong>Description</strong> – The description of the sub-grant
                    provided by the prime recipient.
                    The level of detail in descriptions varies and is dependent on the author.
                </li>
            </ul>
        </div>
    </div>
);

export const ContractAwardAmountsInfo = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">
            Award Amounts
        </div>
        <div className="tooltip__text">
            <p>This section illustrates how much the government has spent on this award.</p>
            <p>The outlayed amount of a contract represents the amount an agency has paid the vendor as recorded in the agency’s financial system. Please note that the Office of Management and Budget (OMB) required agencies to provide outlay data at the award summary level for each award that received COVID-19 supplemental funding starting in Fiscal Year (FY) 2020, and for all awards starting in FY 2022. As a result, award-level outlay data are incomplete prior to FY 2022, and almost entirely absent prior to FY 2020.</p>
            <p>The obligated amount of a contract represents the amount an agency has promised to pay the vendor as recorded in the agency's financial system. It usually matches the current value of the contract, but certain agencies (e.g., DOD) are allowed to incrementally fund some contracts in their financial systems. In these cases, the obligated amount may lag behind the current award amount.</p>
            <p>The current value of a contract (current award amount) represents the value of the base contract and any exercised options. </p>
            <p>The potential value of a contract (potential award amount) represents the value of the base contract and all options, if they happen to be exercised in the future. This is sometimes called the contract ceiling or capacity.</p>
            <p>If a recipient fails to deliver on the terms of the contract, the contract can end or be modified, reducing the current and potential value through a deobligation.</p>
            <p>This visual depicts the outlayed amount, obligated amount, current award amount, and potential award amount of the contract.</p>
            <p>Hover over the chart for more information about the specific amounts displayed.</p>
        </div>
    </div>
);

export const AsstAwardAmountsInfo = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">
            Award Amounts
        </div>
        <div className="tooltip__text">
            <p>This section illustrates the total value of this award, which is a combination of any obligated federal dollars and non-federal funding provided.</p>
            <p>Hover over the chart for more information about the specific amounts displayed.</p>
        </div>
    </div>
);

export const LoanAwardAmountsInfo = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">
            Award Amounts
        </div>
        <div className="tooltip__text">
            <p>This section illustrates the total value of this loan to the recipient and its expected cost to the government.</p>
            <p>The total face value of the loan is shown with the original subsidy cost as a portion of that face value.  The original subsidy cost is the long-term estimated cost of this loan to the government based on the modeled risk that the recipient will default. Administrative costs of running the loan program itself are excluded from this number.</p>
            <p>Hover over the chart for more information about the specific amounts displayed.</p>
        </div>
    </div>
);

export const CFDAOverviewInfo = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">
        Assistance Listing (CFDA Program)
        </div>
        <div className="tooltip__text">
            <p>
                The Catalog of Federal Domestic Assistance (CFDA), also known as Assistance Listings, is a collection of federal financial assistance programs that provides benefits to the American public. Every assistance award must be categorized under a CFDA program, and every CFDA program must be specifically authorized by congressional statute before an agency can begin to issue awards under it.
            </p>
            <p>The CFDA number(s) and title(s) listed here identify the program(s) associated with this award.</p>
        </div>
    </div>
);

export const CFDASectionInfo = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">
        Assistance Listing (CFDA Program)
        </div>
        <div className="tooltip__text">
            <p>The Catalog of Federal Domestic Assistance (CFDA), also known as Assistance Listings, is a collection of federal financial assistance programs that provide benefits to the American public. Every assistance award must be categorized under a CFDA program, and every CFDA program must be specifically authorized by Congressional statute before an agency can begin to issue awards under it.</p>
            <p>This section contains information about the CFDA program(s) that this award has been categorized under.  This information includes the following:</p>
            <ul>
                <li>
                    <strong>Objectives </strong>
                    The purpose, goals, and details of this CFDA program and its implementation.
                </li>
                <li>
                    <strong>Administrative Agency </strong>
                    The federal agency that operates this CFDA program.
                </li>
                <li>
                    <strong>Website </strong>
                    The official website of this CFDA program.
                </li>
                <li>
                    <strong>SAM.gov Page </strong>
                    The CFDA program’s page on SAM.gov, which is the source of data in this section.  Additional information on this CFDA program, including contact information, projected future spending and information on how to apply (if appropriate) can be found here.
                </li>
                <li>
                    <strong>Use of Assistance </strong>
                    The broad functional category this CFDA program falls under (e.g., Agriculture)
                </li>
                <li>
                    <strong>Applicant Eligibility </strong>
                    The types of recipients that are eligible to apply for assistance funds from this CFDA program.
                </li>
                <li>
                    <strong>Beneficiary Eligibility </strong>
                    The types of organizations that are eligible beneficiaries under this CFDA Program.
                </li>
            </ul>
        </div>
    </div>
);

export const FilterTooltip = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">
        Learn which data elements are associated with certain search filters
        </div>
        <div className="tooltip__text ul-override_filter ul-override">
            <p className="award-summary__new-category">
            The data in award search come primarily from governmentwide award systems in formats called File D1 (for <strong>contract award elements</strong>) and File D2 (for <strong>financial assistance award elements</strong>). If a filter is not listed below, then it applies to both contract and financial assistance award elements.
            </p>
            <p>
            Filters for <strong>agency account elements</strong> apply to both contract and financial assistance award elements, but they come from File C (award data from agency financial systems that are submitted directly to USAspending.gov) rather than from Files D1 or D2.
            </p>
            <p className="award-summary__new-category"><strong>Contract Award Elements</strong></p>
            <p className="award-summary__new-category">
            Contract award elements contain information from a governmentwide award system called the Federal Procurement Data System (FPDS). This information is extracted by USAspending.gov in a format called File D1.
            </p>
            <p>
                Filters that draw exclusively from contract award elements are:
            </p>
            <ul>
                <li>North American Industry Classification System (NAICS)</li>
                <li>Product or Service Code (PSC)</li>
                <li>Type of Contract Pricing</li>
                <li>Type of Set Aside</li>
                <li>Extent Competed</li>
            </ul>
            <p className="award-summary__new-category"><strong>Financial Assistance Award Elements</strong></p>
            <p className="award-summary__new-category">
            Financial assistance award elements contain information from a governmentwide award system called the Financial Assistance Broker System (FABS). This information is submitted directly to USAspending.gov in a format called File D2.
            </p>
            <p>
            The filter that draws exclusively from financial assistance award elements is:
            </p>
            <ul>
                <li>Assistance Listing (CFDA Program)</li>
            </ul>
            <p className="award-summary__new-category"><strong>Agency Account Elements</strong></p>
            <p className="award-summary__new-category">
            Agency account elements contain information from agency financial systems, and includes information about federal awards in a format called File C. Data in File C complement data in Files D1 and D2, which come from governmentwide award systems. If you select a filter that draws from agency account elements, then these data must be linked to data in governmentwide award systems before any results can be displayed. (The reverse is not true: you may see results from governmentwide award systems that are not linked to data in agency account elements.)
            </p>
            <p>
                Filters that draw exclusively from agency account elements are:
            </p>
            <ul>
                <li>Treasury Account Symbol (TAS)</li>
                <li>Disaster Emergency Fund Code (DEFC)</li>
            </ul>
        </div>
    </div>
);

export const CovidFlagTooltip = ({ codes }) => (
    <div className="award-summary-tooltip covid-19">
        <div className="tooltip__title">
            Includes COVID-19 Spending
        </div>
        <div className="tooltip__text">
            <p>This award is part of the COVID-19 Spending because part of its spending was derived from funds associated with the following <strong>Disaster Emergency Fund Codes</strong> (DEFC): </p>
            <p style={{ textAlign: 'center' }}>
                {codes.sort().map((code, i, arr) => {
                    if (i === arr.length - 1) {
                        return <strong key={uniqueId(i)}>{code.toUpperCase()}</strong>;
                    }
                    return <strong key={uniqueId(i)}>{`${code.toUpperCase()}, `}</strong>;
                }
                )}
            </p>
        </div>
    </div>
);


CovidFlagTooltip.propTypes = {
    codes: PropTypes.arrayOf(PropTypes.string)
};


export const UnlinkedTooltip = (props) => {
    const clickCloseTooltip = () => {
        props.setShowTooltip(false);
    };

    const closeTooltip = (e) => {
        if (e.key === 'Enter' || e.key === 'Escape') {
            clickCloseTooltip();
        }
    };
    return (
        <div
            className="award-summary-tooltip unlinked"
            styles={{
                position: 'absolute',
                transform: `translate(0px,20px)`
            }}>
            <div className="tooltip__header">
                <div className="tooltip__title">
                    This award has not been linked to any federal account
                </div>
                <div className="tooltip__close-button">
                    <button
                        className="award-summary__close-button"
                        title="Dismiss tooltip"
                        aria-label="Dismiss tooltip"
                        tabIndex={0}
                        onKeyUp={closeTooltip}
                        onClick={clickCloseTooltip}>
                        <Icons.Close />
                    </button>
                </div>
            </div>
            <div className="tooltip__text">
                <p>This means all financial system data elements (File C) are unavailable on this page and in downloads for this award.</p>
            </div>
        </div>);
};

UnlinkedTooltip.propTypes = {
    setShowTooltip: PropTypes.func
};

export const CondensedCDTooltip = ({ title }) => (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">
            {title}
        </div>
        <div className="tooltip__text">
            <p>
                The congressional districts displayed reflect their current geographic boundaries and are based on the 2020 census. These districts will be in effect from 2023 – 2033.&#42;
            </p>
            <p>
                Additional information can be found in the "Congressional District Data" section of the <strong>About the Data</strong> module under <strong>Find Resources</strong>.
            </p>
            <p>
                <em>&#42;Court-ordered redistricting might alter the time frame when a congressional district is in effect.</em>
            </p>
        </div>
    </div>
);

export const ExplorerInfoToolTip = (
    <div className="award-summary-tooltip">
        <div className="tooltip__title">
                Data Source
        </div>
        <div className="tooltip__text">
            <p>
                The sum of line 2190 across all remaining accounts in the
                <em> GTAS SF 133 Report on Budget Execution and Budgetary Resources </em>
                for this period, after excluding loan financing accounts. Loan program
                accounts <u>are</u> included.
            </p>
        </div>
    </div>

);

CondensedCDTooltip.propTypes = {
    title: PropTypes.string
};


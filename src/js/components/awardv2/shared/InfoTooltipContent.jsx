import React from 'react';

// Mapping of section identifier to tooltip content JSX

export const transactionHistoryInfoGeneric = (
    <div className="transaction-history-tt">
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

export const transactionHistoryInfoContract = (
    <div className="transaction-history-tt">
        <div className="info-tooltip__title">Transaction History</div>
        <div className="info-tooltip__text">
            <p>
                The Transaction History tab displays all modification records for
                this contract. Most of these are financial in nature, but some may
                be administrative only with no financial implications
                (e.g., noting an address change by the recipient).
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
    <div className="transaction-history-tt">
        <div className="info-tooltip__title">Transaction History</div>
        <div className="info-tooltip__text">
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
        </div>
    </div>
);

export const federalAccountFundingInfoIDV = (
    <div>
        <div className="info-tooltip__title">
            Federal Account Funding
        </div>
        <div className="info-tooltip__text">
            <p>
                Each row in this table represents a submission of a transaction
                by the awarding agency  that commits a specific amount of funding
                to this award. The columns in this table represent the following:
            </p>
            <ul>
                <li>
                    <strong>Submission Date</strong> – When the transaction from
                    the awarding agency was submitted to our system.
                </li>
                <li>
                    <strong>Award ID</strong> – The ID number of the award that
                    is being funded in this transaction.
                </li>
                <li>
                    <strong>Agency</strong> – The awarding agency reporting the
                    funding transaction.
                </li>
                <li>
                    <strong>Federal Account</strong> –The Treasury account group
                    that is providing the funds of the transaction.
                </li>
                <li>
                    <strong>Program Activity</strong> – The specific activity or
                    project (program) that this transaction&apos;s funds are for.
                </li>
                <li>
                    <strong>Object Class</strong> – A broad category of spending
                    this transaction has been categorized in.
                </li>
                <li>
                    <strong>Funding Obligated</strong> – The amount funded in this
                    transaction by the awarding agency.
                </li>
            </ul>
        </div>
    </div>
);

export const federalAccountFundingInfoGeneric = (
    <div>
        <div className="info-tooltip__title">
            Federal Account Funding
        </div>
        <div className="info-tooltip__text">
            <p>
                Each row in this table represents a transaction in the awarding
                agency&apos;s financial system that commits a specific amount of
                funding to this award from a federal account
                (a rollup of Treasury accounts), broken down by program
                activity and object class. The columns in this table represent the following:
            </p>
            <ul>
                <li>
                    <strong>Submission Date</strong> – The fiscal year and quarter
                    the data when the transaction occurred.
                </li>
                <li>
                    <strong>Agency</strong> – The awarding agency reporting the
                    funding transaction.
                </li>
                <li>
                    <strong>Federal Account</strong> – The Federal Account that
                    is providing the funds for the transaction.
                </li>
                <li>
                    <strong>Program Activity</strong> – The specific activity or
                    project (program) that this transaction&apos;s funds are for.
                </li>
                <li>
                    <strong>Object Class</strong> – The broad category of spending
                    this transaction has been categorized in.
                </li>
                <li>
                    <strong>Funding Obligated</strong> – The amount funded in this
                    transaction by the awarding agency.
                </li>
            </ul>
        </div>
    </div>
);

export const relatedAwardsInfo = (
    <div className="related-awards-tt">
        <div className="info-tooltip__title">
             Orders Made Under this IDV
        </div>
        <div className="info-tooltip__text">
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
    <div>
        <div className="info-tooltip__title">
            Related Awards
        </div>
        <div className="info-tooltip__text">
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

export const descriptionInfo = (
    <div>
        <div className="info-tooltip__title">
            Description
        </div>
        <div className="info-tooltip__text">
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
    <div>
        <div className="info-tooltip__title">
            Award Amounts
        </div>
        <div className="info-tooltip__text">
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
    <div>
        <div className="info-tooltip__title">
            Award History
        </div>
        <div className="info-tooltip__text">
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
    <div>
        <div className="info-tooltip__title">
            Award History
        </div>
        <div className="info-tooltip__text">
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
                <p className="info-tooltip__text-section">
                    This table contains historical changes made to this award,
                    shown as individual modification records. This information
                    is reported by the awarding agency&apos;s contracting or grants officer.
                </p>
            </div>
            <div>
                <strong>Sub-Awards</strong>
                <p className="info-tooltip__text-section">
                    This table contains any sub-awards reported by this recipient.
                </p>
            </div>
            <div>
                <strong>Federal Account Funding</strong>
                <p className="info-tooltip__text-section">
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
    <div>
        <div className="info-tooltip__title">
            Award History
        </div>
        <div className="info-tooltip__text">
            <p>
                This section displays all of this award&apos;s transactions (modifications)
                and federal account funding data in tabs and rows. The tables display
                only a small set of the available data fields.  To download the full set,
                including data attributes not displayed here and federal account data,
                click the “DOWNLOAD” button at the top-right of this page.
            </p>
            <div>
                <strong>Transaction History</strong>
                <p className="info-tooltip__text-section">
                    This table contains historical changes made to this award,
                    shown as individual modification records. This information is
                    reported by the awarding agency&apos;s officer.
                </p>
            </div>
            <div>
                <strong>Federal Account Funding</strong>
                <p className="info-tooltip__text-section">
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
    <div>
        <div className="info-tooltip__title">
            Award History
        </div>
        <div className="info-tooltip__text">
            <p>
                This section displays all of this award&apos;s transactions (modifications)
                and federal account funding data in tabs and rows. The tables display
                only a small set of the available data fields.  To download the full set,
                including data attributes not displayed here and federal account data,
                click the “DOWNLOAD” button at the top-right of this page.
            </p>
            <div>
                <strong>Transaction History</strong>
                <p className="info-tooltip__text-section">
                    This table contains historical changes made to this loan award,
                    shown as individual modification records. This information is
                    reported by the awarding agency&apos;s loan officer.
                </p>
            </div>
            <div>
                <strong>Federal Account Funding</strong>
                <p className="info-tooltip__text-section">
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

export const datesInfo = (
    <div>
        <div className="info-tooltip__title">
            Dates
        </div>
        <div className="info-tooltip__text">
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

export const idvActivityInfo = (
    <div>
        <div className="info-tooltip__title">
            IDV Activity
        </div>
        <div className="info-tooltip__text">
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

export const federalAccountsInfo = (
    <div>
        <div className="info-tooltip__title">
            Federal Accounts
        </div>
        <div className="info-tooltip__text">
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
    <div>
        <div className="info-tooltip__title">Sub-Awards</div>
        <div className="info-tooltip__text">
            <p>
                The Sub-Awards tab displays any sub-contracts reported by this contract&apos;s
                recipient (the ‘prime recipient’ in a sub-award context). Sub-contracts are
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
    <div className="transaction-history-tt">
        <div className="info-tooltip__title">Sub-Awards</div>
        <div className="info-tooltip__text">
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

export const GrantAwardAmountsInfo = (
    <div>
        <div className="info-tooltip__title">
            Award Amounts
        </div>
        <div className="info-tooltip__text">
            <p>This section illustrates the awarded amount of this grant.</p>
            <p>The total award amount of a grant is the combined value of its obligated amount and its non-federal funding.</p>
            <p>Hover over the chart for more information about the specific amounts displayed.</p>
        </div>
    </div>
);

export const LoanAwardAmountsInfo = (
    <div>
        <div className="info-tooltip__title">
            Award Amounts
        </div>
        <div className="info-tooltip__text">
            <p>This section illustrates the awarded amount of this loan.</p>
            <p>The total face value of the loan is shown with the original subsidy cost shown as a percentage of that face value.  The original subsidy cost can also be thought of the long-term estimated cost of this loan to the government.</p>
            <p>Hover over the chart for more information about the specific amounts displayed.</p>
        </div>
    </div>
);

export const ContractAwardAmountsInfo = (
    <div>
        <div className="info-tooltip__title">
            Award Amounts
        </div>
        <div className="info-tooltip__text">
            <p>This section illustrates how much the government has spent on this award.</p>
            <p>
                It&rsquo;s important to note that contracts are not paid in full on the date they are awarded,
                but rather a specific amount is made available for spending by the funding agency.
                This specific amount is known as the &ldquo;current award amount&rdquo; or &ldquo;current ceiling amount&rdquo;.
                During the period of performance of the contract, this current award amount can be grow to a maximum.
                That maximum is known as the &ldquo;potential award amount&rdquo; or &ldquo;potential ceiling amount&rdquo;.
            </p>
            <p>This visual depicts the three amounts associated with contracts: obligated amounts, current award amounts, and potential award amounts.</p>
            <p>Hover over the chart for more information about the specific amounts displayed.</p>
        </div>
    </div>
);

export const CFDAOverviewInfo = (
    <div>
        <div className="info-tooltip__title">
            CFDA Program / Assistance Listing
        </div>
        <div className="info-tooltip__text">
            <p>
                The Catalog of Federal Domestic Assistance (CFDA), also known as Assistance Listings, is a collection of federal financial assistance programs that provides benefits to the American public. Every assistance award must be categorized under a CFDA program, and every CFDA program must be specifically authorized by congressional statute before an agency can begin to issue awards under it.
            </p>
            <p>The CFDA number(s) and title(s) listed here identify the program(s) associated with this award.</p>
        </div>
    </div>
);

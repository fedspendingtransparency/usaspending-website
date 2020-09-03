import React from 'react';

const SpendingByRecipientHeaderTT = () => (
    <div className="homepage__covid-19-tt">
        <h2 className="tooltip__title">Award Spending by Recipient</h2>
        <div className="tooltip__text ul-override">
            <p>
                This section shows a breakdown of award spending according to various recipient attributes.
            </p><br />
            <p>
                When counts appear next to the award type filters (e.g., ‘All Awards’, ‘Grants’, etc.), they refer to the number of recipients who have received that type of award. Note that the count associated with ‘All Awards’ is not necessarily the sum of the remaining counts. For example, a given recipient may be counted individually across two award type categories (such as ‘Loans’ and ‘Contracts’), but would only be counted once under ‘All Awards’ (rather than twice, once for each of those two categories).
            </p><br />
            <p>
                When viewing table results:
            </p><br />
            <ul>
                <li>
                    The ‘Award Obligations’ column represents all award obligations, or promises of payment for awards, made by an agency or agencies.
                </li>
                <li>
                    The ‘Award Outlays’ column represents all award outlays, or actual payments for awards, made by an agency or agencies.
                </li>
                <li>
                    The ‘Award Obligations (Loan Subsidy Cost)’ and ‘Award Outlays (Loan Subsidy Cost)’ columns represent unusual types of obligations and outlays. Loan Subsidy Cost is the calculated net present value of the loan or loan guarantee to the government, taking into account the size of the loan (i.e., its face value), interest rate, and the modeled risk of the recipient failing to pay back the loan in part or full.
                    <strong>Loan Subsidy Cost does have direct budgetary impact and is factored into obligations and outlays when it is positive.</strong> Subsidy costs can be positive (indicating that the government is likely to lose money on the loan) or negative (indicating that the government is likely to make money on the loan). Loan Subsidy Cost should never be larger in absolute value terms than the Face Value of Loans itself. Administrative costs of running the loan or loan guarantee program itself are excluded from Loan Subsidy Cost calculations.
                </li>
                <li>
                    The ‘Face Value of Loans’ column represents the amount that agencies have directly issued (for direct loans) or facilitated by compensating the lender if the borrower defaults (for loan guarantees).From a budget perspective, Face Value of Loans is not considered federal spending, since it does not in itself represent a long-term cost to the government. As a result, <strong>Face Value of Loans is not included in any obligation or outlay figure.</strong>
                </li>
            </ul>
        </div>
    </div>
);

export default SpendingByRecipientHeaderTT;

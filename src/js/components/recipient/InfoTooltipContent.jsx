import React from 'react';

export const recipientOverviewLoanInfo = (
    <div className="recipient-overview-tooltip">
        <div className="tooltip__title">
            Face Value of Loans
        </div>
        <div className="tooltip__text">
            <p><strong>About Face Value of Loans</strong></p>
            <p>
                From a budget perspective, the face value of loans is not considered Federal spending, since it does not in itself represent a long-term cost to the government. Thus, the face value of loans is not included in the Total Awarded Amount figure above or in any other part of this page where dollar amounts appear.
            </p>
            <p><strong>What’s Included in Total Awarded Amount</strong></p>
            <p>
                While the face value of loans amounts are not included in the total award amount, the loan subsidy cost is included. All subsidy costs associated with loans this recipient has received during the filtered time period are captured within the "Total Awarded Amount" number above and anywhere else on this page dollar amounts are mentioned.
            </p>
            <p><strong>About Loan Subsidy Cost</strong></p>
            <p>
                Subsidy cost is considered actual budgetary federal spending. The subsidy cost is the calculated net present value of the loan or loan guarantee to the government. It takes into account the size of the loan (face value), the interest rate, and the modeled risk of the recipient failing to pay back the loan in part or full.
                Subsidy cost can be positive (indicating that the government is likely to lose money on the loan) or negative (indicating that the government is likely to make money on the loan).
                Subsidy cost should never be larger in absolute value terms than the face value itself.
                Administrative costs of running the loan or loan guarantee program itself are excluded from subsidy cost calculations.

            </p>
        </div>
    </div>
);


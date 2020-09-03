import React from 'react';

const SpendingTypesTooltip = () => (
    <div className="spending_types-tt">
        <h2 className="tooltip__title">Spending Types</h2>
        <div className="tooltip__text">
            <p>
                <strong>Total Spending</strong> refers to all agency spending, including agency expenses.
            </p><br />
            <p>
                <strong>Award Spending</strong> is a subset of Total Spending. It refers to money given through contracts or financial assistance to individuals, organizations, businesses, or state, local, or tribal governments.
            </p><br />
            <p>
                <strong>Loan spending</strong> has two components: 1) <strong>Face Value of Loans,</strong> which is the amount that agencies have directly issued (for direct loans) or facilitated by compensating the lender if the borrower defaults (for loan guarantees); and 2) <strong>Loan Subsidy Cost,</strong> which is the calculated net present value of the loan or loan guarantee to the government, taking into account the size of the loan (i.e., its face value), interest rate, and the modeled risk of the recipient failing to pay back the loan in part or full.
            </p><br />
            <p>
                From a budget perspective, Face Value of Loans is not considered federal spending, since it does not in itself represent a long-term cost to the government.
                As a result, <strong>Face Value of Loans is not included in any obligation or outlay figure.</strong> However,
                <strong>Loan Subsidy Cost does have direct budgetary impact and is factored into obligations and outlays when it is positive.</strong>
                Subsidy costs can be positive (indicating that the government is likely to lose money on the loan) or negative (indicating that the government is likely to make money on the loan).
                Loan Subsidy Cost should never be larger in absolute value terms than the Face Value of Loans itself. Administrative costs of running the loan or loan guarantee program itself are excluded from Loan Subsidy Cost calculations.
            </p>
        </div>
    </div>
);

export default SpendingTypesTooltip;

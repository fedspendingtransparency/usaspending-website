import React from 'react';

export const AwardSpendingAgencyTT = () => (
    <div className="covid-profile-tt">
        <h2 className="tooltip__title">Award Spending by Sub-Agency</h2>
        <div className="tooltip__text ul-override">
            <p>
                This section shows a breakdown of award spending according to agency and sub-agency.
            </p><br />
            <p>
                When counts appear next to the award type filters (e.g., ‘All Awards’, ‘Grants’, etc.), they refer to the number of agencies who have given that type of award. Note that the count associated with ‘All Awards’ is not necessarily the sum of the remaining counts. For example, a given agency may be counted individually across two award type categories (such as ‘Loans’ and ‘Contracts’), but would only be counted once under ‘All Awards’ (rather than twice, once for each of those two categories).
            </p><br />
            <p>
                When viewing table results:
            </p><br />
            <ul>
                <li>
                    The ‘Award Obligations’ column represents all award obligations, or promises of payment for awards, made by an agency or agencies.
                </li>
                <li>
                    The ‘Award Outlays’ column represents all award outlays, or actual payments for awards, made by an agency or agencies
                </li>
                <li>
                    The ‘Award Obligations (Loan Subsidy Cost)’ and ‘Award Outlays (Loan Subsidy Cost)’ columns represent unusual types of obligations and outlays. Loan Subsidy Cost is the calculated net present value of the loan or loan guarantee to the government, taking into account the size of the loan (i.e., its face value), interest rate, and the modeled risk of the recipient failing to pay back the loan in part or full.
                    <strong> Loan Subsidy Cost does have direct budgetary impact and is factored into obligations and outlays when it is positive.</strong> Subsidy costs can be positive (indicating that the government is likely to lose money on the loan) or negative (indicating that the government is likely to make money on the loan). Loan Subsidy Cost should never be larger in absolute value terms than the Face Value of Loans itself. Administrative costs of running the loan or loan guarantee program itself are excluded from Loan Subsidy Cost calculations.
                </li>
                <li>
                    The ‘Face Value of Loans’ column represents the amount that agencies have directly issued (for direct loans) or facilitated by compensating the lender if the borrower defaults (for loan guarantees). From a budget perspective, Face Value of Loans is not considered federal spending, since it does not in itself represent a long-term cost to the government. As a result, <strong>Face Value of Loans is not included in any obligation or outlay figure.</strong>
                </li>
            </ul>
        </div>
    </div>
);

export const AwardSpendingCfdaTT = () => (
    <div className="covid-profile-tt">
        <h2 className="tooltip__title">Award Spending by Assistance Listing (CFDA Programs))</h2>
        <div className="tooltip__text ul-override">
            <p>
                This section shows a breakdown of award spending according to CFDA Program.
            </p><br />
            <p>
                When counts appear next to the award type filters (e.g., ‘All Assistance Awards’, ‘Grants’, etc.), they refer to the number of CFDA Programs associated with that type of award. Note that the count associated with ‘All Assistance Awards’ is not necessarily the sum of the remaining counts. For example, a given CFDA Program may be counted individually across two award type categories (such as ‘Loans’ and ‘Direct Payments’), but would only be counted once under ‘All Assistance Awards’ (rather than twice, once for each of those two categories).
            </p><br />
            <p>
                When viewing table results:
            </p><br />
            <ul>
                <li>
                    The ‘Award Obligations’ column represents all award obligations, or promises of payment for awards, made by an agency or agencies.
                </li>
                <li>
                    The ‘Award Outlays’ column represents all award outlays, or actual payments for awards, made by an agency or agencies
                </li>
                <li>
                    The ‘Award Obligations (Loan Subsidy Cost)’ and ‘Award Outlays (Loan Subsidy Cost)’ columns represent unusual types of obligations and outlays. Loan Subsidy Cost is the calculated net present value of the loan or loan guarantee to the government, taking into account the size of the loan (i.e., its face value), interest rate, and the modeled risk of the recipient failing to pay back the loan in part or full.
                    <strong> Loan Subsidy Cost does have direct budgetary impact and is factored into obligations and outlays when it is positive.</strong> Subsidy costs can be positive (indicating that the government is likely to lose money on the loan) or negative (indicating that the government is likely to make money on the loan). Loan Subsidy Cost should never be larger in absolute value terms than the Face Value of Loans itself. Administrative costs of running the loan or loan guarantee program itself are excluded from Loan Subsidy Cost calculations.
                </li>
                <li>
                    The ‘Face Value of Loans’ column represents the amount that agencies have directly issued (for direct loans) or facilitated by compensating the lender if the borrower defaults (for loan guarantees). From a budget perspective, Face Value of Loans is not considered federal spending, since it does not in itself represent a long-term cost to the government. As a result, <strong>Face Value of Loans is not included in any obligation or outlay figure.</strong>
                </li>
            </ul>
        </div>
    </div>
);

export const AwardSpendingTT = () => (
    <div className="covid-profile-tt">
        <h2 className="tooltip__title">Award Spending</h2>
        <div className="tooltip__text">
            <p>
                Award Spending refers to money given through contracts or financial assistance to individuals, organizations, businesses, or state, local, or tribal governments.
            </p><br />
            <p>
                Award Spending is a portion of Total Spending, also known as Account Spending, which refers to the totality of agency obligations and outlays, including agency expenses.
            </p>
        </div>
    </div>
);

export const SpendingByRecipientTT = () => (
    <div className="covid-profile-tt">
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
                    <strong> Loan Subsidy Cost does have direct budgetary impact and is factored into obligations and outlays when it is positive.</strong> Subsidy costs can be positive (indicating that the government is likely to lose money on the loan) or negative (indicating that the government is likely to make money on the loan). Loan Subsidy Cost should never be larger in absolute value terms than the Face Value of Loans itself. Administrative costs of running the loan or loan guarantee program itself are excluded from Loan Subsidy Cost calculations.
                </li>
                <li>
                    The ‘Face Value of Loans’ column represents the amount that agencies have directly issued (for direct loans) or facilitated by compensating the lender if the borrower defaults (for loan guarantees). From a budget perspective, Face Value of Loans is not considered federal spending, since it does not in itself represent a long-term cost to the government. As a result, <strong>Face Value of Loans is not included in any obligation or outlay figure.</strong>
                </li>
            </ul>
        </div>
    </div>
);

export const SpendingByRecipientMapTT = () => (
    <div className="spending_types-tt">
        <h2 className="tooltip__title">Recipient Map</h2>
        <div className="tooltip__text">
            <p>
                Use the dropdown to filter spending amounts on the map.
            </p><br />
            <p>
                <strong>Total Spending</strong> refers to the full amount of dollars spent in each location type (i.e., state, county, or congressional district).
            </p><br />
            <p>
                <strong>Per Capita Spending</strong> refers to the total amount spent in each location type divided by the population of that area. This spending type makes it easier to compare amounts across different locations, since spending usually scales by the population of a region. Population data for states, counties, and congressional districts are sourced from U.S. Census 2018 estimates.
            </p>
        </div>
    </div>
);

export const SpendingTypesTT = () => (
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
                <strong> Loan Subsidy Cost does have direct budgetary impact and is factored into obligations and outlays when it is positive. </strong>
                Subsidy costs can be positive (indicating that the government is likely to lose money on the loan) or negative (indicating that the government is likely to make money on the loan).
                Loan Subsidy Cost should never be larger in absolute value terms than the Face Value of Loans itself. Administrative costs of running the loan or loan guarantee program itself are excluded from Loan Subsidy Cost calculations.
            </p>
        </div>
    </div>
);

export const TotalSpendingTT = () => (
    <div className="covid-profile-tt">
        <h2 className="tooltip__title"> Total Spending</h2>
        <div className="tooltip__text">
            <p>
                Total Spending, also known as Account Spending, refers to the totality of agency obligations and outlays, including agency expenses.
            </p>
        </div>
    </div>
);

import React from 'react';

export const recipientOverviewLoanInfo = (
    <div className="recipient-overview-tooltip">
        <div className="tooltip__title">
            Face Value of Loans
        </div>
        <div className="tooltip__text">
            <p>
                From a budget perspective, loan face value is not considered Federal spending, since it does not in itself represent a long-term cost to the government. As a result, loan face value dollars <u>are not</u> included in the Total Awarded Amount figure above or any other part of this page where dollar amounts appear.
            </p>
            <p>
                What <u>is</u> included from a loan perspective in Total Awarded Amount and the other dollar figures is the loan subsidy cost, which <u>is</u> considered actual budgetary federal spending. Subsidy cost is the calculated net present value of the loan or loan guarantee to the government, taking into account the size of the loan (face value), interest rate, and the modeled risk of the recipient failing to pay back the loan in part or full; subsidy cost can be positive (indicating that the government is likely to lose money on the loan) or negative (indicating that the government is likely to make money on the loan). Subsidy cost should never be larger in absolute value terms than the face value itself. Administrative costs of running the loan or loan guarantee program itself are excluded from subsidy cost calculations.
            </p>
            <p>
                As stated above, all subsidy costs associated with loans this recipient has received during the filtered time period are captured within the &quot;Total Awarded Amount&quot; number above and anywhere else on this page dollar amounts are mentioned.
            </p>
        </div>
    </div>
);

export const recipientCongressionalDistrict = (title) => (
    <div className="recipient-congressional-district-tooltip">
        <div className="tooltip__title">
            {title}
        </div>
        <div className="tooltip__text">
            <p className="congressional-district-tooptip__body">
            The congressional districts displayed reflect their current geographic boundaries and are based on the 2020 Census. These districts will be in effect from 2023 – 2033.*
            </p>
            <p className="congressional-district-tooltip__body">
            Additional information on congressional districts and how they are displayed on the site can be found within the Congressional District section of the <span className="congressional-district__span">About the Data</span> module under <span className="congressional-district__span">Resources</span>.
            </p>
            <p className="congressional-district-tooptip__italics">
            *Court-ordered redistricting might alter the time frame a congressional district is in effect.
            </p>
        </div>
    </div>
);


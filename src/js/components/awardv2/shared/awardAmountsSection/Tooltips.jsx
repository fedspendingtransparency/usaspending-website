import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    total: PropTypes.string,
    count: PropTypes.number
};

export const ObligatedAmountTooltip = () => (
    <div className="combined-obligated-tt">
        <h4 className="tooltip__title">Obligated Amount</h4>
        <div className="tooltip__text">
            <p>This is the amount that has been obligated, or promised by the government, to be paid to the recipient.</p>
        </div>
    </div>
);

export const CurrentAmountTooltip = () => (
    <div className="combined-obligated-tt">
        <h4 className="tooltip__title">Current Award Amount</h4>
        <div className="tooltip__text">
            <p>This is the amount currently available for obligation based on the currently-exercised options of this contract.</p>
        </div>
    </div>
);

export const ExceedsCurrentAmountTooltip = () => (
    <div className="combined-obligated-tt">
        <h4 className="tooltip__title">Exceeds Current Award Amount</h4>
        <div className="tooltip__text">
            <p>This amount indicates how much this award has been over-obligated against its current award amount.</p>
        </div>
    </div>
);

export const PotentialAmountTooltip = () => (
    <div className="combined-obligated-tt">
        <h4 className="tooltip__title">Potential Award Amount</h4>
        <div className="tooltip__text">
            <p>This is the potential amount available to obligate if all of the contract  options are exercised. You can think of this as the maximum award amount (sometimes referred to as the ceiling amount or capacity of the contract).</p>
        </div>
    </div>
);

export const ExceedsPotentialAmountTooltip = () => (
    <div className="combined-obligated-tt">
        <h4 className="tooltip__title">Exceeds Potential Award Amount</h4>
        <div className="tooltip__text">
            <p>This amount indicates how much this award has been over-obligated against its potential award amount.</p>
        </div>
    </div>
);

export const TotalFundingTooltip = () => (
    <div className="combined-obligated-tt">
        <h4 className="tooltip__title">Total Funding</h4>
        <div className="tooltip__text">
            <p>This is the sum of the federal action obligation and the non-federal funding amounts.</p>
        </div>
    </div>
);

export const NonFederalFundingTooltip = () => (
    <div className="combined-obligated-tt">
        <h4 className="tooltip__title">Non-Federal Funding</h4>
        <div className="tooltip__text">
            <p>This is the total amount of the award funded by non-federal source(s).</p>
        </div>
    </div>
);

export const SubsidyTooltip = () => (
    <div className="combined-obligated-tt">
        <h4 className="tooltip__title">Original Subsidy Cost</h4>
        <div className="tooltip__text">
            <p>This is the total estimated long-term cost to the Government of the direct loan or loan guarantee, excluding administrative costs.</p>
        </div>
    </div>
);

export const FaceValueTooltip = () => (
    <div className="combined-obligated-tt">
        <h4 className="tooltip__title">Face Value of Direct Loan or Loan Guarantee</h4>
        <div className="tooltip__text">
            <p>This is the full amount of the loan/loan guarantee awarded to the recipient.</p>
        </div>
    </div>
);

// IDVs:

export const CombinedObligatedAmounts = ({
    total,
    count
}) => (
    <div className="combined-obligated-tt">
        <h4 className="tooltip__title">Combined Obligated Amounts</h4>
        <h5 className="tooltip__amount"><span>{total}</span> from <span>{`${count} award orders`}</span></h5>
        <div className="tooltip__text">
            <p>This amount is how much money has been obligated, or promised by the government, to be paid to the recipients for all the award orders underneath this indefinite delivery vehicle (IDV), including both child award orders* and grandchild award orders* nested under a child IDV order* (if any). This does not include obligations directly attached to any child IDV orders*, or to the IDV itself*.</p>
        </div>
        <ul className="tooltip__list">
            <li><strong>*Child award order</strong> refers to award orders made directly under this IDV (IDV &gt; Award).</li>
            <li><strong>*Child IDV order</strong> refers to IDVs made directly under this IDV (IDV &gt; IDV).</li>
            <li><strong>*Grandchild award order</strong> refers to award orders made within a child IDV order (IDV &gt; IDV &gt; Award).</li>
            <li><strong>*IDV itself</strong> refers to the top-level IDV this page is summarizing, not including any of its child award orders or child IDV orders.</li>
        </ul>
    </div>
);

CombinedObligatedAmounts.propTypes = {
    total: PropTypes.string,
    count: PropTypes.number
};

export const CombinedCurrentAmounts = ({
    total,
    count
}) => (
    <div className="combined-obligated-tt">
        <h4 className="tooltip__title">Combined Current Award Amounts</h4>
        <h5 className="tooltip__amount"><span>{total}</span> from <span>{`${count} award orders`}</span></h5>
        <div className="tooltip__text">
            <p>Collectively, this is how much money is currently available across all award orders made underneath this indefinite delivery vehicle (IDV), including both child award orders* and grandchild award orders* made under a child IDV order* (if any).  The maximum amount available is calculated by adding the “Total Base & Exercised Options” amount (also known as the contract ceiling amount or current award amount) across each award order underneath this IDV. This does not include obligations directly attached to any child IDV orders*, or to the IDV itself*.</p>
        </div>
        <ul className="tooltip__list">
            <li><strong>*Child award order</strong> refers to award orders made directly under this IDV (IDV &gt; Award).</li>
            <li><strong>*Child IDV order</strong> refers to IDVs made directly under this IDV (IDV &gt; IDV).</li>
            <li><strong>*Grandchild award order</strong> refers to award orders made within a child IDV order (IDV &gt; IDV &gt; Award).</li>
            <li><strong>*IDV itself</strong> refers to the top-level IDV this page is summarizing, not including any of its child award orders or child IDV orders.</li>
        </ul>
    </div>
);

CombinedCurrentAmounts.propTypes = {
    total: PropTypes.string,
    count: PropTypes.number
};

export const CombinedPotentialAmounts = ({
    total,
    count
}) => (
    <div className="combined-potential-tt">
        <h4 className="tooltip__title">Combined Potential Award Amounts</h4>
        <h5 className="tooltip__amount"><span>{total}</span> from <span>{`${count} award orders`}</span></h5>
        <div className="tooltip__text">
            <p>This is the collective potential award amount of all of the award orders underneath this indefinite delivery vehicle (IDV), if all contract options are exercised.  You can think of this as the collective maximum award amount of all of the award orders made underneath this IDV, or the total award capacity of this IDV. This does not include obligations directly attached to any child IDV orders*, or to the IDV itself*.</p>
        </div>
        <ul className="tooltip__list">
            <li><strong>*Child IDV order</strong> refers to IDVs made directly under this IDV (IDV &gt; IDV).</li>
            <li><strong>*IDV itself</strong> refers to the top-level IDV this page is summarizing, not including any of its child award orders or child IDV orders.</li>
        </ul>
    </div>
);

CombinedPotentialAmounts.propTypes = {
    total: PropTypes.string,
    count: PropTypes.number
};

export const CombinedExceedsPotentialAmounts = ({
    total,
    count
}) => (
    <div className="combined-exceeds-potential-tt">
        <h4 className="tooltip__title">Exceeds Combined Potential Award Amounts</h4>
        <h5 className="tooltip__amount"><span>{total}</span> from <span>{`${count} award orders`}</span></h5>
        <div className="tooltip__text">
            <p>The award orders made underneath this indefinite delivery vehicle (IDV) have a combined obligated amount that exceeds their combined potential award amounts. In other words, collectively speaking, the award orders underneath this IDV have obligated more money than what is ultimately available to spend if all options are exercised (their combined potential award amount).</p>
            <p>This can occur because of missing data, errors in the data, or violations of procurement policy.</p>
        </div>
    </div>
);

CombinedExceedsPotentialAmounts.propTypes = {
    total: PropTypes.string,
    count: PropTypes.number
};

export const CombinedExceedsCurrentAmounts = ({
    total,
    count
}) => (
    <div className="combined-exceeds-current-tt">
        <h4 className="tooltip__title">Exceeds Combined Current Award Amount</h4>
        <h5 className="tooltip__amount"><span>{total}</span> from <span>{`${count} award orders`}</span></h5>
        <div className="tooltip__text">
            <p>The award orders underneath this indefinite delivery vehicle (IDV) have a combined obligated amount that exceeds their combined current award amount. In other words, collectively speaking, the award orders under this IDV have obligated more money than what was made available to spend at this time (their combined current award amounts or combined contract ceilings).</p>
            <p>This can occur because of missing data, errors in the data, or violations of procurement policy.</p>
        </div>
    </div>
);

CombinedExceedsCurrentAmounts.propTypes = {
    total: PropTypes.string,
    count: PropTypes.number
};

ObligatedAmountTooltip.propTypes = propTypes;
CurrentAmountTooltip.propTypes = propTypes;
PotentialAmountTooltip.propTypes = propTypes;

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

ObligatedAmountTooltip.propTypes = propTypes;
CurrentAmountTooltip.propTypes = propTypes;
PotentialAmountTooltip.propTypes = propTypes;

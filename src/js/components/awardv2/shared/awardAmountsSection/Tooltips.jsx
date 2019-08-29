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
// export const ExceedsCurrentAmount = () => (
//     <div className="combined-obligated-tt">
//         <h4 className="tooltip__title">Combined Obligated Amounts</h4>
//         <h5 className="tooltip__amount"><span>{total}</span> from <span>{`${count} award orders`}</span></h5>
//         <div className="tooltip__text">
//             <p>This is the amount that has been obligated, or promised by the government, to be paid to the recipient.</p>
//         </div>
//     </div>
// );
export const PotentialAmountTooltip = () => (
    <div className="combined-obligated-tt">
        <h4 className="tooltip__title">Potential Award Amount</h4>
        <div className="tooltip__text">
            <p>This is the potential amount available to obligate if all of the contract  options are exercised. You can think of this as the maximum award amount (sometimes referred to as the ceiling amount or capacity of the contract).</p>
        </div>
    </div>
);
// export const ExceedsPotentialAmount = () => (
//     <div className="combined-obligated-tt">
//         <h4 className="tooltip__title">Combined Obligated Amounts</h4>
//         <h5 className="tooltip__amount"><span>{total}</span> from <span>{`${count} award orders`}</span></h5>
//         <div className="tooltip__text">
//             <p>This is the amount that has been obligated, or promised by the government, to be paid to the recipient.</p>
//         </div>
//     </div>
// );

ObligatedAmountTooltip.propTypes = propTypes;
CurrentAmountTooltip.propTypes = propTypes;
PotentialAmountTooltip.propTypes = propTypes;

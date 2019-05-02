import React from 'react';
import PropTypes from 'prop-types';

export const CombinedObligatedAmounts = ({
    total,
    count
}) => (
    <div className="combined-obligated-tt">
        <div className="tooltip__title">Combined Obligated Amounts</div>
        <div className="tooltip__amount">{`${total} from ${count}`}<strong>awards</strong></div>
        <div className="tooltip__text">
            <p>This amount is how much money has been obligated, or promised by the government, to be paid to the recipients for all the award orders underneath this indefinite delivery vehicle (IDV), including both child award orders* and grandchild award orders* nested under a child IDV order* (if any). This does not include obligations directly attached to any child IDV orders*, or to the IDV itself*.</p>
            <p>*Child award order refers to award orders made directly under this IDV (IDV => Award).</p>
            <p>*Child IDV order refers to IDVs made directly under this IDV (IDV => IDV).</p>
            <p>*Grandchild award order refers to award orders made within a child IDV order (IDV => IDV => Award).</p>
            <p>*IDV itself refers to the top-level IDV this page is summarizing, not including any of its child award orders or child IDV orders.</p>
        </div>
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
        <div className="tooltip__title">Combined Current Award Amounts</div>
        <div className="tooltip__amount">{`${total} from ${count}`}<strong>awards</strong></div>
        <div className="tooltip__text">
            <p>Collectively, this is how much money is currently available across all award orders made underneath this indefinite delivery vehicle (IDV), including both child award orders* and grandchild award orders* made under a child IDV order* (if any).  The maximum amount available is calculated by adding the “Total Base & Exercised Options” amount (also known as the contract ceiling amount or current award amount) across each award order underneath this IDV. This does not include obligations directly attached to any child IDV orders*, or to the IDV itself.</p>
            <p>*Child award order refers to award orders made directly under this IDV (IDV => Award).</p>
            <p>*Child IDV order refers to IDVs made directly under this IDV (IDV => IDV).</p>
            <p>*Grandchild award order refers to award orders made within a child IDV order (IDV => IDV => Award).</p>
            <p>*IDV itself refers to the top-level IDV this page is summarizing, not including any of its child award orders or child IDV orders.</p>
        </div>
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
        <div className="tooltip__title">Combined Potential Award Amounts</div>
        <div className="tooltip__amount">{`${total} from ${count}`} <strong>awards</strong></div>
        <div className="tooltip__text">
            <p>This is the collective potential award amount of all of the award orders underneath this indefinite delivery vehicle (IDV), if all contract options are exercised.  You can think of this as the collective maximum award amount of all of the award orders made underneath this IDV, or the total award capacity of this IDV. This does not include obligations directly attached to any child IDV orders*, or to the IDV itself.</p>
            <p>*Child IDV order refers to IDVs made directly under this IDV (IDV => IDV).</p>
            <p>*IDV itself refers to the top-level IDV this page is summarizing, not including any of its child award orders or child IDV orders.</p>
        </div>
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
    <div className="combined-exceeded-potential-tt">
        <div className="tooltip__title">Exceeds Combined Potential Award Amounts</div>
        <div className="tooltip__amount">{`${total} from ${count}`} <strong>awards</strong></div>
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
    <div className="combined-exceeded-potential-tt">
        <div className="tooltip__title">Exceeds Combined Current Award Amount</div>
        <div className="tooltip__amount">{`${total} from ${count}`} <strong>awards</strong></div>
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

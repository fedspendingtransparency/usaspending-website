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
            <p>This amount is how much money has been obligated or promised by the government, to be paid to the recipeint from all of the awards in this IDV</p>
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
        <div className="tooltip__title">Combined Current Amounts</div>
        <div className="tooltip__amount">{`${total} from ${count}`}<strong>awards</strong></div>
        <div className="tooltip__text">
            <p>BLAH BLAH BLAH</p>
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
        <div className="tooltip__title">Combined Potential Amounts</div>
        <div className="tooltip__amount">{`${total} from ${count}`} <strong>awards</strong></div>
        <div className="tooltip__text">
            <p>This is a description of what the data means etc etc etc</p>
        </div>
    </div>
);

CombinedPotentialAmounts.propTypes = {
    total: PropTypes.string,
    count: PropTypes.number
};

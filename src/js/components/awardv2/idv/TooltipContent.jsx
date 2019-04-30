import React from 'react';
import PropTypes from 'prop-types';

export const CombinedObligatedAmounts = ({
    total,
    count
}) => (
    <div className="combined-obligated-tt">
        <div className="tooltip__title">Cobmined Obligated Amounts</div>
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

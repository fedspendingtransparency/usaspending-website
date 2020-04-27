import React from 'react';
import PropTypes from 'prop-types';

const prop = {
    amount: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string
};
// eslint-disable-next-line import/prefer-default-export
export const RectanglePercentVizTooltip = ({ amount, title, description }) => (
    <div className="award-amounts-tt">
        <h4 className="tooltip__title">{title}</h4>
        <h5 className="tooltip__amount--loans">{amount}</h5>
        {description &&
        <div className="tooltip__text">
            <p>{description}</p>
        </div>}
    </div>
);

RectanglePercentVizTooltip.propTypes = prop;

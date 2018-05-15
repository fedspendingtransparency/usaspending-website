import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    value: PropTypes.string,
    label: PropTypes.string
};

const TooltipItem = (props) => (
    <li>
        <div className="tooltip-item">
            <div className="item-value">
                {props.value}
            </div>
            <div className="item-label">
                {props.label}
            </div>
        </div>
    </li>
);

TooltipItem.propTypes = propTypes;

export default TooltipItem;

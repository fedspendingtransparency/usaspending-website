
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ])
};

const CheckboxTreeLabel = ({
    value,
    label
}) => (
    <div className="checkbox-tree-label">
        <div className="checkbox-tree-label__value-container">
            <div className="checkbox-tree-label__value-container-value">
                {value}
            </div>
        </div>
        <div className="checkbox-tree-label__label">
            {label}
        </div>
    </div>
);

CheckboxTreeLabel.propTypes = propTypes;
export default CheckboxTreeLabel;

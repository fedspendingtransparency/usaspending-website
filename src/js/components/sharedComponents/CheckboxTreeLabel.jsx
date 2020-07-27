
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
    ]),
    count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    displayId: PropTypes.bool,
    countLabel: PropTypes.string,
    labelClassName: PropTypes.string,
    subLabel: PropTypes.string
};

const CheckboxTreeLabel = ({
    value,
    label,
    count,
    displayId = true,
    countLabel = '',
    labelClassName = '',
    subLabel = null
}) => {
    const countText = count > 1 ? 'codes' : 'code';
    const countDisplay = countLabel === '' ? countText : countLabel;
    const className = labelClassName ? ` ${labelClassName}` : '';
    return (
        <div className={`checkbox-tree-label${className}`}>
            {displayId && (
                <div className="checkbox-tree-label__value-container">
                    <div className="checkbox-tree-label__value-container-value">
                        {value}
                    </div>
                    <div className="checkbox-tree-label__value-container-count">
                        {count ? `${count} ${countDisplay}` : ''}
                    </div>
                </div>
            )}
            <div className="checkbox-tree-label__label">
                {label}
                {subLabel && (
                    <>
                        <br />
                        <span>{subLabel}</span>
                    </>
                )}
            </div>
        </div>
    );
};

CheckboxTreeLabel.propTypes = propTypes;
export default CheckboxTreeLabel;

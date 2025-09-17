
import React from 'react';
import PropTypes from 'prop-types';
import replaceString from 'helpers/replaceString';

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
    subLabel: PropTypes.string,
    searchString: PropTypes.string
};

const CheckboxTreeLabel = ({
    value,
    label,
    count,
    displayId = true,
    countLabel = '',
    labelClassName = '',
    subLabel = null,
    searchString
}) => {
    const countText = count > 1 ? 'codes' : 'code';
    const countDisplay = countLabel === '' ? countText : countLabel;
    const className = labelClassName ? ` ${labelClassName}` : '';
    const highlightText = (text) => replaceString(text, searchString, 'highlight');

    return (
        <div className={`checkbox-tree-label${className}`}>
            {displayId && (
                <div className="checkbox-tree-label__value-container">
                    <div className="checkbox-tree-label__value-container-value">
                        {highlightText(value)}
                    </div>
                    <div className="checkbox-tree-label__value-container-count">
                        {count ? `${count} ${countDisplay}` : ''}
                    </div>
                </div>
            )}
            {label && (
                <div className="checkbox-tree-label__label">
                    {highlightText(label)}
                    {subLabel && (
                        <>
                            <br />
                            {highlightText(subLabel)}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

CheckboxTreeLabel.propTypes = propTypes;
export default CheckboxTreeLabel;

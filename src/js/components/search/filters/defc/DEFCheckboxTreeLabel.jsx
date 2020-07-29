import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

const DEFCheckboxTreeLabel = ({
    label,
    subLabel,
    value
}) => {
    if (label.includes('|')) {
        const labels = label.split('|');
        const subLabels = subLabel.split('|');
        return (
            <div className="checkbox-tree-label">
                <div className="checkbox-tree-label__value-container">
                    <div className="checkbox-tree-label__value-container-value">
                        {value}
                    </div>
                </div>
                {labels.map((lbl, i) => (
                    <div key={uniqueId(i)} className="checkbox-tree-label__label multiple-label">
                        {lbl}
                            <>
                                <br />
                                <span>{subLabels[i]}</span>
                                <br />
                            </>
                    </div>
                ))}
            </div>
        );
    }
    return (
        <div className="checkbox-tree-label">
            <div className="checkbox-tree-label__value-container">
                <div className="checkbox-tree-label__value-container-value">
                    {value}
                </div>
            </div>
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

DEFCheckboxTreeLabel.propTypes = {
    label: PropTypes.string,
    subLabel: PropTypes.string,
    value: PropTypes.string
};

export default DEFCheckboxTreeLabel;

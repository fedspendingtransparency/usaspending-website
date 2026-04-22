import React from 'react';
import PropTypes from 'prop-types';

const parseAcronym = (str) => {
    const parsedStr = str.replace("P.L.", "Public Law");
    if (parsedStr.includes("P.L.")) return parseAcronym(parsedStr);
    return parsedStr;
};

const DEFCheckboxTreeDownloadLabel = ({
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
                        <span className="checkbox-tree-label__value-container-spacer"> - </span>
                    </div>
                    <div key={value} className="multi-label-level">
                        {labels.map((lbl, i) => (
                            <>
                                <span
                                    className="checkbox-tree-label__value-container-label">
                                    {lbl}
                                </span>
                                <div className="checkbox-tree-label__value-container-sub-label">
                                    <span>{parseAcronym(subLabels[i])}</span>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkbox-tree-label">
            <div className="checkbox-tree-label__value-container">
                <div className="checkbox-tree-label__value-container-value">
                    {value}
                    <span className="checkbox-tree-label__value-container-label">
                        {` - ${label}`}
                    </span>
                    {subLabel && (
                        <div className="checkbox-tree-label__value-container-sub-label">
                            <span>{parseAcronym(subLabel)}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

DEFCheckboxTreeDownloadLabel.propTypes = {
    label: PropTypes.string,
    subLabel: PropTypes.string,
    value: PropTypes.string
};

export default DEFCheckboxTreeDownloadLabel;

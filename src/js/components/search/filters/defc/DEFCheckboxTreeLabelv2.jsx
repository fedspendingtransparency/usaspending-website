import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash-es';
import replaceString from '../../../../helpers/replaceString';

const parseAcronym = (str) => {
    const parsedStr = str.replace("P.L.", "Public Law");
    if (parsedStr.includes("P.L.")) return parseAcronym(parsedStr);
    return parsedStr;
};

const DEFCheckboxTreeLabel = ({
    label,
    subLabel,
    value,
    defSearchString
}) => {
    const highlightText = (text) => replaceString(text, defSearchString, 'highlight');

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
                        {highlightText(lbl)}
                        <>
                            <br />
                            <span>{highlightText(parseAcronym(subLabels[i]))}</span>
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
                {highlightText(label)}
                {subLabel && (
                    <>
                        <br />
                        <span>{highlightText(parseAcronym(subLabel))}</span>
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

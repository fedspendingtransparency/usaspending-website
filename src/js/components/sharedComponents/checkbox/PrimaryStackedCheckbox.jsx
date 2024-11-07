/**
 * PrimaryStackedCheckbox.jsx
 * Created by Brian Petway on 11/07/24.
 */

import React from 'react';

import PrimaryCheckboxType from 'components/sharedComponents/checkbox/PrimaryCheckboxType';
import PropTypes from "prop-types";

const propTypes = {
    checkboxLabel: PropTypes.string,
    checkboxLabelContent: PropTypes.string,
    subheadingLabel: PropTypes.string,
    subheadingLabelContent: PropTypes.string,
    itemName: PropTypes.string,
    itemLabelAfterName: PropTypes.string,
    index: PropTypes.number,
    toggleRecipient: PropTypes.func
};

const PrimaryStackedCheckbox = ({
    checkboxLabel,
    checkboxLabelContent,
    subheadingLabel,
    subheadingLabelContent,
    itemName,
    itemLabelAfterName,
    index,
    toggleRecipient
}) => (
    <div className="stacked-checkbox__container">
        <PrimaryCheckboxType
            name={(
                <div className="stacked-checkbox__checkbox-label">
                    <span>{checkboxLabel}</span>{checkboxLabelContent}
                </div>)}
            value={`primary-checkbox-${index}`}
            key={checkboxLabelContent}
            toggleCheckboxType={toggleRecipient} />

        <div className="stacked-checkbox__lower-container">
            <div
                className="stacked-checkbox__subheading-label">{subheadingLabel} {subheadingLabelContent}
            </div>
            <div className="stacked-checkbox__name-container">
                <span className="stacked-checkbox__item-name">{itemName}</span>
                <span className="stacked-checkbox__item-label-after-name">{itemLabelAfterName}</span>
            </div>
        </div>
    </div>
);

PrimaryStackedCheckbox.propTypes = propTypes;
export default PrimaryStackedCheckbox;

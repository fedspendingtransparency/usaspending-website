/**
 * StackedCheckboxList.jsx
 * Created by Brian Petway on 11/06/24.
 */

import React from 'react';
import PropTypes from "prop-types";

import PrimaryCheckboxType from 'components/sharedComponents/checkbox/PrimaryCheckboxType';

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

const StackedCheckboxList = ({
    checkboxLabel,
    checkboxLabelContent,
    subheadingLabel,
    subheadingLabelContent,
    itemName,
    itemLabelAfterName,
    index,
    toggleRecipient
}) => (
    <div className="stacked-checkbox-list__container">
        <PrimaryCheckboxType
            name={(<div className="stacked-checkbox-list__checkbox-label"> <span>{checkboxLabel}</span>{checkboxLabelContent}</div>)}
            value={`primary-checkbox-${index}`}
            key={checkboxLabelContent}
            toggleCheckboxType={toggleRecipient} />
        <div className="stacked-checkbox-list__lower-container">
            <div className="stacked-checkbox-list__subheading-label">{subheadingLabel} {subheadingLabelContent}</div>
            <div className="stacked-checkbox-list__name-container">
                <span className="stacked-checkbox-list__item-name">{itemName}</span>
                <span className="stacked-checkbox-list__item-label-after-name">{itemLabelAfterName}</span>
            </div>
        </div>
    </div>
);

StackedCheckboxList.propTypes = propTypes;
export default StackedCheckboxList;

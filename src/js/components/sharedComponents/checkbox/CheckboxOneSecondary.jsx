/**
 * CheckboxOnePrimary.jsx
 * Created by Josue Aguilar on 09/11/2024.
 */

import React from "react";
import PropTypes from "prop-types";

const propTypes = {
    category: PropTypes.object,
    selectedTypes: PropTypes.object,
    toggleCheckboxType: PropTypes.func,
    recipientTypes: PropTypes.object
};

const CheckboxOneSecondary = ({
    category, selectedTypes, toggleCheckboxType, recipientTypes, expanded
}) => {
    const selectRecipientType = (type) => {
        const selection = {
            value: type
        };
        toggleCheckboxType(selection);
    };

    return expanded &&
        category.filters?.map((type, index) => (
            <label className="checkbox-filter__item">
                <input
                    type="checkbox"
                    id={`primary-checkbox-${index}`}
                    value={type}
                    checked={selectedTypes?.has(type)}
                    onChange={() => selectRecipientType(type)} />
                <span className="checkbox-filter__item-label">{recipientTypes[type]}</span>
            </label>));
};

CheckboxOneSecondary.propTypes = propTypes;

export default CheckboxOneSecondary;

import React from "react";
import PropTypes from "prop-types";

const propTypes = {
    category: PropTypes.object,
    selectedTypes: PropTypes.object,
    toggleCheckboxType: PropTypes.func,
    recipientTypes: PropTypes.object
};

const RecipientTypeList = ({
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
                <label className="recipient-type-filter__item">
                    <input
                        type="checkbox"
                        id={`primary-checkbox-${index}`}
                        value={type}
                        checked={selectedTypes?.has(type)}
                        onChange={() => selectRecipientType(type)} />
                    <span className="label">{recipientTypes[type]}</span>
                </label>));
};

RecipientTypeList.propTypes = propTypes;
export default RecipientTypeList;

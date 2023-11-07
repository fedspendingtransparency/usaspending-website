import React, { useState } from "react";
import PropTypes from "prop-types";

const propTypes = {
    category: PropTypes.object,
    selectedTypes: PropTypes.object,
    toggleCheckboxType: PropTypes.func,
    recipientTypes: PropTypes.object
};

const RecipientTypeAccordion = ({
    category, selectedTypes, toggleCheckboxType, recipientTypes, expanded
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const selectRecipientType = (type) => {
        const selection = {
            value: type
        };
        toggleCheckboxType(selection);
    };

    return (
        expanded &&
                category.filters?.map((type, index) =>
                    (<div><input
                        type="checkbox"
                        id={`primary-checkbox-${index}`}
                        value={type}
                        checked={selectedTypes?.has(type)}
                        onChange={() => selectRecipientType(type)} />
                    <span>{recipientTypes[type]}</span>
                    </div>)
                )
    );
};

RecipientTypeAccordion.propTypes = propTypes;
export default RecipientTypeAccordion;

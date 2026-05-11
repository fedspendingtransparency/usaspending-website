import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const propTypes = {
    category: PropTypes.string,
    toggleExpanded: PropTypes.func,
    expanded: PropTypes.bool
};

const CheckboxChevron = ({
    category,
    toggleExpanded,
    expanded
}) => {
    const icon = expanded ? "chevron-down" : "chevron-right";
    const buttonAriaLabel = expanded ? 'Close toggle' : 'Open toggle';
    const onClick = () => toggleExpanded(category);

    const onKeydown = (e) => {
        e.stopPropagation();
        if (e.type === 'change' || e?.key === 'Enter') {
            onClick();
        }
    };


    return (
        <button
            onClick={onClick}
            onKeyDown={onKeydown}
            className="toggle"
            aria-label={buttonAriaLabel}>
            <FontAwesomeIcon
                icon={icon}
                key={`${category}-${expanded ? "close" : "open"}`} />
        </button>
    );
};

CheckboxChevron.propTypes = propTypes;
export default CheckboxChevron;

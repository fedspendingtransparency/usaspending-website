import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import useEventListener from "../../../hooks/useEventListener";

const propTypes = {
    category: PropTypes.string,
    toggleExpanded: PropTypes.func,
    icon: PropTypes.string
};

const CheckboxChevron = ({
    category,
    toggleExpanded,
    icon = 'chevron-right'
}) => {
    const iconRef = useRef(null);
    const onClick = () => toggleExpanded(category);

    const onKeydown = (e) => {
        e.stopPropagation();
        if (e.type === 'change' || e?.key === 'Enter') {
            onClick();
        }
    };

    useEventListener('keydown', onKeydown, iconRef);

    return (
        <FontAwesomeIcon
            onClick={onClick}
            tabIndex={0}
            icon={icon}
            ref={iconRef} />
    );
};

CheckboxChevron.propTypes = propTypes;
export default CheckboxChevron;

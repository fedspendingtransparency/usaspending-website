import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const propTypes = {
    title: PropTypes.string,
    children: PropTypes.string,
    index: PropTypes.string,
    onMouseEnter: PropTypes.string
}

const MenuItem = ({
    title,
    children,
    index,
    onMouseEnter
}) => {
    let iconAlt = 'Collapsed menu';
    let navChevronDirection = "chevron-down";

    if (document.querySelector(`button.navbar-item-title-${index}:hover`) != null ||
        document.querySelector(`button.navbar-item-title-${index}:active`) != null) {
        iconAlt = 'Expanded menu';
        navChevronDirection = "chevron-up";
    }

    return (
        <li className="navbar-item-el">
            <button
                className={`navbar-item-title navbar-item-title-${index}${
                    navChevronDirection === "chevron-up" ? " navbar-item-title-hover" : ""
                }`}
                onMouseEnter={() => onMouseEnter(index)}
                onFocus={() => onMouseEnter(index)}>
                {title}
                <div className="navbar-chevron-icon">
                    <FontAwesomeIcon icon={navChevronDirection} alt={iconAlt} />
                </div>
            </button>
            <div className={`dropdown-slot dropdown-slot-${index}`}>{children}</div>
        </li>
    );
};

MenuItem.propTypes = propTypes;
export default MenuItem;

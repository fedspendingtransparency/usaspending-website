import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MenuItem = (props) => {
    let iconAlt = 'Collapsed menu';
    let navChevronDirection = "chevron-down";
    if (document.querySelector(`button.navbar-item-title-${props.index}:hover`) != null ||
        document.querySelector(`button.navbar-item-title-${props.index}:active`) != null) {
        iconAlt = 'Expanded menu';
        navChevronDirection = "chevron-up";
    }

    const onMouseEnter = () => {
        props.onMouseEnter(props.index);
    };

    const onMouseLeave = () => {
        navChevronDirection = "chevron-down";
    };

    const {
        title, children, index
    } = props;

    return (
        <li className="navbar-item-el">
            <button
                className={`navbar-item-title navbar-item-title-${index} ${navChevronDirection === "chevron-up" ? "navbar-item-title-hover" : ""}`}
                onMouseEnter={() => onMouseEnter(index)}
                onMouseLeave={() => onMouseLeave()}
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

export default MenuItem;

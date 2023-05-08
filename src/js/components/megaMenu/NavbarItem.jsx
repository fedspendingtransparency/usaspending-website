import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavbarItem = (props) => {
    let iconAlt = 'Collapsed menu';
    let navChevronDirection = "chevron-down";
    if (document.querySelector("button.navbar-item-title:hover") != null ||
        document.querySelector("button.navbar-item-title:active") != null) {
        iconAlt = 'Expanded menu';
        navChevronDirection = "chevron-up";
    }

    const onMouseEnter = () => {
        props.onMouseEnter(props.index);
    };

    const onMouseLeave = () => {
        navChevronDirection = "chevron-down";
    };

    const { title, children, url } = props;

    return (
        <li className="navbar-item-el">
            {url ? <Link className="navbar-item-title" to={url}>{title}</Link>
                :
                <>
                    <button
                        className="navbar-item-title"
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        onFocus={onMouseEnter}>
                        {title}
                        <div className="navbar-chevron-icon">
                            <FontAwesomeIcon icon={navChevronDirection} alt={iconAlt} />
                        </div>
                    </button>
                    <div className="dropdown-slot">{children}</div>
                </>
            }
        </li>
    );
};

export default NavbarItem;

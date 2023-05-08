import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavbarItem = (props) => {
    const activeChildren = '';
    const activeParent = '';
    const iconAlt = 'Collapsed menu';
    const navChevronDirection = "chevron-down";
    // if (!props.animatingOut) {
    //     // activeChildren = 'nav-children_active';
    //     // activeParent = 'nav-dropdown__parent_active';
    //     iconAlt = 'Expanded menu';
    //     navChevronDirection = "chevron-up";
    // }

    const onMouseEnter = () => {
        props.onMouseEnter(props.index);
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

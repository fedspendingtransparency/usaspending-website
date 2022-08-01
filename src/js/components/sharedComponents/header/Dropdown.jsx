/**
 * Dropdown.jsx
 * Created by Kevin Li 1/18/18
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AngleDown } from 'components/sharedComponents/icons/Icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DropdownItem from './DropdownItem';

const propTypes = {
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
};

const Dropdown = ({
    label,
    title,
    items
}) => {
    const [expanded, setExpanded] = useState(false);

    const clickedButton = () => {
        setExpanded(!expanded);
    };

    const expandMenu = () => {
        setExpanded(true);
    };

    const collapseMenu = () => {
        setExpanded(false);
    };

    let activeChildren = '';
    let activeParent = '';
    let iconAlt = 'Collapsed menu';
    if (expanded) {
        activeChildren = 'nav-children_active';
        activeParent = 'nav-dropdown__parent_active';
        iconAlt = 'Expanded menu';
    }

    const containsNewNavItem = items.some(({ isNewTab }) => isNewTab);

    return (
        <div
            className="nav-dropdown"
            onMouseEnter={expandMenu}
            onMouseLeave={collapseMenu}>
            <button
                className={`nav-dropdown__parent ${activeParent}`}
                title={title}
                onClick={clickedButton}
                aria-expanded={expanded}>
                <div className="nav-dropdown__parent-label">
                    {containsNewNavItem &&
                            <div className="new-badge-outer">
                                <FontAwesomeIcon icon="circle" />
                            </div>}
                    {label}
                </div>
                <div className="nav-dropdown__parent-icon">
                    <AngleDown alt={iconAlt} />
                </div>
            </button>
            <div className={`nav-children ${activeChildren}`}>
                <ul className={`nav-children__list ${label.toLowerCase()}`}>
                    {items.map((item, index) => (
                        <DropdownItem
                            {...item}
                            key={item.url}
                            isFirst={index === 0} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

Dropdown.propTypes = propTypes;

export default Dropdown;


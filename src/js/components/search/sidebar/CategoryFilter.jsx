/* CategoryFilter.jsx */
/* Created by Andrea Blackwell November 8, 2024 */

// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    component: PropTypes.object
};

const CategoryFilter = ({
    iconBackgroundColor, iconName, iconColor, component, title
}) => (
    <div>
        <div className="search-filter__top-row-icon-container" style={{ backgroundColor: iconBackgroundColor }}>
            <FontAwesomeIcon icon={iconName} style={{ color: iconColor }} />
        </div>
        <div className="search-filter__top-row-text-container">
            <div className="search-filter__top-row-title">{title}
            </div>
        </div>
        {component}
    </div>
);

CategoryFilter.propTypes = propTypes;
export default CategoryFilter;

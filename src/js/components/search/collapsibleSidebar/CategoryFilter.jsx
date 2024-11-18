/* CategoryFilter.jsx */
/* Created by Andrea Blackwell November 8, 2024 */

// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from 'prop-types';
import SearchFilter from "./SearchFilter";

const propTypes = {
    component: PropTypes.object
};

const CategoryFilter = ({
    iconBackgroundColor, iconName, iconColor, component, title, description, height
}) => (
    <>
        <SearchFilter
            iconName={iconName}
            iconColor={iconColor}
            iconBackgroundColor={iconBackgroundColor}
            title={title}
            description={description} />
        <div style={{ height: `${height - 60}` }}>
            {component}
        </div>
    </>
);

CategoryFilter.propTypes = propTypes;
export default CategoryFilter;

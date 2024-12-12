/* CategoryFilter.jsx */
/* Created by Andrea Blackwell November 8, 2024 */

// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from 'prop-types';
import CategoryHeader from "./CategoryHeader";

const propTypes = {
    component: PropTypes.object
};

const CategoryFilter = ({
    iconBackgroundColor, iconName, iconColor, component, title, description, height
}) => (
    <>
        <CategoryHeader
            iconName={iconName}
            iconColor={iconColor}
            iconBackgroundColor={iconBackgroundColor}
            title={title}
            description={description} />
        <div className="category-filter" style={{ height: `${height - 60}`, marginTop: "-36px" }}>
            <div style={{ margin: "0 32px" }}>{component}</div>
        </div>
    </>
);

CategoryFilter.propTypes = propTypes;
export default CategoryFilter;

/**
 * CategoryFilter.jsx
 * Created by Andrea Blackwell November 8, 2024
 */

import React from "react";
import PropTypes from 'prop-types';
import CategoryHeader from "./CategoryHeader";

const propTypes = {
    component: PropTypes.object,
    iconBackgroundColor: PropTypes.string,
    iconName: PropTypes.string,
    iconColor: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    height: PropTypes.number,
    titleOnly: PropTypes.bool
};

const CategoryFilter = ({
    iconBackgroundColor, iconName, iconColor, component, title, description, height, titleOnly = false
}) => (
    <>
        <CategoryHeader
            iconName={iconName}
            iconColor={iconColor}
            iconBackgroundColor={iconBackgroundColor}
            title={title}
            description={description} />
        {/* TODO Remove negative margin after releasing the collapsible sidebar */}
        <div className="category-filter" style={{ height: `${height - 60}`, marginTop: `${titleOnly ? '0px' : '-36px'}` }}>
            <div>{component}</div>
        </div>
    </>
);

CategoryFilter.propTypes = propTypes;
export default CategoryFilter;

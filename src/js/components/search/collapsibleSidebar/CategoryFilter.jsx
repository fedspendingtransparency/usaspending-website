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
    itemCount: PropTypes.number,
    titleOnly: PropTypes.bool,
    showFullCount: PropTypes.bool
};

const CategoryFilter = ({
    iconBackgroundColor, iconName, iconColor, component, title, description, height, itemCount, titleOnly = false, showFullCount
}) => (
    <div className="selected-category-item" style={{ height: `${height}px` }}>
        <CategoryHeader
            iconName={iconName}
            iconColor={iconColor}
            iconBackgroundColor={iconBackgroundColor}
            title={title}
            description={description}
            itemCount={itemCount}
            titleOnly={titleOnly}
            showFullCount={showFullCount} />
        {/* TODO Remove negative margin after releasing the collapsible sidebar */}
        <div className="category-filter">
            <div>{component}</div>
        </div>
    </div>
);

CategoryFilter.propTypes = propTypes;
export default CategoryFilter;

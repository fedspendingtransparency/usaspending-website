/**
 * CategoryHeader.jsx
 * Created by Brian Petway 09/30/2024
 */

import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectedItemsChips from "./SelectedItemsChips";

const propTypes = {
    iconName: PropTypes.string,
    iconColor: PropTypes.string,
    iconBackgroundColor: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    itemCount: PropTypes.number,
    selectedItems: PropTypes.object,
    selectCategory: PropTypes.func,
    isClickable: PropTypes.bool,
    showDescription: PropTypes.bool,
    titleOnly: PropTypes.bool
};
const CategoryHeader = ({
    item,
    iconName,
    iconColor,
    iconBackgroundColor,
    title,
    description,
    itemCount,
    selectedItems,
    selectCategory,
    isClickable,
    titleOnly
}) => {
    const [content, setContent] = useState();

    const innerContent = (
        <div className={`search-filter__content ${titleOnly ? 'filter-header__title-only' : ''} ${!isClickable && description ? 'filter-header__title-description' : ''}`}>
            <div className="search-filter__top-row">
                <div
                    className="search-filter__top-row-icon-container"
                    style={{ backgroundColor: iconBackgroundColor }}>
                    <FontAwesomeIcon icon={iconName} style={{ color: iconColor }} />
                </div>
                <div className="search-filter__top-row-text-container">
                    <div className="search-filter__top-row-title">{title}</div>
                </div>
                <div className="search-filter__top-row-selected-container">
                    {itemCount > 0 &&
                        <div className="search-filter__top-row-selected">{itemCount} selected</div>
                    }
                </div>
            </div>
            {description &&
                <div className={`search-filter__description ${isClickable ? '' : 'search-filter__description__bottom-margin'}`}>{description}</div>
            }
            <SelectedItemsChips
                selectedItems={selectedItems}
                itemCount={itemCount}
                isClickable={isClickable}
                categoryKey={item?.categoryKey} />
        </div>
    );

    const filterButton = (
        <div
            className="search-filter__container">
            { innerContent }
        </div>);

    const clickableFilterButton = (
        <div
            className="search-filter__container hover"
            onClick={(e) => selectCategory(e, item)}
            onKeyDown={(e) => (e.key === "Enter" ? selectCategory(e, item) : '')}
            tabIndex={0}
            role="button">
            { innerContent }
        </div>);

    useEffect(() => {
        if (isClickable) {
            setContent(clickableFilterButton);
        }
        else {
            setContent(filterButton);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isClickable, itemCount]);


    return (<>{ content }</>);
};

CategoryHeader.propTypes = propTypes;
export default CategoryHeader;

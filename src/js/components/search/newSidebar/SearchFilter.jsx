/**
 * SearchFilter.jsx
 * Created by Brian Petway 09/30/2024
 */

import React from 'react';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    iconName: PropTypes.string,
    iconColor: PropTypes.string,
    iconBackgroundColor: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    itemCount: PropTypes.number,
    selectedItems: PropTypes.array,
    selectCategory: PropTypes.func
};

const SearchFilter = ({
    item,
    iconName,
    iconColor,
    iconBackgroundColor,
    title,
    description,
    selectCategory
}) => (
    <div className="search-filter__container">
        <div className="search-filter__content">
            <div
                className="search-filter__top-row">
                <div className="search-filter__top-row-icon-container" style={{ backgroundColor: iconBackgroundColor }}>
                    <FontAwesomeIcon icon={iconName} style={{ color: iconColor }} />
                </div>
                <div className="search-filter__top-row-text-container">
                    <div
                        className="search-filter__top-row-title"
                        onClick={(e) => selectCategory(e, item)}
                        OnKeyDown={(e) => (e.key === "Enter" ? selectCategory(e, item) : '')}
                        tabIndex={0}
                        role="button">{title}
                    </div>
                </div>
                {/* <div className="search-filter__top-row-selected-container">*/}
                {/*    <div className="search-filter__top-row-selected">{itemCount} selected</div>*/}
                {/* </div>*/}
            </div>
            <div className="search-filter__description">{description}</div>
            {/* <div*/}
            {/*    className="search-filter__bottom-section">*/}
            {/*    {selectedItems.map((selectedItem) => (*/}
            {/*        <div>{selectedItem}</div>*/}
            {/*    ))}*/}
            {/* </div>*/}
        </div>
    </div>
);

SearchFilter.propTypes = propTypes;
export default SearchFilter;

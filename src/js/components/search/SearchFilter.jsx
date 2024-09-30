/**
 * SearchFilter.jsx
 * Created by Brian Petway 09/30/2024
 */

import React from 'react';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// this import shouldn't be necessary once this css file is imported into a css page
import '../../../_scss/pages/search/_searchFilter.scss';

const propTypes = {
    iconName: PropTypes.string,
    iconColor: PropTypes.string,
    iconBackgroundColor: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    itemCount: PropTypes.number,
    selectedItems: PropTypes.array
};

const SearchFilter = ({
    iconName,
    iconColor,
    iconBackgroundColor,
    title,
    description,
    itemCount,
    selectedItems
}) => {

    return (
        <div className="search-filter__container">
            <div className="search-filter__content">
                <div className="search-filter__top-row">
                    <div className="search-filter__top-row-icon-container" style={{ backgroundColor: iconBackgroundColor }}>
                        <FontAwesomeIcon icon={iconName} style={{ color: iconColor }} />
                    </div>
                    <div className="search-filter__top-row-title">{title}</div>
                    <div className="search-filter__top-row-selected">{itemCount} selected</div>
                </div>
                <div className="search-filter__description">{description}</div>
                <div className="search-filter__bottom-section" />
            </div>
        </div>
    );
};

SearchFilter.propTypes = propTypes;
export default SearchFilter;

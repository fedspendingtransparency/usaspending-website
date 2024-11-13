/* CategoriesList.jsx */
/* Created by Andrea Blackwell November 8, 2024 */

import React from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    categories: PropTypes.object,
    setLevel3: PropTypes.func
};

const CategoriesList = ({
    categories, setLevel3, iconBackgroundColor, iconName, iconColor, title
}) => (
    <div>
        <div className="search-filter__top-row-icon-container" style={{ backgroundColor: iconBackgroundColor }}>
            <FontAwesomeIcon icon={iconName} style={{ color: iconColor }} />
        </div>
        <div className="search-filter__top-row-text-container">
            <div className="search-filter__top-row-title">{title}
            </div>
        </div>
        {categories.map((item) => (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <a
                onClick={(e) => setLevel3(e, item.component)}
                onKeyUp={((e) => (e.key === "Enter" ? setLevel3(e, item.component) : ''))}>
                {item.title}
            </a>
        ))};
    </div>
);

CategoriesList.propTypes = propTypes;
export default CategoriesList;

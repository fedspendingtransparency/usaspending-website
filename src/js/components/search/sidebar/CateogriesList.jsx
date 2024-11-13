/* CategoriesList.jsx */
/* Created by Andrea Blackwell November 8, 2024 */

import React from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchFilter from "../SearchFilter";

const propTypes = {
    categories: PropTypes.object,
    setLevel3: PropTypes.func
};

const CategoriesList = ({
    categories, setLevel3, iconBackgroundColor, iconName, iconColor, title, description
}) => (
    <div>
        <SearchFilter
            iconName={iconName}
            iconColor={iconColor}
            iconBackgroundColor={iconBackgroundColor}
            title={title}
            description={description} />
        <div className="categories-list">
            {categories.map((item) => (
                <div
                    className="categories-list-item-container"
                    onClick={(e) => setLevel3(e, item.component)}
                    onKeyUp={((e) => (e.key === "Enter" ? setLevel3(e, item.component) : ''))}
                    role="button"
                    tabIndex={0}>
                    <div className="categories-list-item">
                        <div>{item.title}</div>
                        <div><FontAwesomeIcon className="chevron" icon="chevron-right" /></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

CategoriesList.propTypes = propTypes;
export default CategoriesList;

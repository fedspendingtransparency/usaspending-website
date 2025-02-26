/**
 * CategoriesList.jsx
 * Created by Andrea Blackwell November 8, 2024
 */

import React from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CategoryHeader from "./CategoryHeader";

const propTypes = {
    categories: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    setLevel3: PropTypes.func,
    iconName: PropTypes.string,
    iconColor: PropTypes.string,
    iconBackgroundColor: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    height: PropTypes.number,
    itemCount: PropTypes.number,
    filterCount: PropTypes.object
};

const CategoriesList = ({
    categories,
    setLevel3,
    iconBackgroundColor,
    iconName,
    iconColor,
    title,
    height,
    itemCount,
    filterCount
}) => (
    <div className="selected-category-item" style={{ height: `${height - 36}px` }}>
        <CategoryHeader
            iconName={iconName}
            iconColor={iconColor}
            iconBackgroundColor={iconBackgroundColor}
            title={title}
            itemCount={itemCount}
            titleOnly />
        <div className="categories-list">
            <div style={{ margin: "0 32px" }}>
                {categories.map((item) => {
                    if (item?.categoryType) {
                        return (
                            <>
                                <div
                                    className="categories-list-category-type"
                                    style={item.categoryType === 'doNotDisplay' ? { display: 'none' } : {}}>
                                    {item.categoryType}
                                </div>
                                {
                                    item.categories.map((category) => (
                                        <div
                                            className="categories-list-item-container"
                                            onClick={(e) => setLevel3(e, category)}
                                            onKeyUp={
                                                ((e) => (
                                                    e.key === "Enter" ? setLevel3(e, category.component) : ''
                                                ))
                                            }
                                            role="button"
                                            tabIndex={0}>
                                            <div className="categories-list-item">
                                                <div className="categories-list-item__text-container">
                                                    <div className="categories-list-item__title" style={{ float: "left" }}>{category.title}</div>
                                                    {filterCount[category.title] > 0 &&
                                                            <div className="categories-list-item__count">
                                                                {filterCount[category.title]} selected
                                                            </div>
                                                    }
                                                </div>
                                                <div style={{ float: "right" }}><FontAwesomeIcon
                                                    className="chevron"
                                                    icon="chevron-right" />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </>
                        );
                    }

                    return (
                        <div
                            className="categories-list-item-container"
                            onClick={(e) => setLevel3(e, item)}
                            onKeyUp={((e) => (e.key === "Enter" ? setLevel3(e, item.component) : ''))}
                            role="button"
                            tabIndex={0}>
                            <div className="categories-list-item">
                                <div style={{ float: "left" }}>{item.title}</div>
                                <div style={{ float: "right" }}><FontAwesomeIcon className="chevron" icon="chevron-right" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
);

CategoriesList.propTypes = propTypes;
export default CategoriesList;

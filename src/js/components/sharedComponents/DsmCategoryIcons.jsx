import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DsmCategoryIcons = ({ searchFilterCategoryTree }) => (
    <>

        <div className="collapsible-sidebar--dsm-wrapper--icon-section">
            {searchFilterCategoryTree.map((category) => (
                <div
                    className="collapsible-sidebar--dsm-wrapper--icon-section--icon"
                    style={{ backgroundColor: category.iconBackgroundColor }}>
                    <FontAwesomeIcon
                        icon={category.iconName}
                        style={{ color: category.iconColor }} />
                </div>
            ))}
        </div>
        <div className="collapsible-sidebar--dsm-wrapper--text-section">
            Click on a filter category below to learn more about it:
        </div>
        {searchFilterCategoryTree.map((category) => (
            <div className="collapsible-sidebar--dsm-wrapper--text-header">
                {category.title}
            </div>
        ))}
    </>
);

export default DsmCategoryIcons;

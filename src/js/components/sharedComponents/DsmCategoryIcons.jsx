import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AboutTheDataLink from "./AboutTheDataLink";

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
        <div className="collapsible-sidebar--dsm-wrapper--atd-links">
            {searchFilterCategoryTree.map((category) => (
                <div className="collapsible-sidebar--dsm-wrapper--atd-link">
                    <AboutTheDataLink slug={category.slug}>
                        {category.titleCapital}
                    </AboutTheDataLink>
                </div>
            ))}
        </div>
    </>
);

export default DsmCategoryIcons;

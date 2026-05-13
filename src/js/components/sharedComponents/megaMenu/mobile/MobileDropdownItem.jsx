/**
 * MobileDropdownItem.jsx
 * Created by Chas 6/1/2023
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Analytics from 'helpers/analytics/Analytics';
import { uniqueId } from 'lodash-es';
import { Link, useNavigate } from "react-router";
import PropTypes from 'prop-types';
import isRedirectNeeded from '../../../../helpers/url';
import ExternalLink from '../../ExternalLink';
import { showSlideout } from '../../../../helpers/slideoutHelper';

const propTypes = {
    title: PropTypes.string,
    section1Items: PropTypes.array,
    section2Items: PropTypes.array,
    section3Items: PropTypes.array,
    section1Options: PropTypes.array,
    section2Options: PropTypes.array,
    section3Options: PropTypes.array,
    hideMobileNav: PropTypes.func,
    index: PropTypes.number,
    type: PropTypes.string
};
const clickedHeaderLink = (route) => {
    Analytics.event({
        event: 'Header - Link',
        category: 'Header - Link',
        action: route
    });
};


const MobileDropdownItem = ({
    title,
    section1Items,
    section2Items,
    section3Items,
    section1Options,
    section2Options,
    section3Options,
    hideMobileNav,
    index,
    type
}) => {
    const navigate = useNavigate();

    const clickedLink = (e) => {
        const route = e.target.name;
        clickedHeaderLink(route);
        hideMobileNav();
    };

    const clickedSection2Link = (e, item) => {
        const route = e.target.name;
        hideMobileNav();
        e.preventDefault();
        clickedHeaderLink(route);

        if (item && item.url && typeof item.url === "string") {
            if (item?.url?.includes("about-the-data")) {
                showSlideout('atd');
            }
            else if (item?.url?.includes("glossary")) {
                showSlideout('glossary');
            }
            else {
                navigate(item.url);
            }
        } else if (typeof item.url === "object") {
            navigate(item.url);
        }
    };

    return (
        <div className="mobile-dropdown__layout-container">
            <hr />
            <div className="mobile-dropdown_parent-title">{title}</div>
            <div className={type === "primary" ? "mobile-dropdown_main-container" : ""}>
                <div className={type === "primary" ? "mobile-dropdown__section-icon" : ""}>
                    {section1Options[index].icon && section1Options[index].icon !== null && section1Options[index].icon !== '' ? <FontAwesomeIcon icon={section1Options[index].icon} style={{ width: "12px", height: "100%" }} /> : ''}
                </div>
                <div className={type === "secondary" ? "mobile-dropdown__title" : "mobile-dropdown__title-section-two"}>
                    {section1Options[index].title}
                </div>
            </div>
            <div className={type === "secondary" ? "mobile-dropdown__sub" : "mobile-dropdown__sub-two"} >
                {section1Options[index].sub}
            </div>
            <div className="mobile-dropdown__section-container">
                {type === "secondary" ?
                    <>
                        <ul>
                            {section1Items.map((item) => (
                                <li key={uniqueId()}>
                                    <Link
                                        to={item.url}
                                        onClick={clickedLink}
                                        className="mobile-dropdown__section-link">
                                        <div className="mobile-dropdown__section-icon">
                                            {item.icon && item.icon !== '' && item.icon !== null ? <FontAwesomeIcon role="presentation" icon={item.icon} style={{ width: "12px", height: "100%" }} /> : ''}
                                        </div>
                                        <div className="mobile-dropdown__section-etd-label">
                                            {item.label}
                                        </div>
                                    </Link>
                                    <div className="mobile-dropdown__section-etd-description">
                                        {item.description}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <hr />
                    </>
                    :
                    <>
                        <ul>
                            {section1Items.map((item) => (
                                <li className="mobile-dropdown__section" key={uniqueId()}>
                                    <Link to={item.url} onClick={clickedLink} className="mobile-dropdown__section-link" state={item.queryParam}>
                                        <div className="mobile-dropdown__section-label">
                                            {item.label}
                                        </div>
                                    </Link>
                                    <div className="mobile-dropdown__section-description">
                                        {item.description}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <hr />
                    </>
                }
            </div>
            <div className={type === "primary" ? "mobile-dropdown_main-container" : ""}>
                <div className={section2Options[index].icon && section2Options[index].icon !== null && section2Options[index].icon !== '' ? "mobile-dropdown__section-icon" : ""}>
                    {section2Options[index].icon && section2Options[index].icon !== '' && section2Options[index].icon !== null ? <FontAwesomeIcon role="presentation" icon={section2Options[index].icon} style={{ width: "12px", height: "100%" }} /> : ''}
                </div>
                <div className={type === "secondary" ? "mobile-dropdown__title" : "mobile-dropdown__title-section-two"}>
                    {section2Options[index].title}
                </div>
            </div>
            <div className={type === "secondary" ? "mobile-dropdown__sub" : "mobile-dropdown__sub-two"}>
                {section2Options[index].sub}
            </div>
            <div className="mobile-dropdown__section-container">
                <ul>
                    {section2Items.map((item) => (
                        <li className="mobile-dropdown__section" key={uniqueId()}>
                            <a
                                className="mobile-dropdown__section-link"
                                href="#"
                                onClick={(e) => {
                                    clickedSection2Link(e, item);
                                }}>
                                <div className="mobile-dropdown__section-etd-label">
                                    {item.label}
                                </div>
                            </a>
                            <div className="mobile-dropdown__section-etd-description">
                                {item.description}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {index > 0 &&
                <div className="mobile-dropdown_main-container">
                    <div className={section3Options[index].icon && section3Options[index].icon !== null && section3Options[index].icon !== '' ? "mobile-dropdown__section-icon" : ""}>
                        {section3Options[index].icon && section3Options[index].icon !== null && section3Options[index].icon !== '' ? <FontAwesomeIcon icon={section3Options[index].icon} style={{ width: "12px", height: "100%" }} /> : ''}
                    </div>
                    <div>
                        <div className={type === "secondary" ? "mobile-dropdown__title" : "mobile-dropdown__title-section-two"}>
                            {section3Options[index].title}
                        </div>
                        <div className={type === "secondary" ? "mobile-dropdown__sub" : "mobile-dropdown__sub-two"}>
                            {section3Options[index].sub}
                        </div>
                        <div className="mobile-dropdown__section-container">
                            {type === "primary" &&
                            <>
                                <ul>
                                    {section3Items.map((item) => (
                                        <li className="mobile-dropdown__section-downloads" key={uniqueId()}>
                                            { isRedirectNeeded(item) ?
                                                <ExternalLink isCard={false} url={item.url}>
                                                    <div className="mobile-dropdown__section-link">
                                                        <div className="mobile-dropdown__section-label">
                                                            {item.label}
                                                            <span className="mobile-dropdown__section-description">
                                                                {item.description}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </ExternalLink> :
                                                <a href={item.url} target={item.shouldOpenNewTab ? "_blank" : null} rel={item.shouldOpenNewTab ? "noopener noreferrer" : null} className="mobile-dropdown__section-link">
                                                    <div className="mobile-dropdown__section-label">
                                                        {item.label}
                                                        <span className="mobile-dropdown__section-description">
                                                            {item.description}
                                                        </span>
                                                    </div>
                                                </a>
                                            }
                                        </li>
                                    ))}
                                </ul>
                            </>
                            }
                        </div>
                    </div>
                </div>}
        </div>
    );
};
MobileDropdownItem.propTypes = propTypes;
export default MobileDropdownItem;

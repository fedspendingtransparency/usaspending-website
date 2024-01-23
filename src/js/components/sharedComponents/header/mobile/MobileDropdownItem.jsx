/**
 * MobileDropdownItem.jsx
 * Created by Chas 6/1/2023
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Analytics from 'helpers/analytics/Analytics';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import * as aboutTheDataActions from 'redux/actions/aboutTheDataSidebar/aboutTheDataActions';
import * as slideoutActions from 'redux/actions/slideouts/slideoutActions';

const propTypes = {
    title: PropTypes.string,
    section1Items: PropTypes.array,
    section2Items: PropTypes.array,
    section3Items: PropTypes.array,
    section1Options: PropTypes.array,
    section2Options: PropTypes.array,
    section3Options: PropTypes.array,
    hideMobileNav: PropTypes.func,
    index: PropTypes.number
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
    index
}) => {
    const dispatch = useDispatch();

    const openATD = (e) => {
        dispatch(aboutTheDataActions.showAboutTheData());
        dispatch(slideoutActions.setLastOpenedSlideout('atd'));
        e.preventDefault();
    };
    const clickedLink = (e) => {
        const route = e.target.name;
        clickedHeaderLink(route);
        hideMobileNav();
    };

    return (
        <div className="mobile-dropdown__layout-container">
            <hr />
            <div className="mobile-dropdown_parent-title">{title}</div>
            <div className={index >= 2 ? "mobile-dropdown_main-container" : ""}>
                <div className={index >= 2 ? "mobile-dropdown__section-icon" : ""}>
                    <FontAwesomeIcon icon={section1Options[index].icon} style={{ width: "12px", height: "100%" }} />
                </div>
                <div className={index === 1 ? "mobile-dropdown__title" : "mobile-dropdown__title-section-two"}>
                    {section1Options[index].title}
                </div>
            </div>
            <div className={index === 1 ? "mobile-dropdown__sub" : "mobile-dropdown__sub-two"} >
                {section1Options[index].sub}
            </div>
            <div className="mobile-dropdown__section-container">
                {index === 1 ?
                    <>
                        <ul>
                            {section1Items.map((item, i) => (
                                <li key={i}>
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
                            {section1Items.map((item, i) => (
                                <li className="mobile-dropdown__section" key={i}>
                                    <Link to={item.url} onClick={clickedLink} className="mobile-dropdown__section-link">
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
            <div className={index >= 2 ? "mobile-dropdown_main-container" : ""}>
                <div className={section2Options[index].icon && section2Options[index].icon !== null && section2Options[index].icon !== '' ? "mobile-dropdown__section-icon" : ""}>
                    <FontAwesomeIcon role="presentation" icon={section2Options[index].icon} style={{ width: "12px", height: "100%" }} />
                </div>
                <div className={index === 1 ? "mobile-dropdown__title" : "mobile-dropdown__title-section-two"}>
                    {section2Options[index].title}
                </div>
            </div>
            <div className={index === 1 ? "mobile-dropdown__sub" : "mobile-dropdown__sub-two"}>
                {section2Options[index].sub}
            </div>
            <div className="mobile-dropdown__section-container">
                {index === 1 ?
                    <ul>
                        {section2Items.map((item, i) => (
                            <li key={i}>
                                <Link
                                    className="mobile-dropdown__section-link"
                                    to={item.url}
                                    onClick={clickedLink}>
                                    <div className={item.icon && item.icon !== '' && item.icon !== null ? "mobile-dropdown__section-icon" : ""}>
                                        <FontAwesomeIcon role="presentation" icon={item.icon} style={{ width: "12px", height: "100%" }} />
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
                    :
                    <>
                        <ul>
                            {section2Items.map((item, i) => (
                                <li className="mobile-dropdown__section" key={i}>
                                    <Link
                                        className="mobile-dropdown__section-link"
                                        to={item.url !== "?about-the-data" ? item.url : ''}
                                        onClick={(e) => {
                                            if (item.url === '?about-the-data') {
                                                openATD(e);
                                            }
                                            clickedLink(e);
                                        }
                                        }
                                        onMouseUp={(e) => {
                                            if (item.url === '?about-the-data') {
                                                openATD(e);
                                                clickedLink(e);
                                            } }
                                        }>
                                        <div className="mobile-dropdown__section-label">
                                            {item.label}
                                            <span className="mobile-dropdown__section-description">
                                                {item.description}
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <hr />
                    </>

                }
            </div>
            <div className="mobile-dropdown_main-container">
                <div className={section3Options[index].icon && section3Options[index].icon !== null && section3Options[index].icon !== '' ? "mobile-dropdown__section-icon" : ""}>
                    <FontAwesomeIcon icon={section3Options[index].icon} style={{ width: "12px", height: "100%" }} />
                </div>
                <div>
                    <div className={index === 1 ? "mobile-dropdown__title" : "mobile-dropdown__title-section-two"}>
                        {section3Options[index].title}
                    </div>
                    <div className={index === 1 ? "mobile-dropdown__sub" : "mobile-dropdown__sub-two"}>
                        {section3Options[index].sub}
                    </div>
                    <div className="mobile-dropdown__section-container">
                        {index >= 2 &&
                <>
                    <ul>
                        {section3Items.map((item, i) => (
                            <li className="mobile-dropdown__section-downloads" key={i}>
                                <a href={item.url} target={item.shouldOpenNewTab ? "_blank" : null} rel={item.shouldOpenNewTab ? "noopener noreferrer" : null} className="mobile-dropdown__section-link">
                                    <div className="mobile-dropdown__section-label">
                                        {item.label}
                                        <span className="mobile-dropdown__section-description">
                                            {item.description}
                                        </span>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
MobileDropdownItem.propTypes = propTypes;
export default MobileDropdownItem;

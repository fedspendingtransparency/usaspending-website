/**
 * MobileDropdownItem.jsx
 * Created by Chas 6/1/2023
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';


const propTypes = {
    title: PropTypes.string,
    label: PropTypes.string.isRequired,
    section1Items: PropTypes.array,
    section2Items: PropTypes.array,
    section3Items: PropTypes.array,
    section1Options: PropTypes.array,
    section2Options: PropTypes.array,
    section3Options: PropTypes.array,
    index: PropTypes.number
};

const MobileDropdownItem = ({
    title,
    section1Items,
    section2Items,
    section3Items,
    section1Options,
    section2Options,
    section3Options,
    index
}) =>

    (
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
                                    <a href={item.url} className="mobile-dropdown__section-row-one">
                                        <div className="mobile-dropdown__section-icon">
                                            {item.icon && item.icon !== '' && item.icon !== null ? <FontAwesomeIcon role="presentation" icon={item.icon} style={{ width: "12px", height: "100%" }} /> : ''}
                                        </div>
                                        <div className="mobile-dropdown__section-one-label">
                                            {item.label}
                                        </div>
                                    </a>
                                    <div className="mobile-dropdown__section-one-description">
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
                                    <a href={item.url} className="mobile-dropdown__section-row-one">
                                        <div className="mobile-dropdown__section-label">
                                            {item.label}
                                        </div>
                                    </a>
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
                                <a href={item.url} className="mobile-dropdown__section-row-one">
                                    <div className={item.icon && item.icon !== '' && item.icon !== null ? "mobile-dropdown__section-icon" : ""}>
                                        <FontAwesomeIcon role="presentation" icon={item.icon} style={{ width: "12px", height: "100%" }} />
                                    </div>
                                    <div className="mobile-dropdown__section-one-label">
                                        {item.label}
                                    </div>
                                </a>
                                <div className="mobile-dropdown__section-one-description">
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
                                    <a href={item.url} className="mobile-dropdown__section-row-one">
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
                            <li className="mobile-dropdown__section-three" key={i}>
                                <a href={item.url} target="_blank" rel="noopener noreferrer" className="mobile-dropdown__section-row-one">
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
MobileDropdownItem.propTypes = propTypes;
export default MobileDropdownItem;

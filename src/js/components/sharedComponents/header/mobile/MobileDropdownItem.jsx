/**
 * MobileDropdownItem.jsx
 * Created by Kevin Li 10/4/17
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';



const propTypes = {
    hideMobileNav: PropTypes.func,
    active: PropTypes.string,
    title: PropTypes.string,
    label: PropTypes.string.isRequired,
    section1Items: PropTypes.array,
    section2Items: PropTypes.array,
    section3Items: PropTypes.array,
    section1Options: PropTypes.array,
    section2Options: PropTypes.array,
    section3Options: PropTypes.array,
    section1Icon: PropTypes.array,
    index: PropTypes.number
};

// const clickedHeaderLink = (route) => {
//     Analytics.event({
//         category: 'Header - Link',
//         action: route
//     });
// };

const MobileDropdownItem = ({
    // hideMobileNav = false,
    section1Items,
    section2Items,
    section3Items,
    section1Options,
    section2Options,
    section3Options,
    section1Icon,
    index
}) =>

    (
        <div className="mobile-dropdown__layout-container">
            <div className="mobile-dropdown__section-icon">
                <FontAwesomeIcon icon={section1Options[index].icon} />
            </div>
            <div className="mobile-dropdown__title">
                {section1Options[index].title}
            </div>
            <div className="mobile-dropdown__sub">
                {section1Options[index].sub}
            </div>
            <div className="mobile-dropdown__section-container">
                {index === 1 ?
                    <>
                        <ul>
                            {section1Items.map((item, i) => (
                                <li key={i}>
                                    <div className="mobile-dropdown__section-row-one">
                                        <div className="mobile-dropdown__section-icon">
                                            <FontAwesomeIcon icon={item.icon} size="sm" />
                                        </div>
                                        <div className="mobile-dropdown__section-label">
                                            {item.label}
                                        </div>
                                    </div>
                                    <div className="mobile-dropdown__section-description">
                                        {item.description}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <hr />
                    </>
                    :
                    <>
                        {console.log("section1Icon", section1Icon)}
                        <ul>
                            {section1Items.map((item, i) => (
                                <li key={i}>
                                    <div className="mobile-dropdown__section-row-one">
                                        <div className="mobile-dropdown__section-label-section-2">
                                            {item.label}
                                        </div>
                                    </div>
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
            <div className="mobile-dropdown__section-icon">
                <FontAwesomeIcon icon={section2Options[index].icon} />
            </div>
            <div className={index === 1 ? "mobile-dropdown__title" : "mobile-dropdown__title-section-2"}>
                {section2Options[index].title}
            </div>

            <div className="mobile-dropdown__sub">
                {section2Options[index].sub}
            </div>
            <div className="mobile-dropdown__section-container">
                {index === 1 ?
                    <ul>
                        {section2Items.map((item, i) => (
                            <li key={i}>
                                <div className="mobile-dropdown__section-row-one">
                                    <div className="mobile-dropdown__section-icon">
                                        <FontAwesomeIcon icon={item.icon} size="sm" />
                                    </div>
                                    <div className="mobile-dropdown__section-label">
                                        {item.label}
                                    </div>
                                </div>
                                <div className="mobile-dropdown__section-description">
                                    {item.description}
                                </div>
                            </li>
                        ))}
                    </ul>
                    :
                    <>
                        <ul>
                            {section2Items.map((item, i) => (
                                <li key={i}>
                                    <div className="mobile-dropdown__section-row-one">
                                        <div className="mobile-dropdown__section-label-section-2">
                                            {item.label}
                                        </div>
                                    </div>
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
            <div className="mobile-dropdown_main-container">
                <div className="mobile-dropdown__section-icon">
                    <FontAwesomeIcon icon={section3Options[index].icon} />
                </div>
                <div>
                    <div className={index === 1 ? "mobile-dropdown__title" : "mobile-dropdown__title-section-2"}>
                        {section3Options[index].title}
                    </div>
                    <div className="mobile-dropdown__sub">
                        {section3Options[index].sub}
                    </div>
                    <div className="mobile-dropdown__section-container">
                        {index >= 2 &&
                <>
                    <ul>
                        {section3Items.map((item, i) => (
                            <li key={i}>
                                <div className="mobile-dropdown__section-row-one">
                                    <div className="mobile-dropdown__section-label">
                                        {item.label}
                                    </div>
                                </div>
                                <div className="mobile-dropdown__section-description">
                                    {item.description}
                                </div>
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

/**
 * MobileDropdownItem.jsx
 * Created by Kevin Li 10/4/17
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import * as aboutTheDataActions from 'redux/actions/aboutTheDataSidebar/aboutTheDataActions';
import * as slideoutActions from 'redux/actions/slideouts/slideoutActions';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import Analytics from 'helpers/analytics/Analytics';
import { getNewUrlForGlossary } from 'helpers/glossaryHelper';
import DropdownComingSoon from '../DropdownComingSoon';
import { section1Options } from "../../../../dataMapping/navigation/menuOptions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const propTypes = {
    // active: PropTypes.bool,
    // comingSoon: PropTypes.bool,
    // url: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ pathname: PropTypes.string, search: PropTypes.string })]),
    // search: PropTypes.string,
    // description: PropTypes.node,
    // title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    // hideMobileNav: PropTypes.func,
    // externalLink: PropTypes.bool,
    // isNewTab: PropTypes.bool,
    // appendToExistingUrl: PropTypes.bool
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
    index: PropTypes.number
};

// const clickedHeaderLink = (route) => {
//     Analytics.event({
//         category: 'Header - Link',
//         action: route
//     });
// };

const MobileDropdownItem = ({
    // url,
    // description,
    // title = '',
    // active = false,
    // comingSoon = false,
    // hideMobileNav = false,
    // externalLink = false,
    // isNewTab = false,
    // appendToExistingUrl = false,
    hideMobileNav,
    active,
    title,
    label,
    section1Items,
    section2Items,
    section3Items,
    section1Options,
    section2Options,
    section3Options,
    index
}) =>
// const { pathname, search } = useLocation();
// const newUrl = appendToExistingUrl
//     ? getNewUrlForGlossary(pathname, url, search)
//     : url;
//
// const dispatch = useDispatch();
//
// const clickedLink = () => {
//     clickedHeaderLink(newUrl);
//     hideMobileNav();
// };
//
// const openATDMobile = (e) => {
//     clickedHeaderLink(newUrl);
//     hideMobileNav();
//     dispatch(aboutTheDataActions.showAboutTheData());
//     dispatch(slideoutActions.setLastOpenedSlideout('atd'));
//     e.preventDefault();
// };
//
// let activeClass = '';
// if (active) {
//     activeClass = 'mobile-dropdown__link_active';
// }
//
// let comingSoonClass = '';
// let comingSoonDecorator = null;
// if (comingSoon) {
//     comingSoonClass = 'mobile-dropdown__item_coming-soon';
//     comingSoonDecorator = (
//         <div className="mobile-dropdown__coming-soon">
//             <DropdownComingSoon />
//         </div>
//     );
// }

// if (appendToExistingUrl && title.includes("About the Data")) {
//     return (
//         <li className={`mobile-dropdown__item ${comingSoonClass}`}>
//             <Link
//                 className={`mobile-dropdown__link ${activeClass}`}
//                 onClick={openATDMobile}>
//                 {title}
//                 {isNewTab && <span className="new-badge dropdown-item"> NEW</span>}
//             </Link>
//             {comingSoonDecorator}
//         </li>
//     );
// }

// return externalLink ? (
//     <li className={`mobile-dropdown__item ${comingSoonClass}`}>
//         <a
//             href={newUrl}
//             target="_blank"
//             rel="noreferrer noopener"
//             className={`mobile-dropdown__link ${activeClass}`}
//             onClick={clickedLink}>
//             {title}
//             {isNewTab && <span className="new-badge dropdown-item"> NEW</span>}
//         </a>
//         <div className="nav-children__container_description">{description}</div>
//         {comingSoonDecorator}
//     </li>
//
// )
//     : (
//         <li className={`mobile-dropdown__item ${comingSoonClass}`}>
//             <Link
//                 to={newUrl}
//                 className={`mobile-dropdown__link ${activeClass}`}
//                 onClick={clickedLink}>
//                 {title}
//                 {isNewTab && <span className="new-badge dropdown-item"> NEW</span>}
//             </Link>
//             <div className="nav-children__container_description">{description}</div>
//             {comingSoonDecorator}
//         </li>
//     );

    (
        <div className="mobile-dropdown__layout-container">
            <div className="mobile-dropdown__title">
                {section1Options[index].title}
            </div>
            <div className="mobile-dropdown__sub">
                {section1Options[index].sub}
            </div>
            <div className="mobile-dropdown__section-container">
                {index === 1 &&
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
                }
            </div>
            <div className="mobile-dropdown__title">
                {section2Options[index].title}
            </div>
            <div className="mobile-dropdown__sub">
                {section2Options[index].sub}
            </div>
            <div className="mobile-dropdown__section-container">
                {index === 1 &&
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
                }
            </div>
            <div className="mobile-dropdown__title">
                {section3Options[index].title}
            </div>
            <div className="mobile-dropdown__sub">
                {section3Options[index].sub}
            </div>
        </div>
    );
MobileDropdownItem.propTypes = propTypes;
export default MobileDropdownItem;

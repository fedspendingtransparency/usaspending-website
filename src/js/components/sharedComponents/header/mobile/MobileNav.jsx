/**
 * MobileNav.jsx
 * Created by Chas Stevens 5/10/2023
 */

import React, { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import Analytics from 'helpers/analytics/Analytics';
import {
    spendingOptions,
    profileOptions,
    learnResourceOptions,
    referenceMaterialsOptions,
    developerOptions,
    awardDownloadOptions,
    accountDataOptions,
    allDownloadOptions,
    section1Options,
    section2Options,
    section3Options
} from 'dataMapping/navigation/menuOptions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MobileTop from './MobileTop';
import MobileDropdownItem from "./MobileDropdownItem";


const propTypes = {
    hideMobileNav: PropTypes.func,
    mobileNavInitialState: PropTypes.bool,
    setMobileNavInitialState: PropTypes.func
};

const navbarConfig = [
    {
        title: "Search Award Data",
        url: '/search'
    },
    {
        title: "Explore the Data",
        section1Items: spendingOptions,
        section2Items: profileOptions,
        section1Options,
        section2Options,
        section3Options
    },
    {
        title: "Download the Data",
        section1Items: awardDownloadOptions,
        section2Items: accountDataOptions,
        section3Items: allDownloadOptions,
        section1Options,
        section2Options,
        section3Options,
        sectoion1Icon: "hand-holding-usd"
    },
    {
        title: "Find Resources",
        section1Items: learnResourceOptions,
        section2Items: referenceMaterialsOptions,
        section3Items: developerOptions,
        section1Options,
        section2Options,
        section3Options
    }
];

const MobileNav = React.memo((props) => {
    const { mobileNavInitialState, setMobileNavInitialState } = props;
    const [url, setUrl] = useState('');
    const [detailMobileNavIsHidden, setDetailMobileNavIsHidden] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(null);
    const location = useLocation();

    const clickedHeaderLink = (route) => {
        Analytics.event({
            event: 'Header Link - Mobile',
            category: 'Header - Link',
            action: route
        });
    };

    const openDetailedMobileNav = (index) => {
        setDetailMobileNavIsHidden(false);
        setMobileNavInitialState(false);
        setCurrentIndex(index);
    };

    const closeDetailedMobileNav = () => {
        setDetailMobileNavIsHidden(true);
        setCurrentIndex(null);
    };

    const clickedLink = (e) => {
        const route = e.target.name;
        clickedHeaderLink(route);
        props.hideMobileNav();
    };

    const checkCurrentProfile = () => {
        const currentUrl = location.pathname;
        if (url !== currentUrl) {
            setUrl(currentUrl);
        }
    };

    useEffect(() => {
        checkCurrentProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    return (
        <div className={props.showMobileNav ? 'mobile-nav opened' : 'mobile-nav'}>
            <div className="mobile-nav__top">
                <MobileTop
                    closeDetailedMobileNav={closeDetailedMobileNav}
                    detailMobileNavIsHidden={detailMobileNavIsHidden}
                    mobileNavInitialState={mobileNavInitialState}
                    hideMobileNav={props.hideMobileNav} />
            </div>
            <div className="mobile-nav-content">
                <ul
                    className="mobile-nav-content__list"
                    style={detailMobileNavIsHidden ? {} : { display: "none" }}>
                    {navbarConfig.map((n, index) => (
                        <>
                            <hr className={`mobile-nav-content__divider ${detailMobileNavIsHidden ? " animation-enter" : " "}`} />
                            <li className={`mobile-nav-content__list-item ${detailMobileNavIsHidden ? " animation-enter" : " "}`}>
                                {index === 0 ?
                                    <Link
                                        className="mobile-nav-content__link"
                                        to="/search"
                                        title="Spending Explorer"
                                        name="explorer"
                                        onClick={clickedLink}>
                                        Search Award Data
                                    </Link>
                                    :
                                    <div className="mobile-dropdown">
                                        <button
                                            className="mobile-dropdown__parent"
                                            title={navbarConfig[index].title}
                                            onClick={() => {
                                                openDetailedMobileNav(index);
                                            }}>
                                            <span className="mobile-dropdown__parent-label">
                                                {navbarConfig[index].title}
                                            </span>
                                            <span className="mobile-dropdown__parent-icon">
                                                <FontAwesomeIcon icon="chevron-right" />
                                            </span>
                                        </button>
                                    </div>
                                }
                            </li>
                        </>
                    ))}
                </ul>
                <ul
                    className="mobile-dropdown__list mobile-nav-animations"
                    style={!detailMobileNavIsHidden ? {} : { display: "none" }}>
                    <TransitionGroup>
                        {currentIndex && (
                            <CSSTransition
                                classNames="mobile-nav-side-slide"
                                timeout={{ enter: 225, exit: 225 }}
                                exit>
                                <MobileDropdownItem
                                    {...props}
                                    mainTitle={navbarConfig[currentIndex].title}
                                    label={navbarConfig[currentIndex].title}
                                    title={navbarConfig[currentIndex].title}
                                    section1Items={navbarConfig[currentIndex].section1Items}
                                    section2Items={navbarConfig[currentIndex].section2Items}
                                    section3Items={navbarConfig[currentIndex].section3Items}
                                    section1Options={navbarConfig[currentIndex].section1Options}
                                    section2Options={navbarConfig[currentIndex].section2Options}
                                    section3Options={navbarConfig[currentIndex].section3Options}
                                    index={currentIndex}
                                    onClick={clickedLink}
                                    active={url} />
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                </ul>
            </div>
        </div>
    );
});

MobileNav.propTypes = propTypes;
export default MobileNav;

/**
 * MobileNav.jsx
 * Created by Chas Stevens 5/10/2023
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
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
import MobileTop from './MobileTop';
import MobileDropdown from './MobileDropdown';

const clickedHeaderLink = (route) => {
    Analytics.event({
        category: 'Header - Link',
        action: route
    });
};

const propTypes = {
    hideMobileNav: PropTypes.func,
    location: PropTypes.object
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

const MobileNav = (hideMobileNav, location, props) => {
    const [url, setUrl] = useState('');
    const [hideNavMenu, setHideNavMenu] = useState(false);

    const toggleNavMenu = () => {
        setHideNavMenu(!hideMobileNav);
    };

    const clickedLink = (e) => {
        const route = e.target.name;
        clickedHeaderLink(route);
        hideMobileNav();
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
        <div className="mobile-nav">
            <div className="mobile-nav__top">
                <MobileTop {...props} />
            </div>
            <div className="mobile-nav-content">
                <ul className="mobile-nav-content__list">
                    {navbarConfig.map((n, index) => (
                        <>
                            <hr className="mobile-nav-content__divider" />
                            <li className="mobile-nav-content__list-item">
                                {index === 0 ?
                                    <Link
                                        className="mobile-nav-content__link"
                                        to="/explorer"
                                        title="Spending Explorer"
                                        name="explorer"
                                        onClick={clickedLink}>
                                        Search Award Data
                                    </Link>
                                    :
                                    <MobileDropdown
                                        {...props}
                                        label={navbarConfig[index].title}
                                        title={navbarConfig[index].title}
                                        section1Items={navbarConfig[index].section1Items}
                                        section2Items={navbarConfig[index].section2Items}
                                        section3Items={navbarConfig[index].section3Items}
                                        section1Options={navbarConfig[index].section1Options}
                                        section2Options={navbarConfig[index].section2Options}
                                        section3Options={navbarConfig[index].section3Options}
                                        index={index}
                                        active={url} />
                                }
                            </li>
                        </>
                    ))}
                </ul>
            </div>
        </div>
    );
};

MobileNav.propTypes = propTypes;
export default withRouter(MobileNav);

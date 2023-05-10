/**
 * MobileNav.jsx
 * Created by Chas Stevens 5/10/2023
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import Analytics from 'helpers/analytics/Analytics';

import { spendingOptions, profileOptions, downloadOptions, learnResourceOptions } from 'dataMapping/navigation/menuOptions';

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

const MobileNav = (hideMobileNav, location, props) => {
    const [url, setUrl] = useState('');

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
    }, [props.location.pathname]);


    return (
        <div className="mobile-nav">
            <div className="mobile-nav__top">
                <MobileTop {...props} />
            </div>
            <div className="mobile-nav-content">
                <ul className="mobile-nav-content__list">
                    <li className="mobile-nav-content__list-item">
                        <hr className="mobile-nav-content__divider" />
                        <Link
                            className="mobile-nav-content__link"
                            to="/explorer"
                            title="Spending Explorer"
                            name="explorer"
                            onClick={clickedLink}>
                            Spending Explorer
                        </Link>
                        <hr className="mobile-nav-content__divider" />
                    </li>
                    <li className="mobile-nav-content__list-item">
                        <MobileDropdown
                            {...props}
                            label="Explore the Data"
                            items={spendingOptions}
                            active={url} />
                        <hr className="mobile-nav-content__divider" />
                    </li>
                    <li className="mobile-nav-content__list-item">
                        <MobileDropdown
                            {...props}
                            label="Download the Data"
                            items={downloadOptions}
                            active={url} />
                        <hr className="mobile-nav-content__divider" />
                    </li>
                    <li className="mobile-nav-content__list-item">
                        <MobileDropdown
                            {...props}
                            label="Find Resources"
                            items={learnResourceOptions}
                            active={url} />
                    </li>

                </ul>
            </div>
        </div>
    );
};

MobileNav.propTypes = propTypes;
export default withRouter(MobileNav);

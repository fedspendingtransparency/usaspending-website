/**
 * MobileDropdownItem.jsx
 * Created by Kevin Li 10/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import Analytics from 'helpers/analytics/Analytics';
import { getNewUrlForGlossary } from 'helpers/glossaryHelper';
import * as redirectHelper from 'helpers/redirectHelper';

import DropdownComingSoon from '../DropdownComingSoon';

const propTypes = {
    active: PropTypes.bool,
    comingSoon: PropTypes.bool,
    url: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ pathname: PropTypes.string, search: PropTypes.string })]),
    search: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    hideMobileNav: PropTypes.func,
    externalLink: PropTypes.bool,
    isNewTab: PropTypes.bool,
    appendToExistingUrl: PropTypes.bool
};

const clickedHeaderLink = (route) => {
    Analytics.event({
        category: 'Header - Link',
        action: route
    });
};

const MobileDropdownItem = ({
    url,
    title = '',
    active = false,
    comingSoon = false,
    hideMobileNav = false,
    externalLink = false,
    isNewTab = false,
    appendToExistingUrl = false
}) => {
    const { pathname, search } = useLocation();
    const newUrl = appendToExistingUrl
        ? getNewUrlForGlossary(pathname, url, search)
        : url;

    const clickedLink = () => {
        clickedHeaderLink(newUrl);
        hideMobileNav();
        if (externalLink) {
            redirectHelper.showRedirectModal(newUrl);
        }
    };

    let activeClass = '';
    if (active) {
        activeClass = 'mobile-dropdown__link_active';
    }

    let comingSoonClass = '';
    let comingSoonDecorator = null;
    if (comingSoon) {
        comingSoonClass = 'mobile-dropdown__item_coming-soon';
        comingSoonDecorator = (
            <div className="mobile-dropdown__coming-soon">
                <DropdownComingSoon />
            </div>
        );
    }

    let link = (
        <li className={`mobile-dropdown__item ${comingSoonClass}`}>
            <Link
                to={newUrl}
                className={`mobile-dropdown__link ${activeClass}`}
                onClick={clickedLink}>
                {title}
                {isNewTab && <span className="new-badge dropdown-item"> NEW</span>}
            </Link>
            {comingSoonDecorator}
        </li>
    );

    if (externalLink) {
        // Trigger the redirect modal
        link = (
            <li className={`mobile-dropdown__item ${comingSoonClass}`}>
                <button
                    className={`mobile-dropdown__link ${activeClass}`}
                    onClick={clickedLink}>
                    {title}
                </button>
                {comingSoonDecorator}
            </li>
        );
    }

    return link;
};

MobileDropdownItem.propTypes = propTypes;

export default MobileDropdownItem;

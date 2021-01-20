/**
 * DropdownItem.jsx
 * Created by Kevin Li 10/18/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import Analytics from 'helpers/analytics/Analytics';
import * as redirectHelper from 'helpers/redirectHelper';

import DropdownComingSoon from './DropdownComingSoon';

const propTypes = {
    url: PropTypes.string,
    label: PropTypes.node,
    enabled: PropTypes.bool,
    shouldOpenNewTab: PropTypes.bool,
    isNewTab: PropTypes.bool,
    isFirst: PropTypes.bool,
    externalLink: PropTypes.bool,
    appendToExistingUrl: PropTypes.bool
};

const clickedHeaderLink = (route) => {
    Analytics.event({
        category: 'Header - Link',
        action: route
    });
};

const DropdownItem = ({
    url,
    label,
    enabled = true,
    shouldOpenNewTab = false,
    externalLink = false,
    isFirst = false,
    isNewTab = false,
    appendToExistingUrl = false
}) => {
    const { pathname } = useLocation();
    const newUrl = appendToExistingUrl && pathname !== '/' ? `${pathname}/${url}` : url;

    const handleClick = () => {
        redirectHelper.showRedirectModal(newUrl);
        clickedHeaderLink(newUrl);
    };

    let className = 'nav-children__link_disabled';
    let comingSoon = (
        <div className="nav-children__coming-soon">
            <DropdownComingSoon />
        </div>
    );

    const newLabel = isNewTab && enabled
        ? (
            <span>
                {label}
                <span className="covid-newbadge"> NEW</span>
            </span>
        )
        : null;

    if (enabled) {
        className = '';
        comingSoon = null;
    }

    const newTabProps = {};
    if (shouldOpenNewTab) {
        newTabProps.target = '_blank';
        newTabProps.rel = 'noopener noreferrer';
    }

    let link = (
        <Link
            className={`nav-children__link ${className}`}
            to={newUrl}
            onClick={clickedHeaderLink.bind(null, `${newUrl}`)}
            {...newTabProps}>
            {!newLabel && label}
            {newLabel}
            {comingSoon}
        </Link>
    );

    if (enabled && externalLink) {
        // Trigger the redirect modal
        link = (
            <button
                onClick={handleClick}
                className="nav-children__link">
                {!newLabel && label}
                {newLabel}
            </button>
        );
    }

    if (url.includes('http')) {
        link = (
            <a
                className={`nav-children__link ${className}`}
                href={newUrl}
                onClick={clickedHeaderLink.bind(null, `${newUrl}`)}
                {...newTabProps}>
                {!newLabel && label}
                {newLabel}
                {comingSoon}
            </a>
        );
    }

    let firstClass = '';
    if (isFirst) {
        firstClass = 'nav-children__list-separator_hidden';
    }

    return (
        <li className="nav-children__list-item">
            <hr className={`nav-children__list-separator ${firstClass}`} />
            {link}
        </li>
    );
};

DropdownItem.propTypes = propTypes;

export default DropdownItem;

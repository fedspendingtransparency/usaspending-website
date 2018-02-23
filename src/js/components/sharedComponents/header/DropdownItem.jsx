/**
 * DropdownItem.jsx
 * Created by Kevin Li 10/18/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import Analytics from 'helpers/analytics/Analytics';

import DropdownComingSoon from './DropdownComingSoon';

const propTypes = {
    url: PropTypes.string,
    label: PropTypes.string,
    enabled: PropTypes.bool,
    newTab: PropTypes.bool,
    isFirst: PropTypes.bool
};

const clickedHeaderLink = (route) => {
    Analytics.event({
        category: 'Header - Link',
        action: route
    });
};

const DropdownItem = (props) => {
    let className = 'nav-children__link_disabled';
    let comingSoon = (
        <div className="nav-children__coming-soon">
            <DropdownComingSoon />
        </div>
    );
    if (props.enabled) {
        className = '';
        comingSoon = null;
    }

    const newTabProps = {};
    if (props.newTab) {
        newTabProps.target = '_blank';
        newTabProps.rel = 'noopener noreferrer';
    }

    let firstClass = '';
    if (props.isFirst) {
        firstClass = 'nav-children__list-separator_hidden';
    }

    return (
        <li className="nav-children__list-item">
            <hr className={`nav-children__list-separator ${firstClass}`} />
            <a
                className={`nav-children__link ${className}`}
                href={props.url}
                onClick={clickedHeaderLink.bind(null, `${props.url.replace('#', '')}`)}
                {...newTabProps}>
                {props.label}
                {comingSoon}
            </a>
        </li>
    );
};

DropdownItem.propTypes = propTypes;

export default DropdownItem;

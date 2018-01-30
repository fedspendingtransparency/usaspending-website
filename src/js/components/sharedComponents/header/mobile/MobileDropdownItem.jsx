/**
 * MobileDropdownItem.jsx
 * Created by Kevin Li 10/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import DropdownComingSoon from '../DropdownComingSoon';

const propTypes = {
    active: PropTypes.bool,
    comingSoon: PropTypes.bool,
    url: PropTypes.string,
    title: PropTypes.string,
    hideMobileNav: PropTypes.func
};

const MobileDropdownItem = (props) => {
    let activeClass = '';
    if (props.active) {
        activeClass = 'active';
    }

    let comingSoonClass = '';
    let comingSoonDecorator = null;
    if (props.comingSoon) {
        comingSoonClass = 'coming-soon';
        comingSoonDecorator = (
            <div className="coming-soon-wrapper">
                <DropdownComingSoon />
            </div>
        );
    }

    return (
        <li className={comingSoonClass}>
            <a
                href={props.url}
                className={`dropdown-item ${activeClass}`}
                onClick={props.hideMobileNav}>
                {props.title}
            </a>
            {comingSoonDecorator}
        </li>
    );
};

MobileDropdownItem.propTypes = propTypes;

export default MobileDropdownItem;

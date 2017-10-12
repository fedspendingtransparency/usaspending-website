/**
 * MobileProfileItem.jsx
 * Created by Kevin Li 10/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import ProfileComingSoon from '../ProfileComingSoon';

const propTypes = {
    active: PropTypes.bool,
    comingSoon: PropTypes.bool,
    url: PropTypes.string,
    title: PropTypes.string,
    hideMobileNav: PropTypes.func
};

const MobileProfileItem = (props) => {
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
                <ProfileComingSoon />
            </div>
        );
    }

    return (
        <li className={comingSoonClass}>
            <a
                href={props.url}
                className={`profile-item ${activeClass}`}
                onClick={props.hideMobileNav}>
                {props.title}
            </a>
            {comingSoonDecorator}
        </li>
    );
};

MobileProfileItem.propTypes = propTypes;

export default MobileProfileItem;

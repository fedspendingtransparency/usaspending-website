/**
 * ProfileItem.jsx
 * Created by Kevin Li 10/18/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import ProfileComingSoon from './ProfileComingSoon';

const propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    enabled: PropTypes.bool
};

const ProfileItem = (props) => {
    let className = 'disabled';
    let comingSoon = (<ProfileComingSoon />);
    if (props.enabled) {
        className = '';
        comingSoon = null;
    }

    return (
        <li>
            <a
                className={className}
                href={props.url}>
                {props.title}
                {comingSoon}
            </a>
        </li>
    );
};

ProfileItem.propTypes = propTypes;

export default ProfileItem;

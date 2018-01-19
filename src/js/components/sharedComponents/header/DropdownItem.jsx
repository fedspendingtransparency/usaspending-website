/**
 * DropdownItem.jsx
 * Created by Kevin Li 10/18/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import DropdownComingSoon from './DropdownComingSoon';

const propTypes = {
    url: PropTypes.string,
    label: PropTypes.string,
    enabled: PropTypes.bool
};

const DropdownItem = (props) => {
    let className = 'disabled';
    let comingSoon = (<DropdownComingSoon />);
    if (props.enabled) {
        className = '';
        comingSoon = null;
    }

    return (
        <li>
            <a
                className={className}
                href={props.url}>
                {props.label}
                {comingSoon}
            </a>
        </li>
    );
};

DropdownItem.propTypes = propTypes;

export default DropdownItem;

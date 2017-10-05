/**
 * MobileTop.jsx
 * Created by Kevin Li 9/29/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Close } from 'components/sharedComponents/icons/Icons';

const MobileTop = (props) => (
    <div className="nav-top">
        <div className="logo">
            <div className="usa-logo" id="logo-nav">
                <a
                    href="#/"
                    title="USAspending.gov Home"
                    aria-label="USAspending.gov Home"
                    onClick={props.hideMobileNav}>
                    <span className="logo-sr">USAspending.gov</span>
                </a>
            </div>
        </div>
        <div className="close">
            <button
                className="close-button"
                title="Close menu"
                aria-label="Close menu"
                onClick={props.hideMobileNav}>
                <Close alt="Close menu" />
            </button>
        </div>
    </div>
);

MobileTop.propTypes = {
    hideMobileNav: PropTypes.func
};

export default MobileTop;

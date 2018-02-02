/**
 * MobileTop.jsx
 * Created by Kevin Li 9/29/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Close } from 'components/sharedComponents/icons/Icons';

const MobileTop = (props) => (
    <div className="mobile-nav-header">
        <div className="mobile-nav-header__logo site-logo">
            <div className="site-logo__wrapper" id="logo-nav">
                <a
                    className="site-logo__link"
                    href="#/"
                    title="USAspending.gov Home"
                    aria-label="USAspending.gov Home"
                    onClick={props.hideMobileNav}>
                    <img
                        className="site-logo__image"
                        src="img/logo.png"
                        srcSet="img/logo.png 1x, img/logo@2x.png 2x"
                        alt="USAspending.gov" />
                </a>
            </div>
        </div>
        <div className="mobile-nav-header__close">
            <button
                className="mobile-nav-header__close-button"
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

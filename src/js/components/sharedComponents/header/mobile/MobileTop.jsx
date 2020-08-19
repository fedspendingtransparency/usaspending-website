/**
 * MobileTop.jsx
 * Created by Kevin Li 9/29/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Analytics from 'helpers/analytics/Analytics';

import { Close } from 'components/sharedComponents/icons/Icons';

const clickedHeaderLink = (route) => {
    Analytics.event({
        category: 'Header - Link',
        action: route
    });
};

export default class MobileTop extends React.Component {
    constructor(props) {
        super(props);

        this.clickedLink = this.clickedLink.bind(this);
    }

    clickedLink() {
        clickedHeaderLink('/');
        this.props.hideMobileNav();
    }

    render() {
        return (
            <div className="mobile-nav-header">
                <div className="mobile-nav-header__logo site-logo">
                    <div className="site-logo__wrapper" id="logo-nav">
                        <Link
                            className="site-logo__link"
                            to="/"
                            title="USAspending.gov Home"
                            aria-label="USAspending.gov Home"
                            onClick={this.clickedLink}>
                            <img
                                className="site-logo__image"
                                src="img/logo.png"
                                srcSet="img/logo.png 1x, img/logo@2x.png 2x"
                                alt="USAspending.gov" />
                        </Link>
                    </div>
                </div>
                <div className="mobile-nav-header__close">
                    <button
                        className="mobile-nav-header__close-button"
                        title="Close menu"
                        aria-label="Close menu"
                        onClick={this.props.hideMobileNav}>
                        <Close alt="Close menu" />
                    </button>
                </div>
            </div>
        );
    }
}

MobileTop.propTypes = {
    hideMobileNav: PropTypes.func
};

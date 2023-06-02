/**
 * MobileTop.jsx
 * Created by Kevin Li 9/29/17
 */

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GovBanner from "./../GovBanner";
import Analytics from 'helpers/analytics/Analytics';



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

    clickedLink(e) {
        clickedHeaderLink('/');
        this.props.hideMobileNav(e);
    }

    render() {
        return (
            <div>
                <GovBanner />
                <div className="mobile-nav-header">
                    <div style={this.props.detailMobileNavIsHidden ? {} : { display: "none" }} className="mobile-nav-header__logo site-logo">
                        <div className="site-logo__wrapper" id="logo-nav">
                            <Link
                                className="site-logo__link"
                                to="/"
                                title="USAspending.gov Home"
                                aria-label="USAspending.gov Home"
                                onClick={(e) => this.clickedLink(e)}>
                                <img
                                    className="site-logo__image"
                                    src="img/logo.png"
                                    srcSet="img/logo.png 1x, img/logo@2x.png 2x"
                                    alt="USAspending.gov" />
                            </Link>
                        </div>
                    </div>
                    <div className="mobile-nav_back-button-container" style={this.props.detailMobileNavIsHidden ? { display: "none" } : {}}>
                        <div className="mobile-nav_back-button-icon">
                            <FontAwesomeIcon icon="chevron-left" />
                        </div>
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div className="mobile-nav_back-button" onClick={() => this.props.closeDetailedMobileNav()}>Back</div>
                    </div>
                    <div className="mobile-nav-header__close">
                        <button
                            className={this.props.detailMobileNavIsHidden ? "mobile-nav-header__close-button" : "mobile-nav-header__close-button-section"}
                            title="Close menu"
                            aria-label="Close menu"
                            onClick={(e) => this.props.hideMobileNav(e)}>
                            <FontAwesomeIcon size="lg" alt="close button" icon="times" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

MobileTop.propTypes = {
    hideMobileNav: PropTypes.func
};

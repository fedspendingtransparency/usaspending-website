import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { isBefore, startOfToday } from 'date-fns';
import { isIe } from "helpers/browser";

import GlossaryContainer from 'containers/glossary/GlossaryContainer';
import GlobalModalContainer from 'containers/globalModal/GlobalModalContainer';
import Analytics from 'helpers/analytics/Analytics';
import InfoBanner from './InfoBanner';
import NavBar from './NavBar';

const clickedHeaderLink = (route) => {
    Analytics.event({
        category: 'Header - Link',
        action: route
    });
};

let cookie = 'usaspending_covid_release';
if (isIe() && isBefore(startOfToday(), new Date(2022, 1, 18))) {
    cookie = 'usaspending_end_of_IE';
    Cookies.set(cookie, 'showIEBanner');
}

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showInfoBanner: false
        };
        // bind functions
        this.skippedNav = this.skippedNav.bind(this);
        this.closeBanner = this.closeBanner.bind(this);
        this.openBannerModal = this.openBannerModal.bind(this);
    }

    componentDidMount() {
        this.setShowInfoBanner();
    }

    setShowInfoBanner() {
        if (Cookies.get(cookie) === 'showIEBanner') {
            this.setState({
                showInfoBanner: true
            });
        }
    }
    skippedNav(e) {
        // don't update the URL due to potential React Router conflicts
        e.preventDefault();
        // scroll to the main-content id
        const mainContent = document.getElementById('main-content');
        const mainFocus = document.querySelector('#main-content h1');
        const yPos = mainContent.getBoundingClientRect().top;
        window.scrollTo(0, yPos);
        // focus on the element
        if (mainFocus) {
            mainFocus.focus();
        }
    }
    closeBanner(bannerType) {
        // set a cookie to hide the banner in the future if banner is closed
        Cookies.set(cookie, 'hide', { expires: 7 });
        this.setState({
            [bannerType]: false
        });
    }

    openBannerModal(e) {
        e.preventDefault();
        this.props.showModal(null, 'covid');
    }


    render() {
        let infoBanner = (
            <InfoBanner
                triggerModal={this.openBannerModal}
                closeBanner={this.closeBanner} />
        );
        if (!this.state.showInfoBanner) {
            infoBanner = null;
        }
        return (
            <div className="site-header">
                <a
                    href="#main-content"
                    className="skip-nav"
                    onClick={this.skippedNav}>
                        Skip to main content
                </a>
                <header
                    className="site-header__wrapper"
                    aria-label="Site header">
                    <div
                        className="official-banner"
                        role="note">
                        <div className="official-banner__wrapper">
                            <ul
                                className="official-banner__site-list">
                                <li>
                                    <Link
                                        className="official-banner__site-link"
                                        to="/"
                                        onClick={clickedHeaderLink.bind(null, 'https:/www.usaspending.gov')}>
                                        USAspending.gov
                                    </Link>
                                </li>
                                <li
                                    className="official-banner__site-item official-banner__site-item_spacer"
                                    aria-hidden="true">
                                    |
                                </li>
                                <li>
                                    <a
                                        className="official-banner__site-link"
                                        href="https://datalab.usaspending.gov"
                                        onClick={clickedHeaderLink.bind(null, 'https://datalab.usaspending.gov')}>
                                        Data Lab
                                    </a>
                                </li>
                                <li
                                    className="official-banner__site-item official-banner__site-item_spacer"
                                    aria-hidden="true">
                                    |
                                </li>
                                <li>
                                    <a
                                        className="official-banner__site-link"
                                        href="http://fiscaldata.treasury.gov/"
                                        onClick={clickedHeaderLink.bind(null, 'http://fiscaldata.treasury.gov')}>
                                        Fiscal Data
                                    </a>
                                </li>
                            </ul>
                            <div className="official-banner__message">
                                <p className="official-banner__text">
                                    An official website of the U.S. government
                                </p>
                                <img
                                    className="official-banner__flag"
                                    src="img/us_flag_small.png"
                                    alt="U.S. flag" />
                            </div>
                        </div>
                    </div>
                    {infoBanner}
                    <NavBar />
                </header>
                <GlossaryContainer />
                <GlobalModalContainer />
            </div>
        );
    }
}

Header.propTypes = {
    showModal: PropTypes.func
};

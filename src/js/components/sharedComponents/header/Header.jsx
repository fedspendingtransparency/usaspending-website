import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

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

export const CovidHomepageCookie = 'usaspending_covid_release';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showInfoBanner: false
        };
        // bind functions
        this.skippedNav = this.skippedNav.bind(this);
        this.closeBanner = this.closeBanner.bind(this);
        this.openCovidModalContainer = this.openCovidModalContainer.bind(this);
    }
    componentWillMount() {
        // check if the info banner cookie exists
        if (!Cookies.get(CovidHomepageCookie)) {
            // cookie does not exist, show the banner
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
    closeBanner(bannerType, cookieName) {
        // set a cookie to hide the banner in the future if banner is closed
        Cookies.set(cookieName, 'hide', { expires: 730 });
        this.setState({
            [bannerType]: false
        });
    }

    openCovidModalContainer(e) {
        e.preventDefault();
        this.props.showModal(null, 'covid');
    }

    render() {
        let infoBanner = (
            <InfoBanner
                triggerModal={this.openCovidModalContainer}
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
                        <ul
                            className="official-banner__site-list">
                            <li>
                                <a
                                    className="official-banner__site-link"
                                    href="https://www.usaspending.gov"
                                    onClick={clickedHeaderLink.bind(null, 'https:/www.usaspending.gov')}>
                                    USAspending.gov
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
                        <div className="official-banner__wrapper">
                            <div className="official-banner__text">
                                An official website of the U.S. government
                            </div>
                            <img
                                className="official-banner__flag"
                                src="img/us_flag_small.png"
                                alt="U.S. flag" />
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

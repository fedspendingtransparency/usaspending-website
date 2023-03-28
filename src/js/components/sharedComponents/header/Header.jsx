import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import GlossaryContainer from 'containers/glossary/GlossaryContainer';
import GlobalModalContainer from 'containers/globalModal/GlobalModalContainer';
import Analytics from 'helpers/analytics/Analytics';
import AboutTheDataContainer from "containers/aboutTheDataSidebar/AboutTheDataContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExternalLink from 'components/sharedComponents/ExternalLink';
import NavBar from './NavBar';
import InfoBanner from "./InfoBanner";

const clickedHeaderLink = (route) => {
    Analytics.event({
        category: 'Header - Link',
        action: route
    });
};

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        // bind functions
        this.skippedNav = this.skippedNav.bind(this);
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

    render() {
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
                    <NavBar />
                    <InfoBanner
                        icon={<FontAwesomeIcon style={{ width: "27", height: "27" }} icon="info-circle" color="#97d4ea" />}
                        border="#97d4ea"
                        backgroundColor="#e1f3f8"
                        title="Love using USAspending.gov? Tell us more!"
                        content={<>USAspending.gov is looking to share stories of how federal spending data has improved your life or increased your trust in government.
                            Do you have a story to share?&nbsp;<ExternalLink isCard url="https://forms.office.com/g/neemMd2J4a">Fill out this survey and you may be featured in an upcoming USAspending YouTube video!</ExternalLink></>} />
                </header>
                <AboutTheDataContainer />
                <GlossaryContainer />
                <GlobalModalContainer />
            </div>
        );
    }
}

Header.propTypes = {
    showModal: PropTypes.func
};

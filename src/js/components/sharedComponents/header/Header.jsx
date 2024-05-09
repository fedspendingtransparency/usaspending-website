import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import GlobalConstants from 'GlobalConstants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GlossaryContainer from 'containers/glossary/GlossaryContainer';
import GlobalModalContainer from 'containers/globalModal/GlobalModalContainer';
import AboutTheDataContainer from "containers/aboutTheDataSidebar/AboutTheDataContainer";
import NavbarWrapper from './NavbarWrapper';
import GovBanner from "./GovBanner";
import InfoBanner from './InfoBanner';

const Header = () => {
    const location = useLocation();

    const skippedNav = (e) => {
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
    };

    const isBannerActive = () => {
        if (GlobalConstants?.BANNER?.isActive) {
            if (GlobalConstants.BANNER.page && GlobalConstants.BANNER.page !== "") {
                return location.pathname === GlobalConstants.BANNER.page;
            }
            return true;
        }

        return false;
    };

    return (
        <div className="site-header">
            <a
                href="#main-content"
                className="skip-nav"
                onClick={skippedNav}>
                    Skip to main content
            </a>
            <header
                className="site-header__wrapper"
                aria-label="Site header">
                <GovBanner />
                {isBannerActive() &&
                    <InfoBanner
                        icon={<FontAwesomeIcon size="lg" icon="exclamation-triangle" color="#FDB81E" />}
                        borderTopColor="#f9c642"
                        backgroundColor="#fff1d2"
                        title={GlobalConstants?.BANNER?.isActive ? GlobalConstants.BANNER.title : ""}
                        content={GlobalConstants.BANNER.isActive ? GlobalConstants.BANNER.content : ""} />}
                <NavbarWrapper />
            </header>
            <AboutTheDataContainer />
            <GlossaryContainer />
            <GlobalModalContainer />
        </div>
    );
};

Header.propTypes = {
    showModal: PropTypes.func
};

export default Header;

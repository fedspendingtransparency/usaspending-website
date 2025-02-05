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
                return location.pathname.includes(GlobalConstants.BANNER.page);
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
                <NavbarWrapper />
            </header>
            {isBannerActive() &&
                    <InfoBanner
                        icon={<FontAwesomeIcon size="lg" icon="exclamation-triangle" color="#FA9441" />}
                        // GENERAL NOTIFICATION
                        // borderTopColor="#59b9de"
                        // backgroundColor="#e1f3f8"
                        // borderBottomColor="#97d4ea"
                        // color="#59B9DE" (info-circle use for fontawesomeicon above)
                        // WARNING
                        borderTopColor="#FA9441"
                        backgroundColor="#FEF2E4"
                        borderBottomColor="#FFBC78"
                        // color="#FA9441" (exclamation-triangle use for fontawesomeicon above)
                        // WARNING RESOLVED
                        // borderTopColor="#21C834"
                        // backgroundColor="#E3F5E1"
                        // borderBottomColor="#70E17B"
                        // color="#21C834" (check-circle use for fontawesomeicon above)
                        title={GlobalConstants?.BANNER?.isActive ? GlobalConstants.BANNER.title : ""}
                        content={GlobalConstants.BANNER.isActive ? GlobalConstants.BANNER.content : ""} />}
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

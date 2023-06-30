import React from 'react';
import PropTypes from 'prop-types';

import GlossaryContainer from 'containers/glossary/GlossaryContainer';
import GlobalModalContainer from 'containers/globalModal/GlobalModalContainer';
import AboutTheDataContainer from "containers/aboutTheDataSidebar/AboutTheDataContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavbarWrapper from './NavbarWrapper';
import InfoBanner from "./InfoBanner";
import GovBanner from "./GovBanner";
import AboutTheDataLink from "../AboutTheDataLink";

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
                    <InfoBanner
                        icon={<FontAwesomeIcon style={{ width: "20", height: "20" }} size="lg" icon="info-circle" color="#97d4ea" />}
                        borderTopColor="#97d4ea"
                        borderBottomColor="#c3ebfa"
                        backgroundColor="#e1f3f8"
                        title={<>New congressional district data available</>}
                        content={<>USAspending.gov now has new congressional district data as a result of the 2020 census. Districts are identified sitewide as “current” or “submitted” (i.e., original). <AboutTheDataLink slug="congressional-district-data">Learn more about redistricting and the changes you’ll find on the site.</AboutTheDataLink></>} />
                    <GovBanner />
                    <NavbarWrapper />
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

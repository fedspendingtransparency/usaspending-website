import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GovBanner } from "@trussworks/react-uswds";
import '@trussworks/react-uswds/lib/index.css';
import GlossaryContainer from 'containers/glossary/GlossaryContainer';
import GlobalModalContainer from 'containers/globalModal/GlobalModalContainer';
import AboutTheDataContainer from "containers/aboutTheDataSidebar/AboutTheDataContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExternalLink from 'components/sharedComponents/ExternalLink';
import NavBar from './NavBar';
import InfoBanner from "./InfoBanner";

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
                        title={<>Love using USAspending.gov?&nbsp;<br className="info-banner__linebreak" />Tell us more!</>}
                        content={<>USAspending.gov is looking to share stories of how federal spending data has improved your life or increased your trust in government.&nbsp;<ExternalLink isCard url="https://forms.office.com/g/neemMd2J4a">Share your story and you may be featured in an upcoming USAspending Youtube video!</ExternalLink></>} />
                    <GovBanner />
                    <NavBar />
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

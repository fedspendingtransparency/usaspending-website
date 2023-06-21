import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import GlossaryContainer from 'containers/glossary/GlossaryContainer';
import GlobalModalContainer from 'containers/globalModal/GlobalModalContainer';
import AboutTheDataContainer from "containers/aboutTheDataSidebar/AboutTheDataContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavbarWrapper from './NavbarWrapper';
import InfoBanner from "./InfoBanner";
import GovBanner from "./GovBanner";
import {
    setAboutTheDataTermFromUrl,
    showAboutTheData
} from "../../../redux/actions/aboutTheDataSidebar/aboutTheDataActions";
import { setLastOpenedSlideout } from "../../../redux/actions/slideouts/slideoutActions";

export class Header extends React.Component {
    constructor(props) {
        super(props);

        // bind functions
        this.skippedNav = this.skippedNav.bind(this);
        this.atdClick = this.atdClick.bind(this);
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

    atdClick() {
        this.props.openATD();
        // make sure it will open on top of glossary if glossary is already open
        this.props.setSlideout('atd');
        this.props.setATDTerm('congressional-district-data');
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
                        content={<>USAspending.gov now has new congressional district data as a result of the 2020 census. Districts are identified sitewide as “current” or “submitted” (i.e., original).{' '}
                            <Link onClick={this.atdClick}>Learn more about redistricting and the changes you’ll find on the site. </Link>
                        </>} />
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
    showModal: PropTypes.func,
    openATD: PropTypes.func,
    setATDTerm: PropTypes.func,
    setSlideout: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
    openATD: () => dispatch(showAboutTheData()),
    setATDTerm: (term) => dispatch(setAboutTheDataTermFromUrl(term)),
    setSlideout: (str) => dispatch(setLastOpenedSlideout(str))
});

export default connect(null, mapDispatchToProps)(Header);


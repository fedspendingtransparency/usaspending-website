/**
 * Footer2.jsx
 * Created by Brian Petway 04/06/2023
 **/

import React, { useState, useEffect } from 'react';
import { tabletScreen, mlargeScreen } from 'dataMapping/shared/mobileBreakpoints';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { throttle } from "lodash";
import { connect } from "react-redux";
import { showModal } from 'redux/actions/modal/modalActions';
import Analytics from 'helpers/analytics/Analytics';
import { faFacebookSquare, faGithub, faLinkedin, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StayInTouch from "../components/sharedComponents/StayInTouch";
import FooterExternalLink from "../components/sharedComponents/FooterExternalLink";
import { DownloadBottomBarContainer } from "./search/modals/fullDownload/DownloadBottomBarContainer";
import { BulkDownloadBottomBarContainer } from "./bulkDownload/modal/BulkDownloadBottomBarContainer";

require('layouts/default/footer2/footer2.scss');

const propTypes = {
    pageName: PropTypes.string.isRequired,
    filters: PropTypes.object,
    redirectUser: PropTypes.func
};

const clickedFooterLink = (route) => {
    Analytics.event({
        category: 'Footer - Link',
        action: route
    });
};

const Footer2 = ({
    pageName,
    filters,
    redirectUser
}) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < tabletScreen);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= mlargeScreen);

    const generateOnClick = (url) => () => {
        clickedFooterLink(url);
        redirectUser(url);
    };
    const year = new Date().getFullYear();

    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsMobile(newWidth < tabletScreen);
                setIsLargeScreen(newWidth >= mlargeScreen);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobile, isLargeScreen, windowWidth]);

    return (
        <footer>
            <DownloadBottomBarContainer
                filters={filters} />
            <BulkDownloadBottomBarContainer />
            <StayInTouch pageName={pageName} />
            <div className="footer2-container">
                <div className="footer2-logo-container">
                    <div className="footer2-logo">
                        <Link
                            to="/"
                            title="USAspending.gov Home"
                            aria-label="USAspending.gov Home"
                            onClick={clickedFooterLink.bind(null, '/')}>
                            <img src="img/footer_logo.png" alt="USAspending.gov" />
                        </Link>
                    </div>
                    {isLargeScreen && (
                        <div className="footer2-border-bottom" />
                    )}
                </div>
                <div className="footer2-large-screen-row-one">
                    <div className="footer2-heading-container">
                        <div className="footer2-heading">
                    Building a more transparent government.
                        </div>
                        <div className="footer2-subHeading">
                    Providing publicly accessible and searchable data on what the federal government spends each year.
                        </div>
                    </div>
                    <div className="footer2-main-links-section">
                        <div className="footer2-link-section">
                            <div className="footer2-link-section-title">ABOUT</div>
                            <ul>
                                <li>
                                    <Link
                                        to="/about"
                                        onClick={clickedFooterLink.bind(null, '/about')}>
                            Mission
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/about?section=careers"
                                        onClick={clickedFooterLink.bind(null, '/about')}>
                            Careers
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="footer2-link-section">
                            <div className="footer2-link-section-title">HELP</div>
                            <ul>
                                <li>
                                    <FooterExternalLink
                                        link="https://fiscalservice.force.com/usaspending/s/recordlist/Knowledge__kav/00B3d000000V4WDEA0"
                                        title="FAQs" />
                                </li>
                                <li>
                                    <FooterExternalLink
                                        link="https://fiscalservice.force.com/usaspending/s/"
                                        title="Community" />
                                </li>
                                <li>
                                    <a
                                        href="mailto:usaspending.help@fiscal.treasury.gov?subject=Contact%20Us"
                                        onClick={clickedFooterLink.bind(
                                            null,
                                            'mailto:usaspending.help@fiscal.treasury.gov?subject=Contact%20Us'
                                        )}>
                                Email Us
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer2-link-section">
                            <div className="footer2-link-section-title">RELATED SITES</div>
                            <ul>
                                <li>
                                    <a target="_blank" rel="noopener noreferrer" href="https://fiscaldata.treasury.gov/">Fiscal Data</a>
                                </li>
                                <li>
                                    <a target="_blank" rel="noopener noreferrer" href="https://fiscal.treasury.gov/">Bureau of the Fiscal Service</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer2-large-screen-row-two">
                    <div className="footer2-social-media-section">
                        <ul>
                            <li>
                                <button onClick={generateOnClick("https://www.youtube.com/channel/UCyDn83O-0XC98H3TCV-VCGQ")} title="Youtube">
                                    <FontAwesomeIcon icon={faYoutube} size="sm" color="#dfe1e2" />
                                </button>
                            </li>
                            <li>
                                <button onClick={generateOnClick("https://twitter.com/usaspending/")} title="Twitter">
                                    <FontAwesomeIcon icon={faTwitter} size="sm" color="#dfe1e2" />
                                </button>
                            </li>
                            <li>
                                <button onClick={generateOnClick("https://www.facebook.com/fiscalservice/")} title="Facebook">
                                    <FontAwesomeIcon icon={faFacebookSquare} size="sm" color="#dfe1e2" />
                                </button>
                            </li>
                            <li>
                                <button onClick={generateOnClick("https://github.com/fedspendingtransparency/usaspending-website")} title="Github">
                                    <FontAwesomeIcon icon={faGithub} size="sm" color="#dfe1e2" />
                                </button>
                            </li>
                            <li>
                                <button onClick={generateOnClick("https://www.linkedin.com/company/bureau-of-the-fiscal-service/")} title="LinkedIn">
                                    <FontAwesomeIcon icon={faLinkedin} size="sm" color="#dfe1e2" />
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="footer2-legal-links-section">
                        <ul>
                            <li>
                                <Link
                                    to="/about/accessibility"
                                    onClick={clickedFooterLink.bind(null, '/about/accessibility')}>
                                Accessibility
                                </Link>
                            </li>
                            {!isMobile && (
                                <li className="footer2-pipe-class">|</li>
                            )}
                            <li>
                                <Link
                                    to="/about/privacy"
                                    onClick={clickedFooterLink.bind(null, '/about/privacy')}>
                                Privacy Policy
                                </Link>
                            </li>
                            {!isMobile && (
                                <li className="footer2-pipe-class">|</li>
                            )}
                            <li>
                                <Link
                                    to="/about/foia"
                                    onClick={clickedFooterLink.bind(null, '/about/foia')}>
                                Freedom of Information Act
                                </Link>
                            </li>
                            {!isMobile && (
                                <li className="footer2-pipe-class">|</li>
                            )}
                            <li>
                                <Link
                                    to="/db_info"
                                    title="Limitation on Permissible Use of Dun & Bradstreet, Inc. (D&B) Data"
                                    aria-label="Limitation on Permissible Use of Dun & Bradstreet, Inc. (D&B) Data"
                                    onClick={clickedFooterLink.bind(null, '/db_info')}>
                                D&B Information
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer2-copyright-section">
                        &copy; {year} USAspending.gov
                    </div>
                </div>
            </div>
        </footer>
    );
};

Footer2.propTypes = propTypes;

const mapDispatchToProps = (dispatch) => ({
    redirectUser: (url) => dispatch(showModal(url))
});

export default connect(null, mapDispatchToProps)(Footer2);


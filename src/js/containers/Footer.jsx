/**
 * Footer.jsx
 * Created by Brian Petway 04/14/23
 **/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { throttle } from "lodash";
import { tabletScreen, mLargeScreen } from 'dataMapping/shared/mobileBreakpoints';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faLinkedin, faGithub, faYoutube } from "@fortawesome/free-brands-svg-icons";

import { showModal } from 'redux/actions/modal/modalActions';

import Analytics from 'helpers/analytics/Analytics';
import DownloadBottomBarContainer from
    'containers/search/modals/fullDownload/DownloadBottomBarContainer';
import BulkDownloadBottomBarContainer from
    'containers/bulkDownload/modal/BulkDownloadBottomBarContainer';
import FooterExternalLink from 'components/sharedComponents/FooterExternalLink';
import StayInTouch from "../components/sharedComponents/StayInTouch";

const propTypes = {
    pageName: PropTypes.string.isRequired,
    filters: PropTypes.object,
    redirectUser: PropTypes.func
};

const clickedFooterLink = (route) => {
    Analytics.event({
        event: 'footer-external-links',
        category: 'Footer - Link',
        action: route
    });
};

const Footer = ({
    pageName,
    filters,
    redirectUser
}) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < tabletScreen);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= mLargeScreen);

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
                setIsLargeScreen(newWidth >= mLargeScreen);
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
            <div className="footer-container">
                <div className="footer-logo-container">
                    <div className="footer-logo">
                        <Link
                            to="/"
                            title="USAspending.gov Home"
                            aria-label="USAspending.gov Home"
                            onClick={clickedFooterLink.bind(null, '/')}>
                            <img src="img/footer_logo.png" alt="USAspending.gov" />
                        </Link>
                    </div>
                    {isLargeScreen && (
                        <div className="footer-border-bottom" />
                    )}
                </div>
                <div className="footer-large-screen-row-one">
                    <div className="footer-heading-container">
                        <div className="footer-heading">
                            Building a more transparent government.
                        </div>
                        <div className="footer-subHeading">
                            Providing publicly accessible and searchable data on what the federal government spends each year.
                        </div>
                    </div>
                    <div className="footer-main-links-section">
                        <div className="footer-link-section">
                            <div className="footer-link-section-title">ABOUT</div>
                            <ul>
                                <li>
                                    <Link
                                        to="/about"
                                        onClick={clickedFooterLink.bind(null, '/about')}>
                                        Mission
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-link-section">
                            <div className="footer-link-section-title">HELP</div>
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
                        <div className="footer-link-section">
                            <div className="footer-link-section-title">RELATED SITES</div>
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
                <div className="footer-large-screen-row-two">
                    <div className="footer-social-media-section">
                        <ul>
                            <li>
                                <button onClick={generateOnClick("https://www.youtube.com/channel/UCyDn83O-0XC98H3TCV-VCGQ")} title="Youtube">
                                    <FontAwesomeIcon icon={faYoutube} size="sm" color="#dfe1e2" />
                                </button>
                            </li>
                            <li>
                                <button onClick={generateOnClick("https://twitter.com/usaspending/")} title="X (Twitter)">
                                    <svg
                                        className="footer__twitter-logo"
                                        width="1200"
                                        height="1227"
                                        viewBox="0 0 1200 1227"
                                        fill="none">
                                        <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="#DFE1E2" />
                                    </svg>
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
                    <div className="footer-legal-links-section">
                        <ul>
                            <li>
                                <Link
                                    to="/about/accessibility"
                                    onClick={clickedFooterLink.bind(null, '/about/accessibility')}>
                                    Accessibility
                                </Link>
                            </li>
                            {!isMobile && (
                                <li className="footer-pipe-class">|</li>
                            )}
                            <li>
                                <Link
                                    to="/about/privacy"
                                    onClick={clickedFooterLink.bind(null, '/about/privacy')}>
                                    Privacy Policy
                                </Link>
                            </li>
                            {!isMobile && (
                                <li className="footer-pipe-class">|</li>
                            )}
                            <li>
                                <Link
                                    to="/about/foia"
                                    onClick={clickedFooterLink.bind(null, '/about/foia')}>
                                    Freedom of Information Act
                                </Link>
                            </li>
                            {!isMobile && (
                                <li className="footer-pipe-class">|</li>
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
                    <div className="footer-copyright-section">
                        &copy; {year} USAspending.gov
                    </div>
                </div>
            </div>
        </footer>
    );
};

Footer.propTypes = propTypes;

const mapDispatchToProps = (dispatch) => ({
    redirectUser: (url) => dispatch(showModal(url))
});

export default connect(null, mapDispatchToProps)(Footer);

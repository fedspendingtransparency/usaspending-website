/**
 * FooterComponent.jsx
 * Created by Destin Frasier 02/24/2017
 **/

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faLinkedin, faGithub, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

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
        category: 'Footer - Link',
        action: route
    });
};

const Footer = ({
    pageName,
    filters,
    redirectUser
}) => {
    const generateOnClick = (url) => () => {
        clickedFooterLink(url);
        redirectUser(url);
    };
    const year = new Date().getFullYear();
    return (
        <div className="footer-container">
            <DownloadBottomBarContainer
                filters={filters} />
            <BulkDownloadBottomBarContainer />
            <StayInTouch pageName={pageName} />
            <footer
                className="footer-outer-wrap"
                role="contentinfo"
                aria-label="Footer">
                <div className="footer-container">
                    <div className="footer-logo">
                        <Link
                            to="/"
                            title="USAspending.gov Home"
                            aria-label="USAspending.gov Home"
                            onClick={clickedFooterLink.bind(null, '/')}>
                            <img src="img/footer_logo.png" alt="USAspending.gov" />
                        </Link>
                    </div>
                    <div className="footer-links">
                        <div className="link-group">
                            <div className="group-title">
                                About
                            </div>
                            <ul className="links">
                                <li>
                                    <Link
                                        to="/about"
                                        onClick={clickedFooterLink.bind(null, '/about')}>
                                        About USAspending
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
                        <div className="link-group">
                            <div className="group-title">
                                Help
                            </div>
                            <ul className="links">
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
                                        Contact Us
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="link-group">
                            <div className="group-title">
                                Developers
                            </div>
                            <ul className="links">
                                <li>
                                    <FooterExternalLink
                                        link="https://api.usaspending.gov"
                                        title="API" />
                                </li>
                                <li>
                                    <FooterExternalLink
                                        link="https://github.com/fedspendingtransparency/usaspending-website/tree/master"
                                        title="Explore the Code" />
                                </li>
                                <li>
                                    <FooterExternalLink
                                        link="https://github.com/fedspendingtransparency/usaspending-website/wiki"
                                        title="Release Notes" />
                                </li>
                            </ul>
                        </div>
                        <div className="link-group">
                            <div className="group-title">
                                    Our Sites
                            </div>
                            <ul className="links">
                                <li>
                                    <a target="_blank" rel="noopener noreferrer" href="https://fiscaldata.treasury.gov/">Fiscal Data</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="legal-and-social-links">
                        <ul className="legal-links">
                            <li className="copyright__legal-item">
                                <Link
                                    className="copyright__link"
                                    to="/about/accessibility"
                                    onClick={clickedFooterLink.bind(null, '/about/accessibility')}>
                                    Accessibility
                                </Link>
                            </li>
                            <li className="copyright__legal-item">
                                <Link
                                    className="copyright__link"
                                    to="/about/privacy"
                                    onClick={clickedFooterLink.bind(null, '/about/privacy')}>
                                    Privacy Policy
                                </Link>
                            </li>
                            <li className="copyright__legal-item">
                                <Link
                                    className="copyright__link"
                                    to="/about/foia"
                                    onClick={clickedFooterLink.bind(null, '/about/foia')}>
                                    Freedom of Information Act
                                </Link>
                            </li>
                        </ul>
                        <ul className="social-links">
                            <li className="social-link">
                                <button onClick={generateOnClick("https://www.youtube.com/channel/UCyDn83O-0XC98H3TCV-VCGQ")} title="Youtube">
                                    <FontAwesomeIcon icon={faYoutube} size="1x" color="#D4D4D4" />
                                </button>
                            </li>
                            <li className="social-link">
                                <button onClick={generateOnClick("https://twitter.com/usaspending/")} title="Twitter">
                                    <FontAwesomeIcon icon={faTwitter} size="1x" color="#D4D4D4" />
                                </button>
                            </li>
                            <li className="social-link">
                                <button onClick={generateOnClick("https://www.facebook.com/fiscalservice/")} title="Facebook">
                                    <FontAwesomeIcon icon={faFacebookSquare} size="1x" color="#D4D4D4" />
                                </button>
                            </li>
                            <li className="social-link">
                                <button onClick={generateOnClick("https://github.com/fedspendingtransparency/usaspending-website")} title="Github">
                                    <FontAwesomeIcon icon={faGithub} size="1x" color="#D4D4D4" />
                                </button>
                            </li>
                            <li className="social-link">
                                <button onClick={generateOnClick("https://www.linkedin.com/company/bureau-of-the-fiscal-service/")} title="LinkedIn">
                                    <FontAwesomeIcon icon={faLinkedin} size="1x" color="#D4D4D4" />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="copyright">
                    <div className="copyright__container">
                        <p className="copyright__notice">
                            &copy; {year} USAspending.gov
                        </p>
                        <p className="copyright__db">
                            <strong>NOTE:</strong>&nbsp;<Link to="/db_info" target="_blank" rel="noopener noreferrer" title="Limitation on Permissible Use of Dun & Bradstreet, Inc. (D&B) Data" aria-label="Limitation on Permissible Use of Dun & Bradstreet, Inc. (D&B) Data" onClick={clickedFooterLink.bind(null, '/db_info')}>You must click here for very important D&amp;B information.</Link>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

Footer.propTypes = propTypes;

const mapDispatchToProps = (dispatch) => ({
    redirectUser: (url) => dispatch(showModal(url))
});

export default connect(null, mapDispatchToProps)(Footer);

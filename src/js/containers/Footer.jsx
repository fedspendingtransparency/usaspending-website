/**
 * FooterComponent.jsx
 * Created by Destin Frasier 02/24/2017
 **/

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faLinkedin, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";

import { showModal } from 'redux/actions/modal/modalActions';

import Analytics from 'helpers/analytics/Analytics';
import GlossaryButtonWrapperContainer from 'containers/glossary/GlossaryButtonWrapperContainer';
import DownloadBottomBarContainer from
    'containers/search/modals/fullDownload/DownloadBottomBarContainer';
import BulkDownloadBottomBarContainer from
    'containers/bulkDownload/modal/BulkDownloadBottomBarContainer';
import FloatingGlossaryButton from 'components/sharedComponents/FloatingGlossaryButton';
import FooterExternalLink from 'components/sharedComponents/FooterExternalLink';
import Subscribe from 'components/sharedComponents/Subscribe';

const propTypes = {
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
            <GlossaryButtonWrapperContainer child={FloatingGlossaryButton} />
            <DownloadBottomBarContainer
                filters={filters} />
            <BulkDownloadBottomBarContainer />
            <Subscribe />
            <footer
                className="footer-outer-wrap"
                role="contentinfo"
                aria-label="Footer">
                <div className="footer-container">
                    <div className="footer-logo">
                        <a
                            href="#/"
                            title="USAspending.gov Home"
                            aria-label="USAspending.gov Home"
                            onClick={clickedFooterLink.bind(null, '/')}>
                            <img src="img/footer_logo.png" alt="USAspending.gov" />
                        </a>
                    </div>
                    <div className="footer-links">
                        <div className="link-group">
                            <div className="group-title">
                                About
                            </div>
                            <ul className="links">
                                <li>
                                    <a
                                        href="#/about"
                                        onClick={clickedFooterLink.bind(null, '/about')}>
                                        About USAspending
                                    </a>
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
                                        link="https://usaspending-help.zendesk.com/hc/en-us/sections/115000739433-Frequently-Ask-Questions-"
                                        title="FAQs" />
                                </li>
                                <li>
                                    <FooterExternalLink
                                        link="https://usaspending-help.zendesk.com/hc/en-us/community/topics"
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
                                Resources
                            </div>
                            <ul className="links">
                                <li>
                                    <FooterExternalLink
                                        link="https://fiscal.treasury.gov/data-transparency/DAIMS-current.html"
                                        title="Data Model" />
                                </li>
                                <li>
                                    <FooterExternalLink
                                        link="https://datalab.usaspending.gov"
                                        title="Data Lab" />
                                </li>
                                <li>
                                    <a href="/#/download_center/data_dictionary">
                                        Data Dictionary
                                    </a>
                                </li>
                                <li>
                                    <FooterExternalLink
                                        link="http://fiscaldata.treasury.gov/"
                                        title="Fiscal Data" />
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
                            </ul>
                        </div>
                    </div>
                    <ul className="legal-and-social-links">
                        <li className="copyright__legal-item">
                            <a
                                className="copyright__link"
                                href="#/about/accessibility"
                                onClick={clickedFooterLink.bind(null, '/about/accessibility')}>
                                Accessibility
                            </a>
                        </li>
                        <li className="copyright__legal-item">
                            <a
                                className="copyright__link"
                                href="#/about/privacy"
                                onClick={clickedFooterLink.bind(null, '/about/privacy')}>
                                Privacy Policy
                            </a>
                        </li>
                        <li className="copyright__legal-item">
                            <a
                                className="copyright__link"
                                href="#/about/foia"
                                onClick={clickedFooterLink.bind(null, '/about/foia')}>
                                Freedom of Information Act
                            </a>
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
                            <button onClick={generateOnClick("https://www.linkedin.com/company/united-states-department-of-the-treasury-bureau-of-public-debt/")} title="LinkedIn">
                                <FontAwesomeIcon icon={faLinkedin} size="1x" color="#D4D4D4" />
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="copyright">
                    <div className="copyright__left">
                        <div className="copyright__notice">
                            &copy; {year} USAspending.gov
                        </div>
                    </div>
                    <div className="copyright__db">
                        <strong>NOTE:</strong> You must <a href="#/db_info" target="_blank" rel="noopener noreferrer" title="Limitation on Permissible Use of Dun & Bradstreet, Inc. (D&B) Data" aria-label="Limitation on Permissible Use of Dun & Bradstreet, Inc. (D&B) Data" onClick={clickedFooterLink.bind(null, '/db_info')}>click here</a> for very important D&amp;B information.
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

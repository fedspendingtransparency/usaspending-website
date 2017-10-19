/**
 * FooterComponent.jsx
 * Created by Destin Frasier 02/24/2017
 **/

import PropTypes from 'prop-types';
import React from 'react';
import GlossaryButtonWrapperContainer from 'containers/glossary/GlossaryButtonWrapperContainer';
import DownloadBottomBarContainer from
    'containers/search/modals/fullDownload/DownloadBottomBarContainer';
import FloatingGlossaryButton from './FloatingGlossaryButton';
import FooterExternalLink from './FooterExternalLink';

const propTypes = {
    filters: PropTypes.object
};

export default class Footer extends React.Component {
    render() {
        const year = new Date().getFullYear();
        return (
            <div>
                <GlossaryButtonWrapperContainer child={FloatingGlossaryButton} />
                <DownloadBottomBarContainer
                    filters={this.props.filters} />
                <footer className="footer-outer-wrap" role="contentinfo">
                    <div className="footer-container">
                        <div className="footer-logo">
                            <a href="#/" title="USAspending.gov Home" aria-label="USAspending.gov Home">
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
                                        <a href="#/about">
                                            About The Data
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="link-group">
                                <div className="group-title">
                                    Support
                                </div>
                                <ul className="links">
                                    <li>
                                        <a href="#/faq">
                                            FAQs
                                        </a>
                                    </li>
                                    <li>
                                        <a href="mailto:usaspending.help-submitonly@fiscal.treasury.gov?subject=Contact%20Us">
                                            Contact Us
                                        </a>
                                    </li>
                                    <li>
                                        <FooterExternalLink
                                            link="https://usaspending-help.zendesk.com/hc/en-us"
                                            title="Community" />
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
                                            link="http://usaspending-submissions.s3-website-us-gov-west-1.amazonaws.com/"
                                            title="Raw Agency Files" />
                                    </li>
                                    <li>
                                        <FooterExternalLink
                                            link="http://fedspendingtransparency.github.io/DAIMS-v1.1/"
                                            title="Data Model" />
                                    </li>
                                    <li>
                                        <FooterExternalLink
                                            link="https://fedspendingtransparency.github.io/data-lab/"
                                            title="Data Lab" />
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
                    </div>
                    <div className="copyright-block">
                        <div className="copyright-content">
                            <div className="copyright-notice">
                                <small>&copy; {year} USAspending.gov</small>
                            </div>
                            <div className="important-db">
                                <strong>NOTE:</strong> You must <a href="#/db_info" target="_blank" rel="noopener noreferrer" title="Limitation on Permissible Use of Dun & Bradstreet, Inc. (D&B) Data" aria-label="Limitation on Permissible Use of Dun & Bradstreet, Inc. (D&B) Data">click here</a> for very important D&amp;B information.
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}
Footer.propTypes = propTypes;

/**
 * PaneFeature.jsx
 * Created by David Trinh 4/19/18
 */

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PaneFeature = () => (
    <div className="feature-pane">
        <div className="feature-pane__wrapper">
            <h2 className="feature-pane__title">Featured Content</h2>
            <div className="feature-pane__content-wrapper">
                <div className="feature-pane__content">
                    <div className="feature-pane__content-title">
                        New! - Congressional Budget Justifications
                    </div>
                    <p className="feature-pane_content-text">
                        See the rich, detailed documents each agency submits to Congress
                        to justify its annual budget request.
                    </p>
                    <div className="feature-pane__button-wrapper">
                        <a href="/#/agency" className="feature-pane__button">
                            Explore Budget Justifications
                        </a>
                    </div>
                </div>
                <div className="feature-pane__content-divider" />
                <hr className="feature-pane__mobile-content-divider" />
                <div className="feature-pane__content" id="feature-pane__content-middle">
                    <div id="feature-pane__content-header__middle">
                        Updated for FY 2019
                    </div>
                    <div className="feature-pane__content-title" id="feature-pane__content-title__middle">
                        Your Guide to America’s Finances
                    </div>
                    <p className="feature-pane_content-text">
                        Your Guide provides a snapshot of Fiscal Year 2019 revenue, spending,
                        deficit, and debt, along with data for download.
                        Click below to visit our partner site.
                    </p>
                    <div className="feature-pane__button-wrapper">
                        <a
                            href="https://datalab.usaspending.gov/americas-finance-guide/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="feature-pane__button">
                            Explore the Guide <span id="middle-pane-feature-icon"><FontAwesomeIcon icon="external-link-alt" /></span>
                        </a>
                    </div>
                </div>
                <hr className="feature-pane__mobile-content-divider" />
                <div className="feature-pane__content-divider" />
                <div className="feature-pane__content">
                    <div className="feature-pane__content-title">New! - Recipient Profiles</div>
                    <p className="feature-pane_content-text" >
                        Find insights into each recipient with the tools and
                        summaries found in our new Recipient Profile pages.
                    </p>
                    <div className="feature-pane__button-wrapper">
                        <a href="/#/recipient" className="feature-pane__button">
                            Explore Recipient Profiles
                        </a>
                    </div>
                </div>
            </div>
            <hr className="feature-pane__bottom-divider" />
        </div>
    </div>
);

export default PaneFeature;

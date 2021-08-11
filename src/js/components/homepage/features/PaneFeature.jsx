/**
 * PaneFeature.jsx
 * Created by David Trinh 4/19/18
 */

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Analytics from 'helpers/analytics/Analytics';

const PaneFeature = () => {
    const trackLink = (label) => Analytics.event({
        category: 'Homepage',
        action: 'Link',
        label
    });

    return (
        <div className="feature-pane">
            <div className="feature-pane__wrapper">
                <h2 className="feature-pane__title">OTHER DATA ACT CONTENT</h2>
                <div className="feature-pane__content-wrapper">
                    <div className="feature-pane__content feature-pane__content-fiscal-data">
                        <h3 className="feature-pane__content-title">FiscalData.Treasury.gov</h3>
                        <p className="feature-pane_content-text">
                        Fiscal Data is a new site featuring federal financial data in machine-readable formats with comprehensive metadata. Explore and download the data today!
                        </p>
                        <div className="feature-pane__button-wrapper">
                            <a
                                href="https://FiscalData.Treasury.gov"
                                target="_blank"
                                role="button"
                                rel="noopener noreferrer"
                                className="feature-pane__button white"
                                onClick={() => trackLink('feature 1')}>
                            Explore Fiscal Data <span className="feature-pane__button-icon"><FontAwesomeIcon icon="external-link-alt" /></span>
                            </a>
                        </div>
                    </div>
                    <div className="feature-pane__content-divider" />
                    <div className="feature-pane__content feature-pane__content-covid">
                        <h3 className="feature-pane__content-title feature-pane__content-title-transparent-bg">
                        The Federal Response to COVID-19
                        </h3>
                        <div className="feature-pane__button-wrapper">
                            <a
                                href="https://datalab.usaspending.gov/federal-covid-funding/"
                                target="_blank"
                                role="button"
                                rel="noopener noreferrer"
                                value="https://datalab.usaspending.gov/federal-covid-funding/"
                                className="feature-pane__button white"
                                onClick={() => trackLink('feature 2')}>
                            Explore Data Lab <span className="feature-pane__button-icon"><FontAwesomeIcon icon="external-link-alt" /></span>
                            </a>
                        </div>
                    </div>
                    <div className="feature-pane__content-divider" />
                    <div className="feature-pane__content feature-pane__content-finances-guide">
                        <p className="feature-pane__content-overline">
                        Updated for FY 2019
                        </p>
                        <h3 className="feature-pane__content-title">
                        Your Guide to America’s Finances
                        </h3>
                        <p className="feature-pane_content-text">
                        Your Guide provides a snapshot of Fiscal Year 2019 revenue, spending,
                        deficit, and debt, along with data for download.
                        Click below to visit our partner site.
                        </p>
                        <div className="feature-pane__button-wrapper">
                            <a
                                href="https://datalab.usaspending.gov/americas-finance-guide/"
                                target="_blank"
                                role="button"
                                rel="noopener noreferrer"
                                className="feature-pane__button white"
                                onClick={() => trackLink('feature 3')}>
                            Explore the Guide <span className="feature-pane__button-icon"><FontAwesomeIcon icon="external-link-alt" /></span>
                            </a>
                        </div>
                    </div>
                </div>
                <hr className="feature-pane__bottom-divider" />
            </div>
        </div>
    );
};

export default PaneFeature;

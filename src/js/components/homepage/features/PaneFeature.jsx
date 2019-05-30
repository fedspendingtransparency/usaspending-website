/**
 * PaneFeature.jsx
 * Created by David Trinh 4/19/18
 */

import React from 'react';

const PaneFeature = () => (
    <div className="feature-pane">
        <div className="feature-pane__wrapper">
            <h2 className="feature-pane__title">Featured Content</h2>
            <div className="feature-pane__content-wrapper">
                <div className="feature-pane__content">
                    <h3 className="feature-pane__content-title">New! - Congressional Budget Justifications</h3>
                    <p className="feature-pane_content-text">See the rich, detailed documents each agency submits to Congress to justify its annual budget request.</p>
                    <div className="feature-pane__button-wrapper">
                        <a href="/#/agency" className="feature-pane__button">Explore Budget Justifications</a>
                    </div>
                </div>
                <div className="feature-pane__content-divider" />
                <hr className="feature-pane__mobile-content-divider" />
                <div className="feature-pane__content">
                    <h3 className="feature-pane__content-title">New! – Your Guide to America’s Finances</h3>
                    <p className="feature-pane_content-text">Your Guide presents straightforward information about the federal government’s spending and revenue, as well as the deficit and debt in 2018.</p>
                    <div className="feature-pane__button-wrapper">
                        <a href="https://datalab.usaspending.gov/americas-finance-guide/" target="_blank" rel="noopener noreferrer" className="feature-pane__button">Explore the Data</a>
                    </div>
                </div>
                <hr className="feature-pane__mobile-content-divider" />
                <div className="feature-pane__content-divider" />
                <div className="feature-pane__content">
                    <h3 className="feature-pane__content-title">New! - Recipient Profiles</h3>
                    <p className="feature-pane_content-text" >Find insights into each recipient with the tools and summaries found in our new Recipient Profile pages.</p>
                    <div className="feature-pane__button-wrapper">
                        <a href="/#/recipient" className="feature-pane__button">Explore Recipient Profiles</a>
                    </div>
                </div>
            </div>
            <hr className="feature-pane__bottom-divider" />
        </div>
    </div>
);

export default PaneFeature;

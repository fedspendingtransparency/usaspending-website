/**
 * PaneFeature.jsx
 * Created by David Trinh 4/19/18
 */

import React from 'react';

const PaneFeature = () => (
    <div className="feature-pane">
        <div className="feature-pane__wrapper">
            <h2 className="feature-pane__title"><span>FEATURED CONTENT</span></h2>
            <div className="feature-pane__content-wrapper">
                <div className="feature-pane__content">
                    <p className="feature-pane__content-title">Discover the Data Lab</p>
                    <p>Data visualizations to help you understand government spending. See what our data can do.</p>
                    <div className="feature-pane__button-wrapper">
                        <a href="https://datalab.usaspending.gov/" className="feature-pane__button">Visit the Data Lab</a>
                    </div>
                </div>
                <div className="feature-pane__content-divider" />
                <hr className="feature-pane_mobile_content_divider" />
                <div className="feature-pane__content">
                    <p className="feature-pane__content-title">Tour the New USAspending.gov</p>
                    <p>We have a new look with more data than ever before. Take a quick tour of the new site.</p>
                    <div className="feature-pane__button-wrapper">
                        <a href="https://www.youtube.com/watch?v=kaVhkZd3S5w" className="feature-pane__button">Watch the Video</a>
                    </div>
                </div>
                <hr className="feature-pane_mobile_content_divider" />
                <div className="feature-pane__content-divider" />
                <div className="feature-pane__content">
                    <p className="feature-pane__content-title">Stay in touch with us!</p>
                    <p>Receive updates on our new site. We will provide release notes and API updates, as well as share opportunities to engage with us.</p>
                    <div className="feature-pane__button-wrapper">
                        <a href="mailto:join-usaspending@lists.fiscal.treasury.gov?subject=Yes!%20I'd%20like%20to%20receive%20updates." className="feature-pane__button">Sign Up</a>
                    </div>
                </div>
            </div>
            <hr className="feature-pane__bottom-divider" />
        </div>
    </div>
);

export default PaneFeature;

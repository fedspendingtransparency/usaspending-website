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
                    <h3 className="feature-pane__content-title">Discover the Data Lab</h3>
                    <p className="feature-pane_content-text">Data visualizations to help you understand government spending. See what our data can do.</p>
                    <div className="feature-pane__button-wrapper">
                        <a href="https://datalab.usaspending.gov/" target="_blank" rel="noopener noreferrer" className="feature-pane__button">Visit the Data Lab</a>
                    </div>
                </div>
                <div className="feature-pane__content-divider" />
                <hr className="feature-pane__mobile-content-divider" />
                <div className="feature-pane__content">
                    <h3 className="feature-pane__content-title">Tour the New USAspending.gov</h3>
                    <p className="feature-pane_content-text">We have a new look with more data than ever before. Take a quick tour of the new site.</p>
                    <div className="feature-pane__button-wrapper">
                        <a href="https://www.youtube.com/watch?v=kaVhkZd3S5w" target="_blank" rel="noopener noreferrer" className="feature-pane__button">Watch the Video</a>
                    </div>
                </div>
                <hr className="feature-pane__mobile-content-divider" />
                <div className="feature-pane__content-divider" />
                <div className="feature-pane__content">
                    <h3 className="feature-pane__content-title">New! - State Profiles</h3>
                    <p className="feature-pane_content-text" >Find insights into the awards performed within a particular state with the tools and summaries found in our new State Profile pages.</p>
                    <div className="feature-pane__button-wrapper">
                        <a href="https://www.usaspending.gov/#/state" className="feature-pane__button">Explore State Profiles</a>
                    </div>
                </div>
            </div>
            <hr className="feature-pane__bottom-divider" />
        </div>
    </div>
);

export default PaneFeature;

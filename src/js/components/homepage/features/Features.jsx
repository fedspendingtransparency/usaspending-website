/**
 * Features.jsx
 * Created by Kevin Li 1/19/18
 */

import React from 'react';

import SpendingExplorerFeature from './SpendingExplorerFeature';
import SearchFeature from './SearchFeature';
import PaneFeature from './PaneFeature';
import ProfileFeature from './ProfileFeature';

const Features = () => (
    <section
        id="homepage-features"
        className="homepage-features"
        aria-label="Web site features">
        <div className="homepage-features__content">
            <PaneFeature />
            <SpendingExplorerFeature />
            <SearchFeature />
            <div className="covid-feature">
                <div className="feature-homepage__background-flair__container">
                    <div className="feature-homepage__background-flair covid" />
                    <div className="featured-section-image__wrapper">
                        <img src="img/covid-badge.png" alt="covid-badge" />
                    </div>
                </div>
            </div>
            <ProfileFeature />
        </div>
    </section>
);

export default Features;

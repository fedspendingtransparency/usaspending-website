/**
 * Features.jsx
 * Created by Kevin Li 1/19/18
 */

import React from 'react';

import SpendingExplorerFeature from './SpendingExplorerFeature';

const Features = () => (
    <section
        id="homepage-features"
        className="homepage-features"
        aria-label="Web site features">
        <div className="homepage-feature-content">
            <SpendingExplorerFeature />
        </div>
    </section>
);

export default Features;

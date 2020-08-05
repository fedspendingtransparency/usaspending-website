/**
 * Features.jsx
 * Created by Kevin Li 1/19/18
 */

import React from 'react';

import CovidFeatureContainer from 'containers/covid19/homepage/CovidFeatureContainer';
import kGlobalConstants from 'GlobalConstants';
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
            {kGlobalConstants.CARES_ACT_RELEASED_2 && <CovidFeatureContainer />}
            <PaneFeature />
            <SpendingExplorerFeature />
            <SearchFeature />
            <ProfileFeature />
        </div>
    </section>
);

export default Features;

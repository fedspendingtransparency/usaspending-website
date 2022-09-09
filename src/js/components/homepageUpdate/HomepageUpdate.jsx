/**
 * HomepageUpdate.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import PageWrapper from "../sharedComponents/PageWrapper";
import { homePageMetaTags } from "../../helpers/metaTagHelper";
import Hero from '../homepage/hero/Hero';
import SummaryStats from "../homepage/SummaryStats";
import AwardSearch from "../homepage/AwardSearch/AwardSearch";
import HomepageExploreToggle from "./HomepageExploreToggle/HomepageExploreToggle";
import DownloadExplorePlaceholder from "../homepage/DownloadExplorePlaceholder/DownloadExplorePlaceholder";
import HomepageResources from "./HomepageResources/HomepageResources";
import ReadyToGetStarted from "./ReadyToGetStarted/ReadyToGetStarted";
import StayInTouch from "./StayInTouch/StayInTouch";
import HomepageFirstRow from "./HomepageFirstRow/HomepageFirstRow";
import FeatureFlag from "../sharedComponents/FeatureFlag";

require('pages/homepage/homepageUpdate.scss');

const HomepageUpdate = () => (
    <FeatureFlag>
        <PageWrapper
            pageName="Homepage"
            classNames="usa-da-home-page"
            noHeader
            metaTagProps={{ ...homePageMetaTags }}>
            <main id="main-content" className="main-content homepage-update-content">
                <Hero />
                <SummaryStats />
                <HomepageFirstRow />
                <AwardSearch />
                <HomepageExploreToggle />
                <DownloadExplorePlaceholder />
                <HomepageResources />
                <ReadyToGetStarted />
                <StayInTouch />
            </main>
        </PageWrapper>
    </FeatureFlag>);

export default HomepageUpdate;

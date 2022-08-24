/**
 * HomepageUpdate.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';

import PageWrapper from "../sharedComponents/PageWrapper";
import { homePageMetaTags } from "../../helpers/metaTagHelper";
import Hero from './hero/Hero';
import SummaryStats from "./SummaryStats";
import AwardSearch from "./AwardSearch/AwardSearch";
import HomepageExploreToggle from "./HomepageExploreToggle/HomepageExploreToggle";
import DownloadExplorePlaceholder from "./DownloadExplorePlaceholder/DownloadExplorePlaceholder";
import HomepageResources from "./HomepageResources/HomepageResources";
import ReadyToGetStarted from "./ReadyToGetStarted/ReadyToGetStarted";
import StayInTouch from "./StayInTouch/StayInTouch";
import HomepageFirstRow from "./HomepageFirstRow/HomepageFirstRow";

require('pages/homepage/homepageUpdate.scss');

const HomepageUpdate = () => (
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
    </PageWrapper>);

export default HomepageUpdate;
